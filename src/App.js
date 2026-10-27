// Imports:
import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Start from "./Components/Start";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import Finish from "./Components/Finish";
import Timer from "./Components/Timer";

// initialState creation:
const initialState = {
    questions: [],

    // Different status: 'loading', 'error', 'ready', 'active', 'finish'
    status: 'loading',
    currIndex: 0,
    answer: null,
    points: 0,
    highScore: 0,
    remainingSeconds: null,
}

// reducer creation:
function reducer(state, action) {
    switch (action.type) {
        case "received":
            // Resetting the questions to the payload and status to 'ready' at same time.
            return { ...state, questions: action.payload, status: 'ready' };
        case "failed":
            return { ...state, status: 'error' };
        case "start":
            return { ...state, status: 'active', remainingSeconds: state.questions.length * 20 };
        case "newAnswer":
            // Selecting the current question:
            const currQuestion = state.questions[state.currIndex];

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === currQuestion.correctOption
                        ? state.points + currQuestion.points
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                currIndex: state.currIndex + 1,
                answer: null,
            };
        case "ticking":
            return {
                ...state,
                remainingSeconds: state.remainingSeconds - 1,
                // status: state.remainingSeconds === 0 ? 'finish' : state.status,
            }
        case "finish":
            return {
                ...state,
                status: 'finish',
                answer: null,
                highScore:
                    state.points > state.highScore ? state.points : state.highScore
            };
        case "restart":
            return {
                /* We did this on initialState instead of state because we want to reset all 
                   values to its initialState except for the questions, highScore and status */
                ...initialState,
                questions: state.questions,
                highScore: state.highScore,
                status: 'ready',
            };
        default:
            throw new Error("UNKNOWN ACTION :(");
    }
}

export default function App() {

    // Dispatching:
    const [state, dispatch] = useReducer(reducer, initialState);

    // Calculating all the points:
    const pointSum = state.questions.reduce((acc, curr) => acc + curr.points, 0);

    // Fetching questions:
    useEffect(function () {
        fetch("questions.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch({ type: "received", payload: data.questions });
            })
            .catch((err) => {
                console.error(err);
                dispatch({ type: "failed" })
            });
    }, [])

    // Returning:
    return (
        <div className="app">
            <Header />
            <Main>
                {/* Loading state */}
                {state.status === 'loading' && <Loader />}

                {/* Error state */}
                {state.status === 'error' && <Error />}

                {/* Ready state */}
                {state.status === 'ready' && <Start
                    questionsLength={state.questions.length}
                    dispatch={dispatch} />}

                {/* Active state */}
                {state.status === 'active' &&
                    <>
                        <Progress
                            currIndex={state.currIndex}
                            questionsLength={state.questions.length}
                            questionPoints={state.questions[state.currIndex].points}
                            points={state.points}
                            pointSum={pointSum}
                            answer={state.answer} />
                        <Question
                            question={state.questions[state.currIndex]}
                            dispatch={dispatch}
                            answer={state.answer} />
                        <Timer remainingSeconds={state.remainingSeconds} dispatch={dispatch} />
                    </>
                }

                {/* Answer state */}
                {(state.answer !== null && state.currIndex < state.questions.length - 1) ? <button
                    onClick={() => dispatch({ type: "nextQuestion" })}
                    className="btn btn-ui">
                    Next</button> : null}

                {/* Finish state */}
                {state.status === 'finish' && <Finish points={state.points}
                    pointSum={pointSum} highScore={state.highScore} dispatch={dispatch} />}

                {(state.answer !== null && state.currIndex >= state.questions.length - 1) ?
                    <button
                        onClick={() => dispatch({ type: "finish" })}
                        className="btn btn-ui">
                        Finish</button> : null}
            </Main>
        </div>
    );
}
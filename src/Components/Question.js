function Question({ question, dispatch, answer }) {
    console.log(question);
    return (
        <div>
            {/* Displaying question */}
            <h4>{question.question}</h4>

            {/* Displaying options */}
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={option}
                        disabled={answer !== null}
                        className={`btn btn-option 
                            ${index === answer ? "answer" : ""} 
                            ${answer !== null ? index === question.correctOption ? "correct" : "wrong" : ""}`}
                        onClick={() => dispatch({ type: "newAnswer", payload: index })}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Question
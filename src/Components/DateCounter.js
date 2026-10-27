import { useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) { // You can also use if else statements
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      return "UNKNOWN ACTION :(";
  }
}

function DateCounter() {
  // Creating initial state:
  const initialState = { step: 1, count: 0 };

  // Setting state with the initial state at first:
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructuring the state:
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "set", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "setCount", payload: 0 });
    dispatch({ type: "setStep", payload: 1 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;

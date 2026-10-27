import { useEffect } from "react"

function Timer({ dispatch, remainingSeconds }) {
    // mins & seconds:
    const mins = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    // Timer:
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: "ticking" });
            console.log(remainingSeconds)
        }, 1000);

        (remainingSeconds <= 0) && dispatch({ type: "finish" });

        // cleanup function without it the application breaks:
        return () => clearInterval(timer);
    }, [dispatch, remainingSeconds])

    return (
        <div className="timer">
            <p>Time left: {mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</p>
        </div>
    )
}

export default Timer
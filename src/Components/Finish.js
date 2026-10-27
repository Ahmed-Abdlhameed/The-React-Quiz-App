function Finish({ points, pointSum, highScore, dispatch }) {
    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {pointSum} -
                ({Math.round((points / pointSum) * 100)}%)
            </p>
            <p className="highscore">(Highscore: {highScore} points)</p>
            <button
                onClick={() => dispatch({ type: "restart" })}
                className="btn btn-ui">
                Restart quiz</button>
        </>
    )
}

export default Finish
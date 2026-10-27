function Progress({ currIndex, questionsLength, points, questionPoints, pointSum, answer }) {
    return (
        <header className="progress">
            {/* Progress bar */}
            {/* If the answer is null then currIndex + 0 else currIndex + 1 */}
            {/* The previous line explains the + Number(answer !== null) which makes the progress bar
                update when the user answers a question and not when they click the next question */}
            <progress max={questionsLength} value={currIndex + Number(answer !== null)}></progress>

            {/* Progress info */}
            <div className="progress-info">
                <p>Question <strong>{currIndex + 1}</strong> / {questionsLength}</p>
                <p>Question points: <strong>{questionPoints}</strong></p>
                <p>Total points: <strong>{points}</strong> / {pointSum}</p>
            </div>
        </header>
    )
}

export default Progress
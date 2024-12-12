import React from 'react'
import { useNavigate } from 'react-router-dom';

function GameOver() {
    const { score, numQuestions } = location.state || {}; // Retrieve state passed from Welcome.jsx

    return (
        <>
            <h1>Game Over!</h1>
            <p>Your score: ${score} / ${numQuestions}</p>
        </>
    )
}

export default GameOver
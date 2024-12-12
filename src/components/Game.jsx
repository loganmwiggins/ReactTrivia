import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Question from './Question'

function Game() {
    
    const [qs, setQs] = useState([]);

    async function getQuestions() {
        try {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
            );
            const questions = await response.json();

            // Map fetched questions to Question components
            const questionEls = questions.results.map((q, index) => (
                <Question
                    key={index} // Use index if no unique identifier is available
                    question={q.question}
                    correctAns={q.correct_answer}
                    incorrectAns={q.incorrect_answers}
                />
            ));

            setQs(questionEls); // Update state with the rendered Question components
        } 
        catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    useEffect(() => {
        getQuestions();
        console.log("on mount:", qs);
    }, [])

    // The useLocation hook provides access to the current route’s state, which contains the values passed from Welcome.jsx
    const location = useLocation();

    // Access the state passed from the Welcome component
    // location.state || {} ensures that if state is undefined (e.g., if someone directly navigates to /game), the Game component doesn’t crash
    const { numQuestions, category, difficulty } = location.state || {};

    return (
        <>
            <div>
                <h3>Game Parameters</h3>
                <p>Number of Questions: {numQuestions}</p>
                <p>Category: {category}</p>
                <p>Difficulty: {difficulty}</p>
                {/* Add your game logic here */}
            </div>

            {qs}
        </>
    );
}

export default Game;
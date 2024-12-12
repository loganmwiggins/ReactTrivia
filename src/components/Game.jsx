import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Question from './Question';
import '../stylesheets/Game.css'

function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const { numQuestions, category, difficulty } = location.state || {}; // Retrieve state passed from Welcome.jsx

    // Load questions from localStorage
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem("gameQuestions")) || [];
        setQuestions(storedQuestions);
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
            setFeedback("Correct! 🎉");
        } else {
            setFeedback("Wrong! ❌");
        }

        // Wait for a brief moment before moving to the next question
        setTimeout(() => {
            setFeedback("");
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                alert(`Game Over! Your score: ${score + (isCorrect ? 1 : 0)} / ${questions.length}`);
                navigate('/');
                // navigate('/gameover', {
                //     state: {
                //         score,
                //         numQuestions
                //     },
                // });
            }
        }, 1000);
    };

    return (
        <>
            <div className='title-ctnr'>
                <h2>Trivia Game</h2>

                <div>
                    <p>{difficulty}</p>
                    <p>{currentQuestionIndex + 1} / {numQuestions}</p>
                    {/* <p>Category: {category}</p> */}
                </div>
            </div>

            {questions.length > 0 ? (
                <>
                    <Question
                        question={questions[currentQuestionIndex].question}
                        correctAns={questions[currentQuestionIndex].correctAns}
                        incorrectAns={questions[currentQuestionIndex].incorrectAns}
                        handleAnswer={handleAnswer}
                    />
                    {feedback && <p className="feedback">{feedback}</p>}
                    <p>Score: {score}</p>
                </>
                    

            ) : (
                <p>Loading questions...</p>
            )}
        </>
    );
}

export default Game;
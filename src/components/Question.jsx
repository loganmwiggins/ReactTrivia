import React, { useState, useEffect } from 'react';

import '../stylesheets/Question.css';

function Question({ question, correctAns, incorrectAns, handleAnswer }) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        // Shuffle the answers (correct and incorrect)
        const allAnswers = [...incorrectAns, correctAns];
        setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
        setSelectedAnswer(null);
    }, [question, correctAns, incorrectAns]);

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        handleAnswer(answer === correctAns);
    };

    return (
        <div className='question-ctnr'>
            <h3>{question}</h3>
            <div className="selection-ctnr">
              {shuffledAnswers.map((answer, index) => (
                <button
                  onClick={() => handleClick(answer)}
                  disabled={selectedAnswer !== null} // Disable buttons after selection
                  className={`answer-button ${
                      selectedAnswer === answer
                          ? answer === correctAns
                              ? 'correct'
                              : 'incorrect'
                          : answer === correctAns && selectedAnswer
                          ? 'correct'
                          : ''
                  }`}
                >
                  {answer}
                </button>
              ))}
            </div>
        </div>
    );
}

export default Question;
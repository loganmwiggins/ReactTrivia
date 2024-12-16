import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../stylesheets/Welcome.css'

function Welcome() {
    const navigate = useNavigate();

    const [numQuestions, setNumQuestions] = useState(10);
    const [category, setCategory] = useState('9');
    const [difficulty, setDifficulty] = useState('easy');

    const decodeHTML = (text) => {
        const parser = new DOMParser();
        const decoded = parser.parseFromString(text, "text/html").body.textContent;
        return decoded || text;
    };

    const fetchQuestions = async () => {
        const response = await fetch(
            //`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`
            `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();

        const formattedQuestions = data.results.map((q) => ({
            question: decodeHTML(q.question),
            correctAns: decodeHTML(q.correct_answer),
            incorrectAns: q.incorrect_answers.map((ans) => decodeHTML(ans)),
        }));
        localStorage.setItem('gameQuestions', JSON.stringify(formattedQuestions));
    };

    // On form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchQuestions();

        navigate('/game', {
            state: {
                numQuestions,
                category,
                difficulty,
            },
        });
    };

    return (
        <>
            <h1>Welcome to Mahlon's World 🌍</h1>

            <div className="form-ctnr">
                <form onSubmit={handleSubmit}>
                    <div className="label-input">
                        <p>Number of Questions</p>
                        <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                        />
                    </div>
                    <div className="label-input">
                        <p>Category</p>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>
                    </div>
                    <div className="label-input">
                        <p>Difficulty</p>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <button type="submit">Start Game</button>
                </form>
            </div>
        </>
    );
}

export default Welcome;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome() {

    const navigate = useNavigate();

    // State for form inputs
    const [numQuestions, setNumQuestions] = useState(10); // Default value
    const [category, setCategory] = useState('9'); // Default category
    const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Pass the values to the Game component via state
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
        <h1>Welcome to Mahlon's World</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="number" 
                name="numQuestions-select" 
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
            <select name="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="9">General Knowledge</option>
                {/* <option value="Entertainment: Film">Entertainment: Film</option>
                <option value="Science & Nature">Science & Nature</option>
                <option value="Sports">Sports</option> */}
            </select>
            <select name="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            
            <button type='submit'>Start</button>
        </form>
    </>
  )
}

export default Welcome;
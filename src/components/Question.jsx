import React, {useEffect} from 'react'



function Question({question, correctAns, incorrectAns}) {

  const selections = [...incorrectAns, correctAns].sort(() => Math.random() - 0.5);

  useEffect(() => {
    console.log("Rendered question:", question);
  }, [question]); 

  return (
    <div>
        <h3 dangerouslySetInnerHTML={{ __html: question }} /> {/* Safely render HTML */}
        <ul>
            {selections.map((ans, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: ans }} />
            ))}
        </ul>
    </div>
  );
}

export default Question;
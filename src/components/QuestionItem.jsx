import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleAnswerChange(e) {
    const newCorrectIndex = Number(e.target.value);

    // Optimistically update UI immediately
    onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
  }

  return (
    <article>
      <h4>{prompt}</h4>
      <label htmlFor={`select-${id}`}>Correct Answer:</label>
      <select
        id={`select-${id}`}
        aria-label="Correct Answer"
        value={correctIndex}
        onChange={handleAnswerChange}
      >
        {answers.map((answer, index) => (
          <option key={`${id}-${index}`} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </article>
  );
}

export default QuestionItem;

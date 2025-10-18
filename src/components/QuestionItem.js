import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(
      () => onDeleteQuestion(id)
    );
  }

  function handleChange(e) {
    const updated = { ...question, correctIndex: parseInt(e.target.value) };
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updated.correctIndex }),
    })
      .then((r) => r.json())
      .then((data) => onUpdateQuestion(data));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <select value={correctIndex} onChange={handleChange}>
        {answers.map((a, i) => (
          <option key={i} value={i}>
            {a}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

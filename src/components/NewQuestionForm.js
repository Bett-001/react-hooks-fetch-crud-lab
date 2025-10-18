import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", "")) - 1;
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt">Prompt</label>
      <input
        type="text"
        name="prompt"
        id="prompt"
        value={formData.prompt}
        onChange={handleChange}
      />

      {formData.answers.map((ans, i) => (
        <div key={i}>
          <label htmlFor={`answer${i + 1}`}>Answer {i + 1}</label>
          <input
            type="text"
            name={`answer${i + 1}`}
            id={`answer${i + 1}`}
            value={ans}
            onChange={handleChange}
          />
        </div>
      ))}

      <label htmlFor="correctIndex">Correct Answer</label>
      <select
        name="correctIndex"
        id="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, i) => (
          <option key={i} value={i}>
            Answer {i + 1}
          </option>
        ))}
      </select>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;

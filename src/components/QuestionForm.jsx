import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleAnswerChange(index, value) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({ ...formData, answers: newAnswers });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddQuestion(formData);
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        Correct Answer Index:
        <input
          type="number"
          name="correctIndex"
          min="0"
          max="3"
          value={formData.correctIndex}
          onChange={handleChange}
        />
      </label>

      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </label>
      ))}

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;

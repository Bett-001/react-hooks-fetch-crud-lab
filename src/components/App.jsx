import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch questions
  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });

    // cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  // Add new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Delete question
  function handleDeleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  // Update question
  function handleUpdateQuestion(updatedQ) {
    const updated = questions.map((q) =>
      q.id === updatedQ.id ? updatedQ : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <nav>
        <button onClick={() => setShowForm(false)}>View Questions</button>
        <button onClick={() => setShowForm(true)}>New Question</button>
      </nav>

      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;

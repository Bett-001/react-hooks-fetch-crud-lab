import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setQuestions(data);
      });
    return () => {
      ignore = true;
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <button>View Questions</button>
      <section>
        <h2>New Question</h2>
        <NewQuestionForm onAddQuestion={handleAddQuestion} />
      </section>
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}
      />
    </main>
  );
}

export default App;


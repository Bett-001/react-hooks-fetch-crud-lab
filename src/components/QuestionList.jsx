import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <QuestionItem
              question={question}
              onDeleteQuestion={onDeleteQuestion}
              onUpdateQuestion={onUpdateQuestion}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

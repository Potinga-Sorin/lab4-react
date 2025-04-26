import React from "react";
import "./ResultsPage.css";

const ResultsPage = ({ score, totalQuestions, answers, onReset }) => {
  return (
    <div className="results-page">
      <h1>Rezultatele Quiz-ului</h1>
      <p>
        Scor final:{" "}
        <strong>
          {score} / {totalQuestions}
        </strong>
      </p>

      <h2>Detalii răspunsuri:</h2>
      <ul className="answer-list">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={answer.isCorrect ? "correct" : "incorrect"}
          >
            <p>
              <strong>Întrebare:</strong> {answer.question}
            </p>
            <p>
              <strong>Răspunsul corect:</strong> {answer.correct}
            </p>
            <p>
              <strong>Răspunsul tău:</strong>{" "}
              <span className="user-answer">{answer.selectedOption}</span>
            </p>
          </li>
        ))}
      </ul>

      <button className="reset-btn" onClick={onReset}>
        Începe din nou
      </button>
    </div>
  );
};

export default ResultsPage;

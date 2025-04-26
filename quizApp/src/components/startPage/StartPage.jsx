import React, { useState } from "react";
import "./StartPage.css";

const StartPage = ({ onStartQuiz }) => {
  const [username, setUsername] = useState("");
  const [randomOrder, setRandomOrder] = useState(false);
  const [timeLimit, setTimeLimit] = useState(10);
  const [noTimeLimit, setNoTimeLimit] = useState(false); // Opțiunea de timp nelimitat

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Te rugăm să introduci un nume!");
      return;
    }

    onStartQuiz({
      username,
      randomOrder,
      timeLimit: noTimeLimit ? null : timeLimit, // Trimite null pentru timp nelimitat
    });
  };

  return (
    <div className="start-page">
      <h1>Quiz App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nume:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Introduceți numele"
          />
        </div>
        <div>
          <label>Ordine aleatorie a întrebărilor:</label>
          <input
            type="checkbox"
            checked={randomOrder}
            onChange={(e) => setRandomOrder(e.target.checked)}
          />
        </div>
        <div>
          <label>Limită de timp (secunde):</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            min="5"
            max="60"
            disabled={noTimeLimit} // Dezactivează input-ul dacă este selectată opțiunea de timp nelimitat
          />
        </div>
        <div>
          <label>Timp nelimitat:</label>
          <input
            type="checkbox"
            checked={noTimeLimit}
            onChange={(e) => setNoTimeLimit(e.target.checked)}
          />
        </div>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default StartPage;

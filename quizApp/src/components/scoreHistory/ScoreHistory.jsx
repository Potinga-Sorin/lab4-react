import React, { useEffect, useState } from "react";
import "./ScoreHistory.css";
const ScoreHistory = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    try {
      // Citește scorurile din localStorage
      const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
      setScores(storedScores);
    } catch (error) {
      console.error("Eroare la citirea scorurilor din localStorage:", error);
      setScores([]);
    }
  }, []);

  return (
    <div className="score-history">
      <h2>Istoric Scoruri</h2>
      {scores.length === 0 ? (
        <p className="no-scores">Nu există scoruri salvate.</p>
      ) : (
        <table aria-label="Istoric scoruri utilizatori">
          <thead>
            <tr>
              <th scope="col">Utilizator</th>
              <th scope="col">Scor</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={index}>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScoreHistory;

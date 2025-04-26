import React, { useState } from "react";
import StartPage from "./components/startPage/StartPage";
import QuizPage from "./components/quizPage/QuizPage";
import ResultsPage from "./components/resultsPage/ResultsPage";
import ScoreHistory from "./components/scoreHistory/ScoreHistory";
import questions from "./data/questions.json";
import "./App.css";
import { ThemeProvider, useTheme } from "./components/ThemeContext"; // <- import corect

// Cream un mic wrapper pentru App
const AppContent = () => {
  const [quizData, setQuizData] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const { toggleTheme } = useTheme(); // <-- ACUM suntem deja în ThemeProvider

  const handleStartQuiz = (data) => {
    let shuffledQuestions = [...questions];

    if (data.randomOrder) {
      shuffledQuestions = shuffledQuestions.sort(() => Math.random() - 0.5);
    }

    setQuizData({ ...data, questions: shuffledQuestions });
  };

  const handleQuizEnd = (score, collectedAnswers) => {
    const total = quizData.questions.length;

    const newEntry = {
      username: quizData.username,
      score,
      totalQuestions: total,
    };

    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const updatedScores = [...storedScores, newEntry];
    localStorage.setItem("quizScores", JSON.stringify(updatedScores));

    setFinalScore(score);
    setAnswers(collectedAnswers);
    setQuizData(null);
  };

  const handleReset = () => {
    setFinalScore(null);
    setAnswers([]);
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        style={{ position: "fixed", top: "10px", right: "10px" }}
      >
        Schimbă Tema
      </button>

      <div className="app">
        {!quizData && finalScore === null && !viewHistory && (
          <StartPage onStartQuiz={handleStartQuiz} />
        )}

        {quizData && <QuizPage quizData={quizData} onQuizEnd={handleQuizEnd} />}

        {finalScore !== null && (
          <ResultsPage
            score={finalScore}
            totalQuestions={answers.length}
            answers={answers}
            onReset={handleReset}
          />
        )}

        {!quizData && finalScore === null && viewHistory && <ScoreHistory />}

        {!quizData && finalScore === null && (
          <button onClick={() => setViewHistory(!viewHistory)}>
            {viewHistory ? "Înapoi la Start" : "Vezi Istoricul Scorurilor"}
          </button>
        )}
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

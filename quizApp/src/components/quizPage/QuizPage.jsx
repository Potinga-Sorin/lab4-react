import React, { useState, useEffect, useCallback } from "react";
import "./QuizPage.css";

const QuizPage = ({ quizData, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [answers, setAnswers] = useState([]); // Gestionăm răspunsurile

  const questions = quizData.questions;

  const handleNextQuestion = useCallback(() => {
    const isCorrect =
      selectedOption === questions[currentQuestionIndex].correct;

    const newAnswer = {
      question: questions[currentQuestionIndex].question,
      correct: questions[currentQuestionIndex].correct,
      selectedOption,
      isCorrect,
    };

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeRemaining(quizData.timeLimit);
    } else {
      // Apelează funcția onQuizEnd pentru pagina de rezultate
      onQuizEnd(score + (isCorrect ? 1 : 0), [...answers, newAnswer]);
    }
  }, [
    questions,
    currentQuestionIndex,
    selectedOption,
    quizData.timeLimit,
    score,
    answers,
    onQuizEnd,
  ]);

  useEffect(() => {
    if (quizData.timeLimit && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, quizData.timeLimit]);

  useEffect(() => {
    if (quizData.timeLimit && timeRemaining === 0 && selectedOption === null) {
      handleNextQuestion();
    }
  }, [timeRemaining, quizData.timeLimit, selectedOption, handleNextQuestion]);

  return (
    <div className="quiz-page">
      <h2>{questions[currentQuestionIndex].category}</h2>
      <p>Dificultate: {questions[currentQuestionIndex].difficulty}</p>
      <h3>{questions[currentQuestionIndex].question}</h3>
      <div className="options">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {quizData.timeLimit && (
        <>
          <p>Timp rămas: {timeRemaining}s</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(timeRemaining / quizData.timeLimit) * 100}%`,
              }}
            ></div>
          </div>
        </>
      )}

      <button
        className="next-btn"
        onClick={handleNextQuestion}
        disabled={!selectedOption}
      >
        Următoarea întrebare
      </button>
    </div>
  );
};

export default QuizPage;

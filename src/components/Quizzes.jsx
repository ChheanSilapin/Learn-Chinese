import React, { useState } from "react";
import "../style/Quizzes.css";
import Advertisement from "./Advertisement";

const quizData = [
  {
    question: "What is the Chinese word for 'hello'?",
    options: ["Ni hao", "Zai jian", "Xie xie", "Dui bu qi"],
    answer: "Ni hao",
  },
  {
    question: "Which Chinese character means 'person'?",
    options: ["人", "木", "水", "火"],
    answer: "人",
  },
  {
    question: "How do you say 'thank you' in Chinese?",
    options: ["Zai jian", "Ni hao", "Xie xie", "Bu keqi"],
    answer: "Xie xie",
  },
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === quizData[currentQuestion].answer);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedOption("");
    setShowFeedback(false);
    setIsCorrect(false);
    setCurrentQuestion((prev) => (prev + 1) % quizData.length);
  };

  const question = quizData[currentQuestion];

  return (
    <div className="quizzes-container">
      <h2>Chinese Language Quiz</h2>

      {/* Top ad */}
      <Advertisement type="banner" count={1} />

      <div className="quiz-box">
        <p className="question">{question.question}</p>
        <ul className="options">
          {question.options.map((option, index) => (
            <li key={index}>
              <button
                className={`option-button ${
                  showFeedback && option === question.answer ? "correct" : ""
                } ${
                  showFeedback &&
                  option === selectedOption &&
                  option !== question.answer
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        {showFeedback && (
          <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect. Try the next one!"}
          </div>
        )}
        {showFeedback && (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        )}
      </div>

      <div className="quiz-content-layout">
        <div className="quiz-main-content">
          <h3>Test Your Chinese Knowledge</h3>
          <p>
            Our quizzes are designed to help you practice and reinforce your
            Chinese language skills. Complete the quiz above to test your
            knowledge of basic Chinese vocabulary and phrases.
          </p>
        </div>
        <div className="quiz-sidebar">
          {/* Sidebar ad */}
          <Advertisement type="sidebar" count={1} />
        </div>
      </div>
    </div>
  );
};

export default Quizzes;

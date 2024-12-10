import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuiz as getQuizQuestions, submitQuiz as submitQuizAnswers } from "../services/api.js";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuizQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await submitQuizAnswers(answers);
      setScore(response.score);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quiz answers:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score}/{questions.length}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Quiz</h2>
      {currentQuestion && (
        <>
          <p>
            Question {currentQuestionIndex + 1}/{questions.length}
          </p>
          <p>{currentQuestion.question}</p>
          <div>
            {currentQuestion.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option}
                    checked={answers[currentQuestion._id] === option}
                    onChange={() => handleAnswerChange(currentQuestion._id, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#f0ad4e",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={handleNext}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#0275d8",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#5cb85c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

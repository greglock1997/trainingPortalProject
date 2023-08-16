import React from 'react'
import { useState, useEffect } from 'react'

export default function Question(props) {
    // Index to show current selected answer for each question
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    // Anytime the resetAnswers value changes the selectedAnswerIndex will be reset
    // This allows us to reset the quiz
    useEffect(() => {
        setSelectedAnswerIndex(null);
    }, [props.resetAnswers]);

    const handleAnswerClick = (index) => {
        setSelectedAnswerIndex(index);
        props.onAnswer();
        if (index === props.question.correctAnswer) {
            props.onCorrectAnswer();
        }
    };
    
    const answerButtons = props.question.answers.map((answer, index) => (
        <button
            key={index}
            className={`question-answer ${
                selectedAnswerIndex !== null && index === props.question.correctAnswer
                ? 'answer-correct'
                : selectedAnswerIndex === index
                ? 'answer-incorrect'
                : ''
            }`}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswerIndex !== null}
        >
            {answer}
        </button>
    ));

    return (
        <div className="question-container">
            <h1 className="question-title">Question {props.questionNumber}</h1>
            <h2 className="question-content">{props.question.question}</h2>
            <div className="question-answers">
                {answerButtons}
            </div>
        </div>
    )
}
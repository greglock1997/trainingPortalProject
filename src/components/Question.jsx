import React from 'react'
import { useState, useEffect } from 'react'

export default function Question(props) {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

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
            <h1>Question</h1>
            <h2>{props.question.question}</h2>
            <div className="question-answers">
                {answerButtons}
            </div>
        </div>
    )
}
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const questionAnswersData = {
    1: {
        answers: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ],
        correctAnswer: 0
    },
    2: {
        answers: [
            "Dog",
            "Cat",
            "Bird",
            "Fish"
        ],
        correctAnswer: 3
    },
    3: {
        answers: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ]
    },
    4: {
        answers: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ]
    },
    5: {
        answers: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ]
    },
    6: {
        answers: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
        ]
    }
}

export default function Unit() {
    const {unitNumber} = useParams();
    const [questionAnswers, setQuestionsAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    useEffect(() => {
        const data = questionAnswersData[unitNumber];
        if (data) {
            setQuestionsAnswers(data.answers);
            setCorrectAnswer(data.correctAnswer);
        }
    }, [unitNumber]);

    // Answer click function
    const handleAnswerClick = (answerIndex) => {
        setSelectedAnswerIndex(answerIndex)
        if (answerIndex !== correctAnswer) {
            
        }
    }

    const questionElements = questionAnswers.map((answer, index) => (
        <button 
            className={
                `question-answer ${selectedAnswerIndex !== null ? (index === correctAnswer ? 'answer-correct' : (selectedAnswerIndex === index ? 'answer-incorrect' : '')) : ''}`
            } 
            onClick={() => handleAnswerClick(index)} 
            key={index}
            disabled={selectedAnswerIndex !== null ? true : false}
        >
            {answer}
        </button>
    ));

    return (
        <div className="unit-quiz-container">
            <h1>Unit {unitNumber}</h1>
            <div className="questions-container">
                {questionElements}
            </div>
        </div>
    );
}
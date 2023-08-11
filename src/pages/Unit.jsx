import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Article from '../components/Article.jsx'
import Question from '../components/Question.jsx'
import articleData from '../data/articleData.js'
import questionData from '../data/questionData'

export default function Unit() {
    const {unitNumber} = useParams();
    const [questions, setQuestions] = useState([]);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = () => {
        setQuestionsAnswered(questionsAnswered + 1);
    }

    const handleCorrectAnswer = () => {
        setScore(score + 1);
    }

    useEffect(() => {
        if (questionData) {
            setQuestions(questionData[unitNumber]);
        } else {
            console.log("No data")
        }
    }, [unitNumber]);

    console.log(articleData[unitNumber]);

    const currentArticle = articleData[unitNumber];

    return (
        <div className="unit-quiz-container">
            <Article article={currentArticle[0]}/>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${700 * (questionsAnswered / 4 )}px`}}></div>
            </div>
            {questions.map((question, index) => (
                <Question
                    key={index} 
                    question={question} 
                    onAnswer={handleAnswer}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ))}
            <h1>Score : {score} / 4</h1>
        </div>
    );
}
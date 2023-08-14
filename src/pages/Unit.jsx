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

    const currentArticle = articleData[unitNumber];

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

    return (
        <div className="unit-container">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${window.innerWidth * (questionsAnswered / questions.length )}px`}}></div>
            </div>
            <Article article={currentArticle[0]}/>
            {questions.map((question, index) => (
                <Question
                    key={index}
                    questionNumber={index + 1}
                    question={question} 
                    onAnswer={handleAnswer}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            ))}
            {questionsAnswered === questions.length ? (
               <h1 className="unit-score">Score : {score} / {questions.length}</h1>
            ) : (
                null    
            )}
        </div>
    );
}
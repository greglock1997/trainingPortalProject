import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll';
import Article from '../components/Article.jsx'
import Question from '../components/Question.jsx'
import articleData from '../data/articleData.js'
import questionData from '../data/questionData'

export default function Unit() {
    const {unitNumber} = useParams();
    const [questions, setQuestions] = useState([]);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [score, setScore] = useState(0);
    const [resetAnswers, setResetAnswers] = useState(false);

    const currentArticle = articleData[unitNumber];

    const handleAnswer = () => {
        setQuestionsAnswered(questionsAnswered + 1);
    }

    const handleCorrectAnswer = () => {
        setScore(score + 1);
    }

    // Randomise questions
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      
    // Reset quiz
    const handleResetQuiz = () => {
        setQuestionsAnswered(0);
        setScore(0);
        setResetAnswers(!resetAnswers);
        scroll.scrollToTop({
            duration: 1000,
            smooth: "easeInOutQuart"
        });
    };
      
    useEffect(() => {
        if (resetAnswers) {
            setQuestions(shuffleArray(questionData[unitNumber]));
            setResetAnswers(false);
        }
    }, [resetAnswers]);

    useEffect(() => {
        if (questionData) {
            setQuestions(shuffleArray(questionData[unitNumber]));
        } else {
            console.log("No data");
        }
    }, [unitNumber]);

    return (
        <div className="unit-container">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${window.innerWidth * (questionsAnswered / questions.length )}px`}}></div>
            </div>
            {questions.map((question, index) => (
                <Question
                    key={index}
                    questionNumber={index + 1}
                    question={question} 
                    onAnswer={handleAnswer}
                    onCorrectAnswer={handleCorrectAnswer}
                    resetAnswers={resetAnswers}
                />
            ))}
            {questionsAnswered === questions.length ? (
                <h2 className="unit-reset-button" onClick={handleResetQuiz}>You Scored {score}/{questions.length}, Try Again?</h2>
            ) : (
                <h2 className="unit-reset-button" onClick={handleResetQuiz}>Reset Quiz</h2>
            )}
        </div>
    );
}
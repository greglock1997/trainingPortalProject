import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll';
import axios from 'axios';
import Unit1 from '../pages/units/Unit1.jsx'
import Unit2 from '../pages/units/Unit2.jsx'
import Unit3 from '../pages/units/Unit3.jsx'
import Unit4 from '../pages/units/Unit4.jsx'
import Unit5 from '../pages/units/Unit5.jsx'
import Unit6 from '../pages/units/Unit6.jsx'
import Unit7 from '../pages/units/Unit7.jsx'
import Unit8 from '../pages/units/Unit8.jsx'
import Unit9 from '../pages/units/Unit9.jsx'
import Question from '../components/Question.jsx'
import questionData from '../data/questionData'

export default function Unit() {
    const {unitNumber} = useParams();
    const [questions, setQuestions] = useState([]);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [score, setScore] = useState(0);
    const [resetAnswers, setResetAnswers] = useState(false);

    // Decides whether to have article or quiz page
    const [currentPage, setCurrentPage] = useState('article');

    const togglePage = () => {
        currentPage === 'article' ? (
            setCurrentPage('quiz')
        ) : (
            setCurrentPage('article')
        )
    }

    // Load current unit
    const unitComponents = [
        Unit1,
        Unit2,
        Unit3,
        Unit4,
        Unit5,
        Unit6,
        Unit7,
        Unit8,
        Unit9
    ]

    const UnitComponent = unitComponents[unitNumber - 1]

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

    useEffect(() => {
        if ((questionsAnswered === questions.length) && (questions.length > 0)) {
            axios.post('/save-data', {unitNumber});
        }
    }, [questionsAnswered]);

    return (
        currentPage === 'quiz' ? (
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
                    <>
                        <h2 className="unit-reset-button" onClick={handleResetQuiz}>You Scored {score}/{questions.length}, Try Again?</h2>
                        <h2 className="unit-reset-button" onClick={togglePage}>Read Again?</h2>
                    </>
                ) : (
                    <>
                        <h2 className="unit-reset-button" onClick={handleResetQuiz}>Reset Quiz</h2>
                        <h2 className="unit-reset-button" onClick={togglePage}>Read Again?</h2>
                    </>
                )}
            </div>
            ) : (
                <UnitComponent togglePage={togglePage}/>
        )
    );
}
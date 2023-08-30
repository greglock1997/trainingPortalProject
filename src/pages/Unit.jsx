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

import unitStyles from '../assets/styles/unit.module.css'

export default function Unit() {
    const {unitNumber} = useParams();
    const [questions, setQuestions] = useState([]);
    const [correctlyAnsweredQuestions, setCorrectlyAnsweredQuestions] = useState([]);
    const [noOfQuestionsAnswered, setNoOfQuestionsAnswered] = useState(0);
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
        setNoOfQuestionsAnswered(noOfQuestionsAnswered + 1);
    }

    // Tracks which questions have been answered correctly
    const handleCorrectAnswer = (questionId) => {
        setScore(score + 1);
        setCorrectlyAnsweredQuestions((prevCorrectlyAnsweredQuestions) => ({
            ...prevCorrectlyAnsweredQuestions,
            [questionId]: true
        }));
    };

    const handleIncorrectAnswer = (questionId) => {
        setCorrectlyAnsweredQuestions((prevCorrectlyAnsweredQuestions) => ({
            ...prevCorrectlyAnsweredQuestions,
            [questionId]: false
        }));
    };

    useEffect(() => {
        console.log(correctlyAnsweredQuestions);
    }, [correctlyAnsweredQuestions]);

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
        setNoOfQuestionsAnswered(0);
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

    // Shuffle question data
    useEffect(() => {
        if (questionData) {
            setQuestions(shuffleArray(questionData[unitNumber]));
        } else {
            console.log("No data");
        }
    }, [unitNumber]);

    useEffect(() => {
        if ((noOfQuestionsAnswered === questions.length) && (questions.length > 0)) {
            console.log(correctlyAnsweredQuestions);

            // Convert object into an array of objects
            const answeredQuestionsArray = Object.keys(correctlyAnsweredQuestions).map(questionKey => ({
                questionId: questionKey,
                correctlyAnswered: correctlyAnsweredQuestions[questionKey]
            }));

            axios.post('/save-data', {
                unitNumber,
                correctlyAnsweredQuestions: answeredQuestionsArray
            });
        }
    }, [noOfQuestionsAnswered]);

    return (
        currentPage === 'quiz' ? (
            <div className={unitStyles['unit-container']}>
                <div className={unitStyles['progress-bar-container']}>
                    <div className={unitStyles['progress-bar']} style={{width: `${window.innerWidth * (noOfQuestionsAnswered / questions.length )}px`}}></div>
                </div>
                {questions.map((question, index) => (
                    <Question
                        key={question.id}
                        questionNumber={index + 1}
                        question={question} 
                        onAnswer={handleAnswer}
                        onCorrectAnswer={() => handleCorrectAnswer(question.id)}
                        onIncorrectAnswer={() => handleIncorrectAnswer(question.id)}
                        resetAnswers={resetAnswers}
                    />
                ))}
                {noOfQuestionsAnswered === questions.length ? (
                    <>
                        <h2 className={unitStyles['unit-reset-button']} onClick={handleResetQuiz}>You Scored {score}/{questions.length}, Try Again?</h2>
                        <h2 className={unitStyles['unit-reset-button']} onClick={togglePage}>Read Again?</h2>
                    </>
                ) : (
                    <>
                        <h2 className={unitStyles['unit-reset-button']} onClick={handleResetQuiz}>Reset Quiz</h2>
                        <h2 className={unitStyles['unit-reset-button']} onClick={togglePage}>Read Again?</h2>
                    </>
                )}
            </div>
            ) : (
                <UnitComponent togglePage={togglePage}/>
        )
    );
}
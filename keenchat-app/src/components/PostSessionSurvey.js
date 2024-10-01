import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import "../styles/PostSurvey.css";
import { Button } from "@mui/material";

const questions = [
    "The chatbot understood the goal of the session.",
    "The session was an appropriate length.",
    "The chatbot understood the problems I wished to address in the session.",
    // "The chatbot provided clarity on the issues I presented.",
    // "The chatbot offered interventions/solutions to address the problem(s).",
    // "I was attentive and active in the session.",
    // "The chatbot gave attentive and active responses in the session.",
    // "I could lead the session when I wanted/needed to.",
    // "The chatbot appropriately led the tasks in the session.",
    // "The chatbot was attuned to my responses and needs in the session.",
    // "The chatbot gave responses that expressed warmth and affirmation during the session.",
    // "The chatbot proposed new ideas/experiences that were easy to accept.",
    // "The chatbot was receptive to my responses and built on them during the session.",
    // "The session offered insight into myself and/or my situation.",
    // "The session offered helpful solutions to my problems.",
    // "The session allowed me to express and let go of my feelings.",
    // "The session provided reassurance and encouragement regarding my situation.",
    // "I feel more in control over my moods and actions.",
    // "The chatbot modified their approach and responses throughout the session to better match my needs.",
    // "I felt more/less/same comfortable during the session than in a human interaction.",
    // "The session was more/less/same useful than a human interaction."

];

const likertResponses = [
    { value: 1, text: "Strongly agree" },
    { value: 2, text: "Agree" },
    { value: 3, text: "Neutral" },
    { value: 4, text: "Disagree" },
    { value: 5, text: "Strongly disagree" }
];


const PostSessionSurvey = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    // Animation for fade-in and fade-out
    // const fade = useSpring({
    //     from: { opacity: 0 },
    //     to: { opacity: 1 },
    //     reset: true,
    //     // reverse: false,
    //     delay:0,
    //     onRest: () => {
    //         if (currentQuestionIndex === questions.length) {
    //             console.log('Finished survey:', answers);
    //         }
    //     }
    // });
    const scroll = useSpring({
        from:{opacity: 0, transform: 'translateY(100%)'},
        to:{opacity:1, transform: isExiting ? 'translateY(-300%)' : 'translateY(0%)'},
        reset:true,
        config: { tension: 400, friction: 26, mass: 1 },
        onRest:()=>{
            if(isExiting){
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setIsExiting(false);  // Reset for slide-in
                } else {
                    navigate('/end-post-survey');  // Handle survey completion
                }
            }
        }
    })

    const handleSelect = (value) => {
        const newAnswers = { ...answers, [currentQuestionIndex]: value };
        setAnswers(newAnswers);
        setIsExiting(true);
    };

    return (
        <animated.div style={scroll}>
            <form onSubmit={e => e.preventDefault()} className="survey-form">
                <fieldset>
                    <legend class="legend">{"Q" + (currentQuestionIndex + 1) + ": " + questions[currentQuestionIndex]}</legend>
                    <div className="likertBand">
                        {likertResponses.map((option, idx) => (
                            <label key={idx} className="likert-option">
                                <input
                                    type="radio"
                                    id={`question-${currentQuestionIndex}-option-${idx}`}
                                    name={`question-${currentQuestionIndex}`}
                                    value={option.value}
                                    checked={answers[currentQuestionIndex] === option.value}
                                    onChange={() => handleSelect(option.value)}
                                    style={{ display: "none" }}
                                />
                                <label htmlFor={`question-${currentQuestionIndex}-option-${idx}`} className="circle"></label>
                                <span className="option-text">{option.text}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            </form>
        </animated.div>
    );
};


export default PostSessionSurvey;

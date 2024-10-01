import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import "../styles/PreSurvey.css";
import { useNavigate } from 'react-router-dom';
import { config } from 'react-spring';

const questions = [
    "How do you feel today?",
    "What is your energy level like?",
    "How well did you sleep last night?"
];

const likertResponses = [
    { value: 1, text: "Strongly Disagree" },
    { value: 2, text: "Disagree" },
    { value: 3, text: "Neutral" },
    { value: 4, text: "Agree" },
    { value: 5, text: "Strongly Agree" }
];

const PreSurvey = () => {
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
                    navigate('/end-pre-survey');  // Handle survey completion
                }
            }
        }
    })

    const handleSelect = (value) => {
        const newAnswers = { ...answers, [currentQuestionIndex]: value };
        setAnswers(newAnswers);
        setIsExiting(true);

        // Move to the next question or complete survey after a slight delay
        // setTimeout(() => {
        //     if (currentQuestionIndex < questions.length - 1) {
        //         setCurrentQuestionIndex(currentQuestionIndex + 1);
        //     } else {
        //         console.log('Submit Survey', newAnswers);
        //         navigate('/chat');
        //     }
        // }, 1000); 
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



export default PreSurvey;

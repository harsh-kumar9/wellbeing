import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import "../styles/EndSurvey.css"
import { useNavigate } from 'react-router-dom';


const questions = [
    "How do you feel today?",
    "What is your energy level like?",
    "How well did you sleep last night?"
];

const EndSurvey = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fade, setFade] = useState(true);  
    const navigate = useNavigate();

    // Define the animation
    const props = useSpring({
        opacity: fade ? 1 : 0,
        config: { duration: 300 },
        onRest: () => {
            if (!fade) {
                // Update the question index after the fade out completes
                setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
                setFade(true);  // Trigger fade in for the next question
            }
        }
    });

    const handleNext = () => {
        // Trigger fade out
        setFade(false);
        navigate('/chat');
    };

    return (
        <div className="container">
            <animated.div style={props}>
                <h2>You are all set to begin today's session</h2>
                <button onClick={handleNext}>
                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
            </animated.div>
        </div>
    );
};

export default EndSurvey;
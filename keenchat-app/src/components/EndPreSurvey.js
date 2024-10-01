import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import "../styles/EndSurvey.css"
import { useNavigate } from 'react-router-dom';


const EndPreSurvey = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fade, setFade] = useState(true);  
    const navigate = useNavigate();

    // Define the animation
    const props = useSpring({
        opacity: fade ? 1 : 0,
        config: { duration: 300 },
        onRest: () => {
            if (!fade) {
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
                    Start
                </button>
            </animated.div>
        </div>
    );
};

export default EndPreSurvey;
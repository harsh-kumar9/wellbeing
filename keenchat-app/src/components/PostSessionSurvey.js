import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePostSurveyResults } from '../reducers/sessionSlice';

import Likert from "react-likert-scale";
import "../styles/PostSurvey.css";
import { Button } from "@mui/material";

const surveyQuestions = [
    "The chatbot understood the goal of the session.",
    "The session was an appropriate length.",
    "The chatbot understood the problems I wished to address in the session.",
    "The chatbot provided clarity on the issues I presented.",
    "The chatbot offered interventions/solutions to address the problem(s).",
    "I was attentive and active in the session.",
    "The chatbot gave attentive and active responses in the session.",
    "I could lead the session when I wanted/needed to.",
    "The chatbot appropriately led the tasks in the session.",
    "The chatbot was attuned to my responses and needs in the session.",
    "The chatbot gave responses that expressed warmth and affirmation during the session.",
    "The chatbot proposed new ideas/experiences that were easy to accept.",
    "The chatbot was receptive to my responses and built on them during the session.",
    "The session offered insight into myself and/or my situation.",
    "The session offered helpful solutions to my problems.",
    "The session allowed me to express and let go of my feelings.",
    "The session provided reassurance and encouragement regarding my situation.",
    "I feel more in control over my moods and actions.",
    "The chatbot modified their approach and responses throughout the session to better match my needs.",
    "I felt more/less/same comfortable during the session than in a human interaction.",
    "The session was more/less/same useful than a human interaction."

];

const likertResponses = [
    { value: 1, text: "Strongly agree" },
    { value: 2, text: "Agree" },
    { value: 3, text: "Neutral" },
    { value: 4, text: "Disagree" },
    { value: 5, text: "Strongly disagree" }
];


export const PostSessionSurvey = ({ onClose }) => {
    const dispatch = useDispatch();
    const [answers, setAnswers] = useState(new Array(surveyQuestions.length).fill(''));

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        console.log(`Question ${index + 1}: ${value}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePostSurveyResults(answers));
        console.log("Submitted Responses:", answers);
        onClose();  // Close survey modal or navigate away
    };

    return (
        <form class="form-background" onSubmit={handleSubmit}>
            {surveyQuestions.map((question, index) => (
            <fieldset className="question" key={index}>
                {/* Use legend for better accessibility */}
                <legend>{"Q" + (index + 1) + ": " + question}</legend>
                <div className="likertBand">
                    {likertResponses.map((option, optIndex) => (
                    <div key={optIndex} className="likert-option">
                        <input
                        type="radio"
                        id={`question-${index}-option-${optIndex}`}
                        name={`question-${index}`}
                        value={option.value}
                        checked={answers[index] === option.value}
                        onChange={() => handleChange(index, option.value)}
                        style={{ display: "none" }} 
                        />
                        <label htmlFor={`question-${index}-option-${optIndex}`} className="circle"></label> {/* This is now only for the circle (clickable) */}
                        <span className="option-text">{option.text}</span> {/* Separate element for the text */}                    
                    </div>
                    ))}
                </div>
            </fieldset>
        ))}
        <div class="center-container">
        <Button type="submit" variant="contained" className="send-button">
            Submit Survey
        </Button>
        </div>


    </form>
    );
};

export default PostSessionSurvey;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preSurveyResults: {},
    conversationLogs: [],
    postSurveyResults: {},
    sessionDetails: {
        startTime: null,
        endTime: null,
        userId: null
    }
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        updatePreSurveyResults: (state, action) => {
            state.preSurveyResults = action.payload;
        },
        addConversationLog: (state, action) => {
            state.conversationLogs.push(action.payload);
        },
        updatePostSurveyResults: (state, action) => {
            state.postSurveyResults = action.payload;
        },
        setSessionDetails: (state, action) => {
            state.sessionDetails = { ...state.sessionDetails, ...action.payload };
        },
        resetSession: (state) => {
            state.preSurveyResults = {};
            state.conversationLogs = [];
            state.postSurveyResults = {};
            state.sessionDetails = {
                startTime: null,
                endTime: null,
                userId: null
            };
        }
    }
});

export const { updatePreSurveyResults, addConversationLog, updatePostSurveyResults, setSessionDetails, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;

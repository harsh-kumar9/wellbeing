import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Conversation from "./components/Conversation";
import PostSessionSurvey from "./components/PostSessionSurvey";
import PreSurvey from "./components/PreSessionSurvey";
import EndPreSurvey from "./components/EndPreSurvey";
import EndPostSurvey from "./components/EndPostSurvey";

// 6 routes for 6 different conversation types
// 1. voice-voice: voice bot message, voice bot backchannelType
// 2. voice-text: voice bot message, text bot backchannelType
// 3. voice-none: voice bot message, no backchannelType
// 4. text-voice: text bot message, voice bot backchannelType
// 5. text-text: text bot message, text bot backchannelType
// 6. text-none: text bot message, no backchannelType

function App() {
  return (
    <div>
      <Router basename="/LLM4wellbeing">
        <Routes>
          <Route path="/" element={<Conversation />} />
          <Route
            path="/voice-voice"
            element={
              <Conversation
                main="voice"
                backchannelType="voice"
                inputType="text"
              />
            }
          />
          <Route
            path="/voice-text"
            element={
              <Conversation
                main="voice"
                backchannelType="text"
                inputType="text"
              />
            }
          />
          <Route
            path="/voice-none"
            element={
              <Conversation
                main="voice"
                backchannelType="none"
                inputType="text"
              />
            }
          />
          <Route
            path="/text-voice"
            element={
              <Conversation
                main="text"
                backchannelType="voice"
                inputType="text"
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Conversation
                main="text"
                backchannelType="text"
                inputType="text"
              />
            }
          />
          <Route
            path="/text-none"
            element={
              <Conversation
                main="text"
                backchannelType="none"
                inputType="text"
              />
            }
          />
          <Route
            path="/all-voice"
            element={
              <Conversation
                main="voice"
                backchannelType="voice"
                inputType="voice"
              />
            }
          />
          <Route
            path="/pre-survey"
            element={
              <PreSurvey
              />
            }
          />
          <Route
            path="/post-survey"
            element={
              <PostSessionSurvey
              />
            }
          />
          <Route
            path="/end-pre-survey"
            element={
              <EndPreSurvey
              />
            }
          />
          <Route
            path="/end-post-survey"
            element={
              <EndPostSurvey
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

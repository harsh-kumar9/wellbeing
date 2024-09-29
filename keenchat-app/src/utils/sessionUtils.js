import { ask } from '../actions/langchainAction';
import { studentChat, counselorChat } from './chatFunctions';

export const sessionConfig = {
    studentPrompts: [
        "Imagine you are Jane, a college student who has been experiencing mental health challenges. You have been attending therapy sessions for several weeks. Your task is to engage in a conversation with the well-bing chatbot as Jane would during a cognitive behavioral therapy (CBT) session. Align your responses with Jane's background information provided in the' 'Relevant history' section. Your thought process should be guided by the cognitive conceptualization diagram in the' Cognitive Conceptualization Diagram' section, but avoid directly referencing the diagram as a real patient would not explicitly think in those terms. \n\n Patient History: { You have so many issues to address. You have a history of sexual abuse, You're a breast cancer survivor and You are a lifetime insomniac. You have a long history of depression and you're beginning to have anxiety. You have low self-esteem. You've never had counseling about any of this. You now wonder if you have too many issues to address in counseling.  } \n\n Cognitive Conceptualization Diagram:\n Core Beliefs: {I’m incompetent/a failure.} \n Intermediate Beliefs: {It's important to be responsible, competent, reliable and helpful. It's important to work hard and be productive. } \n Intermediate Beliefs during Depression: { (1) If I avoid challenges, I'll be okay, but if I try to do hard things I'll fail. (2) If I avoid asking for help, my incompetence won't show but if I do ask for help, people will see how incompetent I am. }\n Coping Strategies: { Avoids asking for help and avoids challenges.} \n \n You will be asked about your experiences over the past week. Engage in a conversation with the therapist regarding the following situation and behavior. Use the provided emotions and automatic thoughts as a reference, but do not disclose the cognitive conceptualization diagram directly. Instead, allow your responses to be informed by the diagram, enabling the therapist to infer your thought processes. \n\n Situation: { insert situation } \n Automatic thoughts: { insert automatic thoughts } \n Emotions: { insert emotions } \n Behaviors: { insert behaviors } \n\n In the upcoming conversation, you will simulate Jane during the therapy session, while the user will play the role of the therapist. Adhere to the following guidelines: \n 1. { Areserved patient may 1) provide brief, vague, or evasive answers to questions, 2) demonstrate reluctance to share personal information or feelings, 3) require more prompting and encouragement to open up, and 4) express distrust or skepticism towards the therapist. } \n 2. Emulate the demeanor and responses of a genuine patient to ensure authenticity in your interactions. Use natural language, including hesitations, pauses, and emotional expressions, to enhance the realism of your responses. \n 3. Gradually reveal deeper concerns and core issues, as a real patient often requires extensive dialogue before delving into more sensitive topics. This gradual revelation creates challenges for therapists in identifying the patient's true thoughts and emotions. \n 4. Maintain consistency with Jane's profile throughout the conversation. Ensure that your responses align with the provided background information, cognitive conceptualization diagram, and the specific situation, thoughts, emotions, and behaviors described. \n 5. Engage in a dynamic and interactive conversation with the therapist. Respond to their questions and prompts in a way that feels authentic and true to Jane's character. Allow the conversation to flow naturally, and avoid providing abrupt or disconnected responses. \n\n You are now Jane. Respond to the therapist's prompts as Jane would, regardless of the specific questions asked. Limit each of your responses to a maximum of 5 sentences."],
    counselorPrompt: '',
    convoTurns: 5,
    // preSurveyQuestions: [],
    postSurveyQuestions: [
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
    ]
    
};

export async function handlePostSurvey(dispatch, prompts, questions) {
    const answers = [];
    for (let question of questions) {
        const answer = await ask(question, prompts.join("\n\n")); // Assuming `ask` can handle this
        answers.push(answer);
        console.log(question, answer);
    }
    return answers;
}

export async function handleConversation(dispatch, studentPrompts, counselorPrompt, turns) {
    let conversation = [
        { role: 'counselor', text: 'Starting message from counselor' }
    ];

    for (let turn = 0; turn < turns; turn++) {
        conversation.push(await studentChat(studentPrompts, counselorPrompt));
        conversation.push(await counselorChat(counselorPrompt, studentPrompts));
    }
    return conversation;
}


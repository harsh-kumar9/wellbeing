// Mock implementations of chat functions
export async function studentChat(studentPrompts, counselorPrompt) {
    // Simulate a chat response from the student perspective
    return {
        role: 'student',
        text: `Student response based on ${counselorPrompt}`
    };
}

export async function counselorChat(counselorPrompt, studentPrompts) {
    // Simulate a chat response from the counselor perspective
    return {
        role: 'counselor',
        text: `Counselor response to ${studentPrompts.join(" ")}`
    };
}

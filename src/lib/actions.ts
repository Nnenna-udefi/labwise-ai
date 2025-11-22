"use server";

import { answerMedicalLabTestQuestions } from "@/ai/flows/answerMedLabQuestions";

export async function getAiAnswer(question: string): Promise<string> {
  // if there is no question
  if (!question || question.trim().length === 0) {
    return "Please provide a question.";
  }
  try {
    const output = await answerMedicalLabTestQuestions({ question });
    return output.answer;
  } catch (error) {
    console.error("Error in getAiAnswer:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
}

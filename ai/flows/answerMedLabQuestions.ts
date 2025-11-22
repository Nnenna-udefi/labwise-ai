"use server";

import { z } from "genkit";
import { ai } from "../genkit";

/**
 * @fileOverview A medical lab test question answering AI agent.
 *
 * - answerMedicalLabTestQuestions - A function that handles the medical lab test question answering process.
 * - AnswerMedicalLabTestQuestionsInput - The input type for the answerMedicalLabTestQuestions function.
 * - AnswerMedicalLabTestQuestionsOutput - The return type for the answerMedicalLabTestQuestions function.
 */

const AnswerMedicalLabTestQuestionsInputSchema = z.object({
  question: z.string().describe("The question about the medical lab tests."),
});
export type AnswerMedicalLabTestQuestionsInput = z.infer<
  typeof AnswerMedicalLabTestQuestionsInputSchema
>;

const AnswerMedicalLabTestQuestionsOutputSchema = z.object({
  answer: z
    .string()
    .describe("The answer to the question about the medical lab test."),
});
export type AnswerMedicalLabTestQuestionsOutput = z.infer<
  typeof AnswerMedicalLabTestQuestionsOutputSchema
>;

export async function answerMedicalLabTestQuestions(
  input: AnswerMedicalLabTestQuestionsInput
): Promise<AnswerMedicalLabTestQuestionsOutput> {
  // forwards the request to the actual ai flow
  return answerMedicalLabTestQuestionsFlow(input);
}

// defining the ai prompt
const prompt = ai.definePrompt({
  name: "answerMedicalLabTestQuestionsPrompt",
  input: { schema: AnswerMedicalLabTestQuestionsInputSchema },
  output: { schema: AnswerMedicalLabTestQuestionsOutputSchema },
  prompt: `You are a medical expert specializing in medical laboratory tests. Answer the following question about a medical lab test:

Question: {{{question}}}`,
});

// ai flow
const answerMedicalLabTestQuestionsFlow = ai.defineFlow(
  {
    name: "answerMedicalLabTestQuestionsFlow",
    inputSchema: AnswerMedicalLabTestQuestionsInputSchema,
    outputSchema: AnswerMedicalLabTestQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    console.log("Received input:", input);
    console.log("Prompt output:", output);

    // output! means “I trust the output is not null because the schema ensures it.”
    return output!;
  }
);

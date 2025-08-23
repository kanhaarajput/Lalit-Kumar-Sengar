'use server';

/**
 * @fileOverview A project description improvement AI agent.
 *
 * - improveProjectDescription - A function that handles the project description improvement process.
 * - ImproveProjectDescriptionInput - The input type for the improveProjectDescription function.
 * - ImproveProjectDescriptionOutput - The return type for the improveProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveProjectDescriptionInputSchema = z.object({
  projectDescription: z.string().describe('The current description of the project.'),
});
export type ImproveProjectDescriptionInput = z.infer<typeof ImproveProjectDescriptionInputSchema>;

const ImproveProjectDescriptionOutputSchema = z.object({
  improvedDescription: z.string().describe('The improved description of the project.'),
});
export type ImproveProjectDescriptionOutput = z.infer<typeof ImproveProjectDescriptionOutputSchema>;

export async function improveProjectDescription(
  input: ImproveProjectDescriptionInput
): Promise<ImproveProjectDescriptionOutput> {
  return improveProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveProjectDescriptionPrompt',
  input: {schema: ImproveProjectDescriptionInputSchema},
  output: {schema: ImproveProjectDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating engaging project descriptions for portfolios.

You will be provided with a current project description. Your task is to rewrite it to be more engaging and accurately reflect the work done.

Current Description: {{{projectDescription}}}`,
});

const improveProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'improveProjectDescriptionFlow',
    inputSchema: ImproveProjectDescriptionInputSchema,
    outputSchema: ImproveProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

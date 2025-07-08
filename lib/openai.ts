import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import OpenAI from 'openai';
const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function generateSummaryFromOpenAI(pdftext: string) {
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdftext}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return completion.choices[0].message.content;
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'status' in err && (err as any).status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw err;
  }
}

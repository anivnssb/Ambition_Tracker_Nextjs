import { NextRequest, NextResponse } from "next/server";
import { CreateTask_Payload, Middleware } from "./types";
import { pipeline } from "@xenova/transformers";
export const promptParsing: Middleware<CreateTask_Payload> = async (
  request,
  body
) => {
  try {
    const getReply = async () => {
      console.log("model loading");
      const generator = await pipeline("text-generation", "Xenova/gpt2");
      console.log("model loaded");
      const messages = `You are a JSON extraction assistant.
Your goal is to read a short natural-language instruction and output ONLY a valid JSON object that describes a task.

The JSON must strictly follow this structure:
{
  "task_name": string,
  "frequency": "daily" | "weekly"
}

Rules:
- Output ONLY a single JSON object — no extra commentary, markdown, or explanation.
- Extract the "task_name" from the text.
- Detect the frequency ("daily" or "weekly") based on the user’s words.
- Capitalize the task name properly (e.g. "yoga" → "Yoga").
- If no valid frequency is found, default to "daily".

Examples:

Input: create a task yoga that repeat weekly  
Output: {"task_name": "Yoga", "frequency": "weekly"}

Input: ${body.task_name} 
Output: {"task_name": "Brushing Teeth", "frequency": "daily"}

Input: create task jogging  
Output: {"task_name": "Jogging", "frequency": "daily"}

Now, read the next input and output ONLY the JSON object.
`;
      const output = await generator(messages, { max_new_tokens: 512 });
      console.log(output);
    };
    getReply();
    return body;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
};

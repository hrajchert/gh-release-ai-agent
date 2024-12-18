import OpenAI from "openai";
import * as dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    // model: "text-embedding-3-large",
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);

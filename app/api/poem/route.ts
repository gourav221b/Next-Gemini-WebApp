import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";
async function run(context = "google makersuite", type = "poem") {
    let apiKey = process.env.API_KEY||""    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const joke_prompt = [
        { text: `Based on a given user input, generate a joke on the scenario a user provides. \nThe response should be funny, a tiny bit offensive and should contain some technical jargons , also should be written in classical english or any language and context the user provides and the tone should be mostly semi formal. If no context is provided, just generate a random joke about google's makersuite in english. Input: ${context}` }
    ];
    const generationConfig = {
        temperature: 1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];


    const parts = [
        { text: `Based on a given user input, generate a 80 word sonnet on the scenario a user provides. \nThe response should be funny, a tiny bit offensive and should contain some technical jargons , also should be written in classical english or any language and context the user provides and the tone should be mostly semi formal. If no context is provided, just generate a random sonnet about google's makersuite in english. Make sure that every line break is explicitly mentioned with a \n Input: ${context}` }
    ]
 
    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    const data = response.text()
    return data
}

export async function GET() {
    
    return NextResponse.json("You're not allowed to get this")
}
export async function POST(req: NextRequest) {
    const data = await req.json()
    const res = await run(data.input)     
    return NextResponse.json(res)
    
}
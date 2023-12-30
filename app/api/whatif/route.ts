import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server";
async function run(context = "Sheldon Cooper") {
    let apiKey = process.env.API_KEY||""    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    

    const generationConfig = {
        temperature: 1,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    ];

    const parts = [
        { text: `You are an alternate reality generator. Based on a real life sitauation that the user provides, generate a 250-400 word story on an alternate reality version of it. Input: ${context}` }
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
        const res = await run()     
    return NextResponse.json(res)
}
export async function POST(req: NextRequest) {
    const data = await req.json()
    const res = await run(data.input)     
    return NextResponse.json(res)
    
}
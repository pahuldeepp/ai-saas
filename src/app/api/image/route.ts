import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount, resolution } = body;

    // Auth check
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // API Key check
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI key not configured", { status: 500 });
    }

    // Input validation
    if (!prompt || !amount || !resolution) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Generate image
    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

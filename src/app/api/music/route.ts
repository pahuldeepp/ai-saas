// src/app/api/music/route.ts
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const input = {
      prompt,
      model_version: "stereo-large", // optional for better sound
      output_format: "mp3",
    };

    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      { input }
    );

    // Parse output
    const audio =
      typeof output === "string"
        ? output
        : Array.isArray(output)
        ? output[0]
        : output?.url ?? "";

    if (!audio) {
      return new NextResponse("No audio URL returned", { status: 500 });
    }

    return NextResponse.json({
      audio,
      content: `Here is the generated audio for prompt: "${prompt}"`,
    });
  } catch (error: any) {
    console.error("[MUSIC_API_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

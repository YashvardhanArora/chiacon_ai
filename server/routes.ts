import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.useCases.generate.path, async (req: Request, res: Response) => {
    try {
      const input = api.useCases.generate.input.parse(req.body);

      const prompt = `
        You are an AI consultant. A business has come to you with the following problem:
        "${input.businessProblem}"
        
        Analyze this problem and provide:
        1. A brief summary of the problem.
        2. 2-3 specific AI opportunities/use cases that could solve this problem.
        3. The expected business impact if these solutions are implemented.

        Respond with a json object using exactly this schema:
        {
          "problemSummary": "string",
          "aiOpportunities": ["string", "string"],
          "expectedImpact": "string"
        }
      `;

      const aiResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const responseContent = aiResponse.choices[0]?.message?.content;
      if (!responseContent) {
        throw new Error("Failed to generate response from AI");
      }

      const generatedContent = JSON.parse(responseContent);

      res.status(200).json({
        businessProblem: input.businessProblem,
        problemSummary: generatedContent.problemSummary,
        aiOpportunities: generatedContent.aiOpportunities,
        expectedImpact: generatedContent.expectedImpact,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}

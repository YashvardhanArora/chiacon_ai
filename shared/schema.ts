import { z } from "zod";

export const insertUseCaseSchema = z.object({
  businessProblem: z.string().min(10, "Please describe your problem in at least 10 characters"),
});

export type InsertUseCase = z.infer<typeof insertUseCaseSchema>;

export type GeneratedUseCase = {
  businessProblem: string;
  problemSummary: string;
  aiOpportunities: string[];
  expectedImpact: string;
};

import { useMutation } from "@tanstack/react-query";
import { api, type GenerateUseCaseInput } from "@shared/routes";

export function useGenerateUseCase() {
  return useMutation({
    mutationFn: async (input: GenerateUseCaseInput) => {
      const validated = api.useCases.generate.input.parse(input);
      const res = await fetch(api.useCases.generate.path, {
        method: api.useCases.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to generate use case");
      }

      return res.json();
    },
  });
}

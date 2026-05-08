/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateWorkoutPlan(goal: string, experience: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed 1-day workout plan for a gym member with the goal of ${goal} and experience level ${experience}. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                restSeconds: { type: Type.NUMBER },
                notes: { type: Type.STRING }
              },
              required: ["name", "sets", "reps", "restSeconds"]
            }
          }
        },
        required: ["name", "exercises"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateDietPlan(goal: string, budget: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a budget-friendly Indian diet plan for a gym member with the goal of ${goal}. Budget context: ${budget}. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calorieTarget: { type: Type.NUMBER },
          waterTarget: { type: Type.NUMBER },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                description: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER }
              },
              required: ["time", "description", "calories", "protein"]
            }
          }
        },
        required: ["name", "meals", "calorieTarget", "waterTarget"]
      }
    }
  });

  return JSON.parse(response.text);
}

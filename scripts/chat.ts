import { OpenAI } from "langchain/llms/openai";
import { Model } from "./models";
import { Result, Succeeded } from "./result";
import { config } from "./config";

export const chat = async (model: Model, prompt: string): Promise<Result<string>> => {
  const openAi = new OpenAI({
    temperature: 1,
    modelName: model.name,
    openAIApiKey: config.get("openAiApiKey")
  })

  const res = await openAi.call(prompt)
  
  return Succeeded(res)
}
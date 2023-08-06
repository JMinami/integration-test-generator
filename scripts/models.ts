import { TiktokenModel } from "@dqbd/tiktoken";
import { Failed, Result, Succeeded } from "./result";

export interface Model {
  name: ModelType
  maxLength: number
}

const modelTypes = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-4",
  "gpt-4-32k"
] as const

export type ModelType = (typeof modelTypes)[number]

type ModelMap = {
  [key in ModelType]: Model
}
export const ModelMap: ModelMap = {
  "gpt-3.5-turbo": {
    name: "gpt-3.5-turbo",
    maxLength: 4096
  },
  "gpt-3.5-turbo-16k": {
    name: "gpt-3.5-turbo-16k",
    maxLength: 16384
  },
  "gpt-4": {
    name: "gpt-4",
    maxLength: 8192
  },
  "gpt-4-32k": {
    name: "gpt-4-32k",
    maxLength: 32768 
  }
} as const 

export const getModel = (modelType: string): Result<Model> => {
  if (modelTypes.some(modelName => modelName == modelType)) {
    return Succeeded(ModelMap[modelType])
  }

  return Failed(new Error(`invalid model type: ${modelType}`))
}
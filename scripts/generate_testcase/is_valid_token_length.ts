import { encoding_for_model } from "@dqbd/tiktoken"
import { Model } from "../models"
import { Failed, Result, Succeeded } from "../result"
import { encode } from "gpt-3-encoder"

export const isValidTokenLength = (prompt: string, model: Model): Result<boolean> => {
  try {
    const token = encode(prompt)
    
    return token.length < model.maxLength ? Succeeded(true) : Succeeded(false)
  } catch (e) {
    return Failed(e)
  }
}
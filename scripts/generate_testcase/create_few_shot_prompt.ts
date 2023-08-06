import { PromptTemplate, PipelinePromptTemplate} from "langchain/prompts"
import { ConbineProtoAndTestcase } from "./combine_proto_and_testcase";
import { Failed, Result, Succeeded } from "../result";
import {EOL} from "os"

export const createFewShotPrompt = async (
  examples: ConbineProtoAndTestcase[],
  targetProto: string
): Promise<Result<string>> => {
  try {
    const fullPrompt = PromptTemplate.fromTemplate(`{introduction}
## 例
{example}

## 本番
{start}`)

    const introductionPrompt = PromptTemplate.fromTemplate(
      "文章の続きを作成してください"
    )

    const examplePrompt = PromptTemplate.fromTemplate(
      examples.map(example => {
        return `### proto
${example.protoContent}
### テストシナリオ
${example.testcase}`}).join(EOL)
    )

    const startPrompt = PromptTemplate.fromTemplate(
      `### proto
${targetProto}
### テストシナリオ`)

    const composedPrompt = new PipelinePromptTemplate({
      pipelinePrompts: [
        {
          name: "introduction",
          prompt: introductionPrompt
        },
        {
          name: "example",
          prompt: examplePrompt
        },
        {
          name: "start",
          prompt: startPrompt
        }
      ],
      finalPrompt: fullPrompt
    })
    
    const prompt = await composedPrompt.format([])
    return Succeeded(prompt)
  }catch (e) {
    return Failed(e)
  }
}
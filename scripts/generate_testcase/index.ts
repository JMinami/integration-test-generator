import { getFiles } from "../read_files"
import * as path from "path"
import { writeFile } from "../write_file"
import { conbineProtoAndTestcase } from "./combine_proto_and_testcase"
import { createFewShotPrompt } from "./create_few_shot_prompt"
import { chat } from "../chat"
import { getModel } from "../models"
import { config } from "../config"

const run = () => {
  const projectDir = path.resolve(__dirname, "../../")
  // .protoファイル(複数指定可)の読み込み
  const exampleProtoDir = path.resolve(projectDir, "examples/proto")
  const exampleProtos = getFiles(exampleProtoDir)
  if (!exampleProtos.isSucceeded) throw(exampleProtos.error)

  // testcaseファイル(複数指定可)の読み込み
  const exampleTestcaseDir = path.resolve(projectDir, "examples/testcase")
  const exampleTestcase = getFiles(exampleTestcaseDir)
  if (!exampleTestcase.isSucceeded) throw(exampleTestcase.error)

  // targetのprotoファイルの読み込み
  const targetProtoDir = path.resolve(projectDir, "target/proto")
  const targetProtos = getFiles(targetProtoDir)
  if (!targetProtos.isSucceeded) throw(targetProtos.error)

  // exampleのひとまとめにする
  const combines = conbineProtoAndTestcase(exampleProtos.value, exampleTestcase.value)
  if (!combines.isSucceeded) throw(combines.error)

  const model = getModel(config.get("apiModel"))
  if (!model.isSucceeded) throw(model.error)

  // プロンプトの作成
  targetProtos.value.forEach(async (proto, index) => {
    const prompt = await createFewShotPrompt(combines.value, proto.content)
    if (!prompt.isSucceeded) throw(prompt.error)
    
    console.log(prompt.value)
    // const testcase = await chat(model.value, prompt.value)
    // if (!testcase.isSucceeded) throw(testcase.error)

    // const targetTestcaseDir = path.resolve(projectDir, "target/testcase/")
    // const targetTestcaseFile = path.resolve(targetTestcaseDir, "testcase" + index + ".txt")
    // writeFile(targetTestcaseFile, testcase.value)
  })

}

run()
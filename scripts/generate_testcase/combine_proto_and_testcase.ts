import { Result, Succeeded } from "../result";
import { MyFile } from "./read_files";

export interface ConbineProtoAndTestcase {
  name: string
  protoContent: string
  testcase: string
}

export const conbineProtoAndTestcase = (
  protos: MyFile[],
  testcases: MyFile[]
): Result<ConbineProtoAndTestcase[]> => {
  const res: ConbineProtoAndTestcase[] = []

  protos.forEach(proto => {
    testcases.forEach(testcase => {
      if (proto.nameWithoutExt === testcase.nameWithoutExt) {
        res.push({
          name: proto.nameWithoutExt,
          protoContent: proto.content,
          testcase: testcase.content
        })
      }
    })
  })

  return Succeeded(res)
}
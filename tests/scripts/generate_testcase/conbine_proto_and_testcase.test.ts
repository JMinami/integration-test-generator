import { conbineProtoAndTestcase } from "../../../scripts/generate_testcase/combine_proto_and_testcase"

describe("protoファイルとそのテストケースをひとまとめにすることができる", () => {
  test("一件ひとまとめにできる", () => {
    const result = conbineProtoAndTestcase([{
      nameWithoutExt: "user",
      content: "user proto"
    }], [{
      nameWithoutExt: "user",
      content: "user testcase"
    }])

    expect(result.isSucceeded).toBe(true)
    expect(result.value).toEqual(expect.arrayContaining([
      {
        name: "user",
        protoContent: "user proto",
        testcase: "user testcase"
      }
    ]))
  })

  test("余分なtestcaseが一件ある", () => {
    const result = conbineProtoAndTestcase([{
      nameWithoutExt: "user",
      content: "user proto"
    }], [{
      nameWithoutExt: "user",
      content: "user testcase"
    }, {
      nameWithoutExt: "user2",
      content: "user testcase2"
    }])
    expect(result.isSucceeded).toBe(true)
    expect(result.value).toEqual(expect.arrayContaining([
      {
        name: "user",
        protoContent: "user proto",
        testcase: "user testcase"
      }
    ]))
  })

  test("testcaseが二件ある", () => {
    const result = conbineProtoAndTestcase([{
      nameWithoutExt: "user",
      content: "user proto"
    }, {
      nameWithoutExt: "user2",
      content: "user proto2"
    }], [{
      nameWithoutExt: "user",
      content: "user testcase"
    }, {
      nameWithoutExt: "user2",
      content: "user testcase2"
    }])
    expect(result.isSucceeded).toBe(true)
    expect(result.value).toEqual(expect.arrayContaining([
      {
        name: "user",
        protoContent: "user proto",
        testcase: "user testcase"
      },
      {
        name: "user2",
        protoContent: "user proto2",
        testcase: "user testcase2"
      }
    ]))
  })

  test("ひとまとめにできなかった", () => {
    const result = conbineProtoAndTestcase([{
      nameWithoutExt: "user3",
      content: "user proto"
    }], [{
      nameWithoutExt: "user",
      content: "user testcase"
    }, {
      nameWithoutExt: "user2",
      content: "user testcase2"
    }])
    expect(result.isSucceeded).toBe(true)
    expect(result.value.length).toBe(0)
  })
})
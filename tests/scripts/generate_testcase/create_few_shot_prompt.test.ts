import { createFewShotPrompt } from "../../../scripts/generate_testcase/create_few_shot_prompt"

test("例が一件のときプロンプトを作成できる", async () => {
  const res = await createFewShotPrompt([{
    name: "user",
    protoContent: "proto",
    testcase: "testcase"
  }], "target")

  expect(res.isSucceeded).toBe(true)
  expect(await res.value).toBe(`文章の続きを作成してください
## 例
### proto
proto
### テスト
testcase

## 本番
### proto
target
### テスト`)
})


test("例が二件のときプロンプトを作成できる", async () => {
  const res = await createFewShotPrompt([{
    name: "user",
    protoContent: "proto",
    testcase: "testcase"
  }, {
    name: "user2",
    protoContent: "proto2",
    testcase: "testcase2"
  }
], "target")

  expect(res.isSucceeded).toBe(true)
  expect(await res.value).toBe(`文章の続きを作成してください
## 例
### proto
proto
### テスト
testcase
### proto
proto2
### テスト
testcase2

## 本番
### proto
target
### テスト`)
})
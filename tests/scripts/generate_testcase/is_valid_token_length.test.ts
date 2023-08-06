import { isValidTokenLength } from "../../../scripts/generate_testcase/is_valid_token_length"
import { ModelMap } from "../../../scripts/models"
import { longLongText } from "./datas/long_long_text/long_long_text"

test("トークン長が範囲内", () => {
  const model = ModelMap["gpt-3.5-turbo"]
  const res = isValidTokenLength("test", model)
  expect(res.isSucceeded).toBe(true)
  expect(res.value).toBe(true)
})

test("トークン長が長すぎる", () => {
  const model = ModelMap["gpt-3.5-turbo"]
  const res = isValidTokenLength(longLongText, model)
  expect(res.isSucceeded).toBe(true)
  expect(res.value).toBe(false)
})

test("トークン長が長くてもモデルを変えれば大丈夫", () => {
  const model = ModelMap["gpt-3.5-turbo-16k"]
  const res = isValidTokenLength(longLongText, model)
  expect(res.isSucceeded).toBe(true)
  expect(res.value).toBe(true)
})
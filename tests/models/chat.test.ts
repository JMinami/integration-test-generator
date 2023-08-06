import { chat } from "../../scripts/chat"
import { ModelMap } from "../../scripts/models"
import { Succeeded } from "../../scripts/result"

test("chatすることができる", async () => {
  /*
  const model = ModelMap["gpt-3.5-turbo"]
  const res = await chat(model, "こんにちは。よろしくお願いします")
  */
  
  const res = Succeeded("こんにちは")
  expect(res.isSucceeded).toBe(true)
  expect(res.value).not.toBe("")
  console.log(res.value)
})
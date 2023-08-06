import { getModel } from "../../../scripts/models"

test("gpt-3.5-turboのメタ情報を取得できる", () => {
  const model = getModel("gpt-3.5-turbo")

  expect(model.isSucceeded).toBe(true)
  expect(model.value).toEqual({
    name: "gpt-3.5-turbo",
    maxLength: 4096
  })
})

test("存在しないモデルのメタ情報は取得できない", () => {
  const model = getModel("gpt-4-turbo")

  expect(model.isSucceeded).toBe(false)
})
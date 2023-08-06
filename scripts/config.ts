const values = ["openAiApiKey", "apiModel"] as const
type ValueType = (typeof values)[number]
interface Config {
  get: (key: ValueType) => any
  has: (key: ValueType) => boolean
}
export const config: Config = require("config")
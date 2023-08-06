import { writeFileSync } from "fs"
import { Failed, Result, Succeeded } from "./result"

export const writeFile = (filename: string, content: string): Result<void> => {
  try {
    writeFileSync(filename, content)
    return Succeeded(undefined)
  } catch(e) {
    return Failed(e)
  }
}
import { readdirSync, readFileSync} from "fs"
import { Failed, Result, Succeeded } from "../result";
import { parse} from "path"

export interface MyFile {
  nameWithoutExt: string;
  content: string;
}

export const getFiles = (path: string): Result<MyFile[]> => {
  const res: MyFile[] = []
  try {
    const files = readdirSync(path)
    files.forEach((file: string) => {
      const content = readFileSync(path + "/" + file)
      res.push({
        nameWithoutExt: getFileNameWithoutExt(file),
        content: content.toString()
      })
    })
  } catch(e) {
    return Failed(e)
  }
  return Succeeded(res)
}

const getFileNameWithoutExt = (name: string): string => {
  return parse(name).name
}
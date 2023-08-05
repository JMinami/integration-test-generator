import { getFiles } from "../../../scripts/generate_testcase/read_files"

describe("ディレクトリを指定するとファイル名とファイルの中身を取得する", ()=>{
  test("ディレクトリに一件だけファイルがある場合、正しく取得できる", () => {
    const files = getFiles(__dirname + "/datas/read_file1")
    expect(files.isSucceeded).toBe(true)
    expect(files.value.length).toBe(1)
    expect(files.value[0].nameWithoutExt).toBe("test")
    expect(files.value[0].content).toBe("テスト")
  })

  test("ディレクトリに二件あるとき、正しく取得できる", () => {
    const files = getFiles(__dirname + "/datas/read_file2")
    expect(files.isSucceeded).toBe(true)
    expect(files.value.length).toBe(2)
    expect(files.value).toEqual(expect.arrayContaining([
      {nameWithoutExt: "test", content: "test"},
      {nameWithoutExt: "test2", content: "test2"}
    ]))
  })

  test("ディレクトリにファイルが存在しないとき、エラーを応答する", () => {
    const files = getFiles(__dirname + "/datas/read_file100")
    expect(files.isSucceeded).toBe(false)
  })
})
import { readFile } from 'fs'

export async function readJson (path: string) {
  return await new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err != null) {
        console.log('Unable to read the file and its contents in file', path)
        reject(err)
      }
      const contents = JSON.parse(data)
      resolve(contents)
    })
  })
}

import { readFile } from 'fs'

export function readJson (path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        console.log('Unable to read the file and its contents in file', path)
        reject(err)
      }
      const contents = JSON.parse(data)
      resolve(contents)
    })
  })
}

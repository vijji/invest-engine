import { writeFile } from 'fs'
export function writeJson (path: string, data: Object) {
  writeFile(path, JSON.stringify(data, null, 5), (error) => {
    if (error) {
      console.log('An error has occurred ', error)
      return
    }
    console.log('Data written successfully to disk')
  })
}

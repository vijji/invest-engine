import fs from 'fs'
import { readJson } from './readJson.ts'

export class DataStoreFromFiles {
  private readonly folderPath = './src/data/ticker-finology-share-holders/'
  private readonly ignoreFile = '.DS_Store'
  private async readFilesAndBuildArray () {
    return await new Promise((resolve, reject) => {
      fs.readdir(this.folderPath, {}, (err, files) => {
        if (err != null) {
          console.error('Failed to read directory')
          reject(err)
        }
        resolve(files)
      })
    })
  }

  async buildDataSet (): Promise<any[]> {
    const dataSet: any = []
    const filesArray: any = await this.readFilesAndBuildArray()
    for (const index in filesArray) {
      const filename = filesArray[index]
      if (!filename.includes(this.ignoreFile)) {
        const contents: any = await readJson(`${this.folderPath}/${filename}`)
        if (contents !== null) {
          dataSet.push(contents)
        }
      }
    }

    return dataSet
  }
}

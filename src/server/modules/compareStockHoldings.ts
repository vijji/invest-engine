import fs from 'fs'
import { readJson } from './readJson.ts'

export async function compareStockHoldings (): Promise<Array<any>> {
  const folderPath = './src/data/ticker-finology-share-holders/'
  function readFilesAndBuildArray () {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, {}, (err, files) => {
        if (err) {
          console.error('Failed to read directory')
          reject(err)
        }
        resolve(files)
      })
    })
  }

  function isWhatPercentOf (x:any, y: any): number {
    return (x / y) * 100
  }

  const filesArray: any = await readFilesAndBuildArray()

  const stockHoldersList: any[] = []
  for (const index in filesArray) {
    const filename = filesArray[index]
    const contents: any = await readJson(`${folderPath}/${filename}`)
    if (contents !== null) {
      // @ts-ignore
      const holdings = contents.holdings.map(holder => {
        const valueInvested = parseFloat(holder[7].trim()).toFixed(2)
        // @ts-ignore
        return { name: holder[1], totalInvestment: valueInvested, percentage: parseFloat(isWhatPercentOf(valueInvested, contents.networth)).toFixed(2) }
      })

      // @ts-ignore
      stockHoldersList[index] = {
        name: contents.name,
        networth: contents.networth,
        holdings
      }
    }
  }

  return stockHoldersList
}

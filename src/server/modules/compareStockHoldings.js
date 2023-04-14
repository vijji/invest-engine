import fs from 'fs'
import { readJson } from './readJson.js'

export async function compareStockHoldings () {
  const folderPath = './src/data/share-holders/'
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

  function isWhatPercentOf (x, y) {
    return (x / y) * 100
  }

  const filesArray = await readFilesAndBuildArray()
  const stockHoldersList = []
  for (const index in filesArray) {
    const filename = filesArray[index]
    const contents = await readJson(`${folderPath}/${filename}`)
    if (contents !== null) {
      const holdings = contents.holdings.map(holder => {
        const valueInvested = parseFloat(holder[7].trim()).toFixed(2)
        return { name: holder[1], totalInvestment: valueInvested, percentage: parseFloat(isWhatPercentOf(valueInvested, contents.networth)).toFixed(2) }
      })
      stockHoldersList[index] = {
        name: contents.name,
        networth: contents.networth,
        holdings
      }
    }
  }

  return stockHoldersList
}

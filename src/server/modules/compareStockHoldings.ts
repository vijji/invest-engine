import { DataStoreFromFiles } from './DataStoreFromFiles.ts'
import { Convertions } from '../utilities/Convertions.ts'

export async function compareStockHoldings (): Promise<any[]> {
  const store = new DataStoreFromFiles()
  const dataSet = await store.buildDataSet()

  const stockHoldersList: any[] = []
  for (const index in dataSet) {
    const contents = dataSet[index]
    // @ts-ignore holder variable is not very conclusive
    const holdings = contents.holdings.map(holder => {
      const valueInvested = parseFloat(holder[7].trim()).toFixed(2)
      return { name: holder[1], totalInvestment: valueInvested, percentage: (new Convertions(contents.networth).getPercentage(new Convertions(valueInvested))) }
    })
    stockHoldersList[index] = {
      name: contents.name,
      networth: contents.networth,
      holdings
    }
  }

  return stockHoldersList
}

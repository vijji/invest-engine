import { Convertions } from '../utilities/Convertions.ts'
import { DataStoreFromFiles } from '../modules/DataStoreFromFiles.ts'
import { writeJson } from '../modules/writeJson.ts'
export class TopFiveRecommendations {
  async runRecommendationEngine (): Promise<any[]> {
    const recommendedList: any = []
    const store = new DataStoreFromFiles()
    const dataSet = await store.buildDataSet()
    for (const index in dataSet) {
      const investmentFirm = dataSet[index]
      const companyName: string = investmentFirm.name
      const holdings = this.sortByHighInvestments(investmentFirm.holdings)
      const networth = investmentFirm.networth
      recommendedList.push({investmentFirmName: companyName,  networth: networth, top5Holdings: holdings })
    }

    return this.sortByNetWorth(recommendedList)
  }

  sortByHighInvestments (stockHoldings: any[]): any[] {
    stockHoldings.sort((a: any, b: any) => {
      const number1 = new Convertions(a[7]).getWholeNumber()
      const number2 = new Convertions(b[7]).getWholeNumber()

      return number2 - number1
    })

    const slicedStockHoldings = stockHoldings.slice(0, 5)
    const output: any[] = []
    slicedStockHoldings.forEach((holder) => {
      const amount: number = new Convertions(holder[7]).getWholeNumber()
      output.push({ name: holder[1], investedAmount: amount })
    })

    return output
  }

  sortByNetWorth (investmentFirms: any[]): any[] {
    investmentFirms.sort((a: any, b: any) => {
      return b.networth - a.networth
    })

    return investmentFirms
  }
}

const engine: TopFiveRecommendations = new TopFiveRecommendations()
const output = await engine.runRecommendationEngine()

const path = './src/data/top-five-recommendations.json'
writeJson(path, output)

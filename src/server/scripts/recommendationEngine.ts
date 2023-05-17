#!/usr/local/bin/node
import { compareStockHoldings } from '../modules/compareStockHoldings.ts'
import { writeJson } from '../modules/writeJson.ts'

const recommendedList: any = {}
const giantList = await compareStockHoldings()

giantList.forEach((value: any, index: number, array: any[]) => {
  value.holdings.forEach((holder: any) => {
    const companyName = holder.name
    if (!holder.totalInvestment.includes("0.00") && !holder.totalInvestment.includes("NaN"))
    {
      if (recommendedList[companyName]) {
        recommendedList[companyName].rank += 1
        recommendedList[companyName].holders[value.name] = { networth: value.networth, totalInvestment: holder.totalInvestment, percentage: holder.percentage }
      } else {
        const investmentDataSet: any = {}
        investmentDataSet[value.name] = { networth: value.networth, totalInvestment: holder.totalInvestment, percentage: holder.percentage }
        recommendedList[companyName] = { rank: 1, holders: investmentDataSet }
      }
    }
  })
})

function sortByRank (recommendedList: any, filter = false) {
  let recommendedArray = Object.entries(recommendedList)
  recommendedArray.sort((a: any, b: any) => (b[1].rank - a[1].rank))
  if (filter) {
    recommendedArray = recommendedArray.filter(function (item: any) {
      return item[1].rank > 1
    })
  }
  return Object.fromEntries(recommendedArray)
}

// const output = sortByRank(recommendedList)
// const path = './src/data/recommendation.json'
//console.log(output)
const output = sortByRank(recommendedList, true);
let path = './src/data/recommendation-with-highest-rank.json';
writeJson(path, output)

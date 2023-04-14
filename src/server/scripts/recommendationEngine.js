#!/usr/local/bin/node
import { compareStockHoldings } from '../modules/compareStockHoldings.js'
import { writeJson } from '../modules/writeJson.js'

const recommendedList = {}
const giantList = await compareStockHoldings()
giantList.forEach((value, index, array) => {
  value.holdings.forEach((holder) => {
    const companyName = holder.name
    if (recommendedList[companyName]) {
      recommendedList[companyName].rank += 1
      recommendedList[companyName].holders[value.name] = { networth: value.networth, totalInvestment: holder.totalInvestment, percentage: holder.percentage }
    } else {
      const investmentDataSet = {}
      investmentDataSet[value.name] = { networth: value.networth, totalInvestment: holder.totalInvestment, percentage: holder.percentage }
      recommendedList[companyName] = { rank: 1, holders: investmentDataSet }
    }
  })
})

function sortByRank (recommendedList, filter = false) {
  let recommendedArray = Object.entries(recommendedList)
  recommendedArray.sort((a, b) => (b[1].rank - a[1].rank))
  if (filter) {
    recommendedArray = recommendedArray.filter(function (item) {
      return item[1].rank > 1
    })
  }
  return Object.fromEntries(recommendedArray)
}

const output = sortByRank(recommendedList)
const path = './src/data/recommendation.json'
// console.log(output)
// const output = sortByRank(recommendedList, true);
// let path = './src/data/recommendation-with-highest-rank.json';
writeJson(path, output)

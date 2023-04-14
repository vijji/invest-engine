import { htmlParser } from './htmlParser.js'
import { parse } from 'node-html-parser'

export async function investorholdings (url) {
  function parseHeaders (headerSelector) {
    const headerColumns = headerSelector.rawText.trim()
    return headerColumns.split(/\r?\n/).filter(function (val) { return val.trim() })
  }
  function parseStockHoldings (root) {
    const stockHolders = []
    root.querySelector('tbody').querySelectorAll('td').forEach((val, index) => {
      const arrayIndex = Math.floor(index / 8)
      if (!stockHolders[arrayIndex]) {
        stockHolders[arrayIndex] = []
      }
      stockHolders[arrayIndex].push(val.structuredText)
    })
    return stockHolders
  }
  function getNetWorth (root) {
    let netWorth = ''
    root.forEach((el, index, arrayEl) => {
      netWorth = arrayEl[1].structuredText.trim()
    })
    return netWorth
  }

  try {
    const data = await htmlParser(url)
    const root = parse(data)
    const investorNameSelector = root.querySelector('h1').rawText.trim()
    const netWorth = getNetWorth(root.querySelectorAll('strong')).replace(' Cr.', '')

    const headerColumns = parseHeaders(root.querySelector('thead'))
    const stockHoldings = parseStockHoldings(root)
    stockHoldings.sort((a, b) => (a[1] < b[1]) ? -1 : 1)

    return {
      name: investorNameSelector,
      networth: netWorth,
      header: headerColumns,
      'stocks owned': stockHoldings.length,
      holdings: stockHoldings
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

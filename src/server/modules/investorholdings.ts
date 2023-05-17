import { htmlParser } from './htmlParser.js'
import { parse } from 'node-html-parser'

// @ts-ignore
export async function investorholdings (url: string): Promise<object> {
  function parseHeaders (headerSelector: any) {
    const headerColumns = headerSelector.rawText.trim()
    return headerColumns.split(/\r?\n/).filter(function (val:string) { return val.trim() })
  }
  function parseStockHoldings (root: any) {
    const stockHolders:any[] = []
    root.querySelector('tbody').querySelectorAll('td').forEach((val: any, index: number) => {
      const arrayIndex = Math.floor(index / 8)
      if (!stockHolders[arrayIndex]) {
        stockHolders[arrayIndex] = []
      }
      stockHolders[arrayIndex].push(val.structuredText)
    })
    return stockHolders
  }
  function getNetWorth (root: any) {
    let netWorth = ''
    root.forEach((el:any, index:number, arrayEl:any) => {
      netWorth = arrayEl[1].structuredText.trim()
    })
    return netWorth
  }

  try {
    const data = await htmlParser(url)
    const root = parse(data)
    // @ts-ignore
    const investorNameSelector = root.querySelector('h1').rawText.trim()
    const netWorth = getNetWorth(root.querySelectorAll('strong')).replace(' Cr.', '')

    const headerColumns = parseHeaders(root.querySelector('thead'))
    const stockHoldings = parseStockHoldings(root)

    return {
      name: investorNameSelector,
      networth: netWorth,
      header: headerColumns,
      'stocks owned': stockHoldings.length,
      holdings: stockHoldings
    }
  } catch (error) {
    console.error(error)
  }
}

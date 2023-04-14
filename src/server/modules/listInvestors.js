import { parse } from 'node-html-parser'
import { htmlParser } from './htmlParser.js'

export async function listInvestors (url, tag) {
  try {
    const data = await htmlParser(url)
    const root = parse(data)
    const htmlElements = root.getElementsByTagName(tag)
    const investors = []
    htmlElements.forEach(function (element) {
      investors.push(element.rawText)
    })

    return investors
  } catch (error) {
    console.error(error)
    return null
  }
}

#!/usr/local/bin/node
import { investorholdings } from '../modules/investorholdings.js'
import { readJson } from '../modules/readJson.ts'
import { writeJson } from '../modules/writeJson.ts'
import { createRequire } from 'module'
import fs from 'fs'

const require = createRequire(import.meta.url)
const env = require('../../../env.json')

try {
  const base = env.tracker.site1.shareholders
  const inputfile = env.tracker.site1.listinvestors.outputfilename
  const siteurl: string = base.url
  const folderName: string = base.outputfilepath
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }

  readJson(inputfile).then((contents: any) => {
    const shareholders = JSON.parse(contents)

    for (const client in shareholders) {
      const name: string = shareholders[client]
      const url = siteurl + name.toLowerCase().replace(/\s+/g, '-').replace('---', '-')
      const outputFileName = folderName + name + '.json'

      investorholdings(url).then((details) => {
        writeJson(outputFileName, details)
      }).catch((error) => {
        console.error(error)
      })
    }
  }).catch((error) => {
    console.error(error)
  })
} catch (error) {
  console.error(error)
}

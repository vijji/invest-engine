#!/usr/local/bin/node
import { investorholdings } from '../modules/investorholdings.js'
import { readJson } from '../modules/readJson.js'
import { writeJson } from '../modules/writeJson.js'
import { createRequire } from 'module'
import fs from 'fs'

const require = createRequire(import.meta.url)
const env = require('../../../env.json')

try {
  const base = env.tracker.site1.shareholders
  const inputfile = env.tracker.site1.listinvestors.outputfilename
  const siteurl = base.url
  const folderName = base.outputfilepath
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }

  readJson(inputfile).then((contents) => {
    const shareholders = JSON.parse(contents)

    for (const client in shareholders) {
      const name = shareholders[client]
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

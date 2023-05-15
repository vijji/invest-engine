#!/usr/local/bin/node
import { listInvestors } from '../modules/listInvestors.js'
import { writeJson } from '../modules/writeJson.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const env = require('../../../env.json')
const base = env.tracker.site1.listinvestors
const url = base.url
const tag = base.tag
const filePath = base.outputfilename

listInvestors(url, tag)
  .then((investors) => {
      console.log('Data writtern to', filePath)
      writeJson(filePath, JSON.stringify(investors))
  })
  .catch((error) => {
    console.error(error)
  })

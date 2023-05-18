import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

app.get('/hello', (_, res) => {
  res.send('Hello Vite + Vue + TypeScript!')
})

app.get('/novue', (_, res) => {
  res.send('Plain response body with no vue')
})

ViteExpress.listen(app, 5173, () => { console.log('Server is listening on port 5173...check out on http://localhost:5173') }
)

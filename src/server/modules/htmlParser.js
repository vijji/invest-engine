import https from 'https'
export function htmlParser (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        resolve(data)
      })
    }).on('error', (error) => {
      console.log('error, rejected', url)
      reject(error)
    })
  })
}

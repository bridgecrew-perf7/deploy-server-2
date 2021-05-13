import path from 'path'
console.log('env', process.env.NODE_ENV)
import dotenv from 'dotenv'
const params = dotenv.config({
  path: path.resolve(`./${process.env.NODE_ENV}.env`)
})

// const params = dotenv.config({ path: path.resolve(__dirname, `.env`) }).parsed

const port = process.env['PORT']
console.log('ppp', params)
import express from 'express'

// var cors = require('cors')
import cors from 'cors'
import router from './router/index.js'

const app = express()
app.use(cors())
app.use(express.json({limit: '2100000000kb'}))
app.use('/api', router)
// app.use(errorHandler)



app.listen(port, () => {
  console.log(`http server is running at port ${port}.`);
})


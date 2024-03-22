//const express = require('express')
import express from 'express'
import {PORT, HOST} from './config.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import logger from './middlewares/logger.js'
import cors from 'cors'

const app = express()

app.use(cors())

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:8081', ],
//   methods: ['POST', 'GET', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))
app.use(logger)
app.use(express.json())

app.use('/user', userRouter)
app.use('/product', productRouter)

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`)
})



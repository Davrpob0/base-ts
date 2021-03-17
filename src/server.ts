import { Request, Response, NextFunction }  from 'express'
import chalk from 'chalk'
import MongoDb from './lib/mongo'
import logger from './lib/logger'
import app from './index'
import http from 'http'
import morgan from 'morgan'

const port = process.env.SERVER_PORT

const figlet = require('figlet')
const server = http.createServer(app)

MongoDb.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 500) {
    logger.error(err.message)
    res.status(500).json({
      message: 'Servicio no disponible'
    })
  } else {
    res.status(err.status).json({
      message: err.message
    })
  }
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Recurso no encontrado'
  })
})

app.use(morgan('dev'))

server.listen(port, () => {
  figlet('CRUD - API', (err: any, figletText: any) => {
    if (err) {
      throw err
    }
    process.stdout.write(chalk.yellow(figletText + '\n'))
    logger.info(`API is running on: ${port}`)
  })
})

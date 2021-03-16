import express from 'express'
import { Application, Response, Request } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'

// Modules
import usuario from  './routes/usuario'

const swaggerUi = require('swagger-ui-express')

const app: Application = express()

/** Cors */
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: [
      'http://localhost:8080'
    ],
    credentials: true
  }))
}
app.use(logger('dev'))

app.all(['/', '/v1', '/v1/ping', '/ping'], (req: Request, res: Response) => {
    res.status(200).json({
      name: 'CRUD TESTING',
      provider: 'NATALIAGJ',
      version: 'v1'
    })
})

app.use(helmet())

// swagger-docs
// docs.generateDocFile(app)
const swaggerDoc = require('../swagger.json')
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Router
app.use('/v1/usuario', usuario)

export default app

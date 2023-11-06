require('dotenv').config()
import express, { Express} from 'express'
import registerRoutes from "@handlers/routes.handler";
import cors from 'cors'
import { initDatabase } from '@db'

const app: Express = express()
const port = parseInt(process.env.API_PORT || '3000')

app
    .use(express.json())
    .use(cors())

registerRoutes(app).then(() => {
  app.listen(port, async () => {
    await initDatabase()
    console.log(`Listening on port: ${port}`)
  })
})

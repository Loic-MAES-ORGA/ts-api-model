import { Route, HttpMethod } from "@structs/route"
import { Request, Response } from "express"

module.exports = [
    new Route(HttpMethod.GET, '/', (req: Request, res: Response) => {
      res.json('👋 Hello buddy, from GET request!')
    }),
    new Route(HttpMethod.POST, '/', (req: Request, res: Response) => {
      res.json('👋 Hello buddy, from POST request!')
    })
]

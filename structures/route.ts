import {Express, Request, Response} from "express";

export type Callback = (req: Request, res: Response) => void

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export enum HttpStatus {
  // 100
  // 200
  // 300
  // 400
  // 500
}

export class Route {
  method: HttpMethod
  path: string
  callback: Callback
  middlewares: any[] | undefined

  constructor (method: HttpMethod, path: string, callback: Callback, middlewares?: any[]) {
    this.method = method
    this.path = path
    this.callback = callback
    this.middlewares = middlewares
  }

  register (app: Express): void {
    switch (this.method) {
      case 'post':
        app.post(this.path, this.callback)
        break
      case 'put':
        app.put(this.path, this.callback)
        break
      case 'delete':
        app.delete(this.path, this.callback)
        break
      default:
        app.get(this.path, this.callback)
        break
    }
  }
}

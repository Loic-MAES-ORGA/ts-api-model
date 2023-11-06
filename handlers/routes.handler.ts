// @ts-ignore
import Ascii, { AsciiTable } from 'ascii-table'
import { Express } from 'express'
import { Route } from '@structs/route'
import recover from '@handlers/file.handler'

export default async function registerRoutes (app: Express): Promise<void> {
  const routes = recover('./routes', true)
  const table: AsciiTable = new Ascii('Routes')

  if (routes.length === 0) {
    table.addRow('No data!')
    return console.log(table.toString())
  }

  for (const path of routes) {
    const list = await import(`@routes/${path}`)
    list.default.forEach((route: Route) => {
      route.register(app)
      table.addRow(route.method, route.path, '🔷 Loaded')
    })
  }

  table.setHeading('Method', 'Path', 'Status')
  console.log(table.toString())
}

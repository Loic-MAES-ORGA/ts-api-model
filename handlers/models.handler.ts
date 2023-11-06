// @ts-ignore
import Ascii, { AsciiTable } from 'ascii-table'
import { Model, ForeignKey } from '@structs/model'
import { Sequelize } from 'sequelize'
import recover from '@handlers/file.handler'

export default async function registerModels (db: Sequelize): Promise<void> {
  const models: string[] = recover('./database/models', true)
  const table: AsciiTable = new Ascii('Models')
  const foreignKeys: ForeignKey[] = []

  if (models.length === 0) {
    table.addRow('No data!')
    return console.log(table.toString())
  }

  for (let modelPath of models) {
    const importResult = await import(`@models/${modelPath}`)
    const model: Model = importResult.default

    model.register(db)
    if (model.foreignKeys) model.foreignKeys.forEach((fk: ForeignKey) => foreignKeys.push(fk))
    table.addRow(model.name, model.foreignKeys?.length || 0, '🔷 Loaded')
  }
  foreignKeys.forEach((fk: ForeignKey) => fk.register())

  table.setHeading('Name', 'FKs amount', 'Status')
  return console.log(table.toString())
}

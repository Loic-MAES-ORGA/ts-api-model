// noinspection JSDeprecatedSymbols
import { ModelCtor, Model } from 'sequelize'
import sequelize from '@db'

export default function getModel (name: string): ModelCtor<Model> | undefined {
  return sequelize?.models[name] || undefined
}

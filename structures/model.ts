import {ModelAttributes, Sequelize, AssociationOptions} from "sequelize";
import getModel from "@utils/models";

export type ModelTimingOptions = {
  timestamps: boolean,
  createdAt?: string | boolean,
  updatedAt?: string | boolean,
  deleteAt?: string | boolean,
}

export enum ConstraintMethod {
  HAS_ONE,
  HAS_MANY,
  BELONGS_TO,
  BELONG_TO_MANY
}

export class ForeignKey {
  method: ConstraintMethod
  source: string
  target: string
  options: AssociationOptions | undefined

  constructor (method: ConstraintMethod, source: string, target: string, options?: AssociationOptions) {
    this.method = method
    this.source = source
    this.target = target
    this.options = options
  }

  register () {
    const source = getModel(this.source)
    const target = getModel(this.target)

    if (!source || !target) return

    switch (this.method) {
      case 1:
        // @ts-ignore
        source.hasMany(target, this.options)
        break
      case 2:
        // @ts-ignore
        source.belongsTo(target, this.options)
        break
      case 3:
        if (!this.options) break
        // @ts-ignore
        source.belongsToMany(target, this.options)
        break
      default:
        // @ts-ignore
        source.hasOne(target, this.options)
        break
    }
  }
}

export class Model {
  name: string
  attributes: ModelAttributes
  options: ModelTimingOptions
  foreignKeys: ForeignKey[] | undefined

  constructor (name: string, attributes: ModelAttributes, options: ModelTimingOptions, foreignKeys?: ForeignKey[]) {
    this.name = name
    this.attributes = attributes
    this.options = options
    this.foreignKeys = foreignKeys
  }

  register (sequelize: Sequelize): void {
    sequelize.define(this.name, this.attributes, this.options)
  }
}

import {ConstraintMethod, ForeignKey, Model} from "@structs/model";
import {DataTypes} from "sequelize";

const model = new Model('class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: false
}, [
    new ForeignKey(ConstraintMethod.HAS_MANY, 'user', 'class', {
      foreignKey: {
        name: 'user'
      }
    })
])
export default model

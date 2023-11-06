import {Model} from "@structs/model";
import {DataTypes} from "sequelize";

const model = new Model('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})
export default model

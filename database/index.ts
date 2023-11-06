import { Sequelize } from 'sequelize'
import registerModels from '@handlers/models.handler'

const dialect = process.env.DB_DIALECT || 'sqlite'
let sequelize: Sequelize | undefined
switch (dialect) {
  case 'sqlite':
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DB_STORAGE || 'database.db',
      logging: false
    })
    break
  case 'mysql': case 'mariadb':
    sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      dialect,
      logging: false
    })
    break
  default: break
}
export default sequelize

export async function initDatabase (): Promise<void> {
  if (!sequelize) return console.log('/!\\ Unable to find the dialect!')

  try {
    await registerModels(sequelize)
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' })
    console.log('Database synchronized!')
  } catch (e) {
    throw e
  }
  return
}

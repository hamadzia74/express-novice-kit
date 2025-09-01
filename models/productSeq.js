const Sequelize = require('sequelize')

// db connection pool managed by sequelize. database connection pool which is more than a connection pool, it's a full featured ORM which allows us to define models, manage relations between models, and do a lot of things which make working with SQL databases easier.
const sequelize = require('../util/database')

// define a model that will be managed by sequelize. The first name that is the model name (lowercase) and the second argument is an object that defines the model's attributes (structure) and therefore also of the automatically created database table.
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Product

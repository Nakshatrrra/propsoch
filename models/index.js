const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config'); 

const sequelize = new Sequelize(config.development);

const User = require('./user')(sequelize, DataTypes);
const Expense = require('./expense')(sequelize, DataTypes);
const Balance = require('./balance')(sequelize, DataTypes);

User.associate({ Expense, Balance });
Expense.associate({ User });
Balance.associate({ User });

// Export models
module.exports = { sequelize, User, Expense, Balance };

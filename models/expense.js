module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    Expense.associate = (models) => {
      Expense.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Expense;
  };
  
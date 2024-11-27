module.exports = (sequelize, DataTypes) => {
    const Balance = sequelize.define('Balance', {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otherUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
    });
  
    Balance.associate = (models) => {
      Balance.belongsTo(models.User, { foreignKey: 'userId' });
      // Balance.belongsTo(models.User, { foreignKey: 'otherUserId' });
      Balance.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return Balance;
  };
  
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD',
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Expense, { foreignKey: 'userId' });
      User.hasMany(models.Balance, { foreignKey: 'userId' });
    };
  
    return User;
  };
  
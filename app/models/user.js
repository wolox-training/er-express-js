'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: { allowNull: false, type: DataTypes.STRING },
      last_name: { allowNull: false, type: DataTypes.STRING },
      email: { allowNull: false, unique: true, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING }
    },
    {
      tableName: 'users'
    }
  );

  return user;
};

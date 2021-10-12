'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: { allowNull: false, type: DataTypes.STRING },
      lastName: { allowNull: false, type: DataTypes.STRING },
      email: { allowNull: false, unique: true, type: DataTypes.STRING },
      password: { allowNull: false, type: DataTypes.STRING }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  return user;
};

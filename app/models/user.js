'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      email: DataTypes.STRING,
      contraseña: DataTypes.STRING
    },
    {
      tableName: 'users'
    }
  );

  return User;
};

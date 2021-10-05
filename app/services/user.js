const { User } = require('../models/index');
const logger = require('../logger');

async function registerUser(nombre, apellido, email, contraseña) {
  const result = {};
  try {
    const usuario = await User.create({
      nombre,
      apellido,
      email,
      contraseña
    });
    result.data = `El usuario ${usuario.nombre} ha sido registrado con éxito`;
    result.status = 201;
    return result;
  } catch (error) {
    if (error.parent.code === '23505') {
      result.data = `El email ${error.errors[0].value} ya se encuentra registrado`;
      result.status = 400;
      logger.error(error.errors[0].message);
      return result;
    }
    if (error.parent.code === '23502') {
      result.data = `El campo ${error.parent.column} es requerido`;
      result.status = 422;
      logger.error(`is required${error.parent.column}`);
      return result;
    }
    logger.error('There is an error with Database');
    result.data = 'Error al guardar en la base de datos';
    result.status = 500;
    return result;
  }
}

export { registerUser };

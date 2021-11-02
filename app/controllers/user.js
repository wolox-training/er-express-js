const { registerUser, findUserByEmail, getAllUsers } = require('../services/user');
const { encriptPassword, createToken, validatePassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email } = req.body;
    logger.info(`createUser start, request: ${name} ${lastName} ${email}`);
    const password = await encriptPassword(req.body.password);
    const user = await registerUser(name, lastName, email, password);
    logger.info('user created');
    return res.status(201).json({
      name: user.name,
      lastName: user.lastName,
      email: user.email
    });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    logger.info(`signIn controller start, request: ${email}`);
    const user = await findUserByEmail(email);
    await validatePassword(user.password, password);
    const token = await createToken(user.id, user.name, user.email);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    logger.info('listUsers start');
    const { offset, limit } = req.query;
    const infoUsers = await getAllUsers(offset, limit);
    const users = infoUsers.map(user => ({ name: user.name, lastName: user.lastName, email: user.email }));
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

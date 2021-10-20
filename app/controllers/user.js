const { registerUser, findUserByEmail } = require('../services/user');
const { encriptPassword, createToken, validatePassword } = require('../helpers/user');
const logger = require('../logger');

exports.createUser = async (req, res, next) => {
  try {
    logger.info(`createUser controller start, request: ${req.body}`);
    const { name, lastName, email } = req.body;
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
    logger.info(`signIn controller start, request: ${req.body}`);
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    await validatePassword(user.password, password);
    const token = await createToken(user.id, user.name, user.email);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

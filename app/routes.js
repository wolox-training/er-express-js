const { createUser, signIn, listUsers, createUserAdmin } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');
const { validateAuth, validateAuthAdmin } = require('./middlewares/validateAuth');
const { schemaUser, schemaSignIn, schemaGetUsers } = require('./schemas/user');
const { schemaValidations } = require('./middlewares/schemaValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaUser, [schemaValidations], createUser);
  app.post('/admin/users', validateAuthAdmin, schemaUser, [schemaValidations], createUserAdmin);
  app.get('/users', validateAuth, schemaGetUsers, [schemaValidations], listUsers);
  app.post('/users/sessions', schemaSignIn, [schemaValidations], signIn);
};

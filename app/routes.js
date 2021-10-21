const { createUser, signIn, listUsers } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');
const { schemaValidations } = require('./middlewares/user');
const { validateAuth } = require('./middlewares/validateAuth');
const { schemaUser, schemaSignIn, schemaGetUsers } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaUser, [schemaValidations], createUser);
  app.get('/users', validateAuth, schemaGetUsers, [schemaValidations], listUsers);
  app.post('/users/sessions', schemaSignIn, [schemaValidations], signIn);
};

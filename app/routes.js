const { createUser, signIn } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');
const { schemaValidations } = require('./middlewares/user');
const { schemaUser, schemaSignIn } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaUser, [schemaValidations], createUser);
  app.post('/users/sessions', schemaSignIn, [schemaValidations], signIn);
};

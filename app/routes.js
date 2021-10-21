const { createUser } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');
const { schemaValidations } = require('./middlewares/schemaValidator');
const { schemaUser } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaUser, [schemaValidations], createUser);
};

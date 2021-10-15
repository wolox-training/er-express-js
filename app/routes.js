const { createUser } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');
const { dataUser, schemaUser } = require('./middlewares/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', schemaUser, [dataUser], createUser);
};

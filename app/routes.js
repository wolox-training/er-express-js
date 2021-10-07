const { createUser } = require('./controllers/user');
const { healthCheck } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', createUser);
};

// const controller = require('./controllers/controller');
const { healthCheck, witter } = require('./controllers/healthCheck');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', witter);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};

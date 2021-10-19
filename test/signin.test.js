const supertest = require('supertest');
const app = require('../app');
const { USER_FIND_ERROR, SESSION_ERROR } = require('../config/messageError');
const { USER_FIND_ERROR: USER_NOT_FOUND, SESSION_ERROR: PASSWORD_INVALID } = require('../app/errors');

const api = supertest(app);

describe('User sign in controller', () => {
  const user = {
    email: 'edilberto@wolox.co',
    name: 'Edilberto',
    lastName: 'Roa',
    password: '12345678e'
  };
  test('create token', async done => {
    await api.post('/users').send(user);
    const userLoggin = {
      email: 'edilberto@wolox.co',
      password: '12345678e'
    };
    await api
      .post('/users/sessions')
      .send(userLoggin)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    done();
  });
  test('user not found', async () => {
    const userLoggin = {
      email: 'edilberto.roa@wolox.co',
      password: '12345678e'
    };
    await api
      .post('/users/sessions')
      .send(userLoggin)
      .set('Accept', 'application/json')
      .expect(404, { message: USER_FIND_ERROR, internal_code: USER_NOT_FOUND })
      .expect('Content-Type', /application\/json/);
  });
  test('password invalid', async done => {
    await api.post('/users').send(user);
    const userLoggin = {
      email: 'edilberto@wolox.co',
      password: '12345678'
    };
    await api
      .post('/users/sessions')
      .send(userLoggin)
      .set('Accept', 'application/json')
      .expect(401, { message: SESSION_ERROR, internal_code: PASSWORD_INVALID })
      .expect('Content-Type', /application\/json/);
    done();
  });
});

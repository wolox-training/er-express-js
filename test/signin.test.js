const supertest = require('supertest');
const app = require('../app');
const { SESSION_ERROR } = require('../config/messageError');

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
      .expect('Content-Type', /application\/json/)
      .then(res => {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toEqual(
          expect.objectContaining({
            token: expect.any(String)
          })
        );
      });
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
      .expect(422, {
        message: {
          email: {
            value: 'edilberto.roa@wolox.co',
            msg: SESSION_ERROR,
            param: 'email',
            location: 'body'
          }
        },
        internal_code: 'request_error'
      })
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
      .expect(422, {
        message: SESSION_ERROR,
        internal_code: 'request_error'
      })
      .expect('Content-Type', /application\/json/);
    done();
  });
});

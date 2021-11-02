const supertest = require('supertest');
const app = require('../app');
const { USER_ERROR } = require('../config/messageError');
const { REQUEST_ERROR } = require('../app/errors');

const api = supertest(app);

describe('User registration controller', () => {
  test('create user', async done => {
    const user = {
      email: 'edilberto@wolox.co',
      name: 'Edilberto',
      lastName: 'Roa',
      password: '12345678e'
    };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201, {
        id: 1,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: 'regular'
      })
      .expect('Content-Type', /application\/json/);
    done();
  });
  test('user already exists', async () => {
    const user = {
      email: 'edilberto@wolox.co',
      name: 'Edilberto',
      lastName: 'Roa',
      password: '12345678e'
    };
    await api.post('/users').send(user);
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422, {
        message: {
          email: {
            value: user.email,
            msg: USER_ERROR,
            param: 'email',
            location: 'body'
          }
        },
        internal_code: REQUEST_ERROR
      })
      .expect('Content-Type', /application\/json/);
  });

  test('password invalid', async done => {
    const user = {
      email: 'edilberto@wolox.co',
      name: 'Edilberto',
      lastName: 'Roa',
      password: '1234567'
    };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422, {
        message: {
          password: {
            value: user.password,
            msg: 'The password must be alphanumeric',
            param: 'password',
            location: 'body'
          }
        },
        internal_code: 'request_error'
      })
      .expect('Content-Type', /application\/json/);
    done();
  });
  test('parameters not null', async done => {
    const user = { email: '', name: '', lastName: '', password: '' };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422)
      .expect('Content-Type', /application\/json/);
    done();
  });
});

const supertest = require('supertest');
const app = require('../app');
const { USER_ERROR } = require('../config/messageError');
const { USER_ERROR: USER_CODE } = require('../app/errors');

const api = supertest(app);

describe('User registration controller', () => {
  test('create user', async done => {
    const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '12345678e' };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201, { name: user.name, lastName: user.lastName, email: user.email })
      .expect('Content-Type', /application\/json/);
    done();
  });
  test('user already exists', async () => {
    const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '12345678e' };
    await api.post('/users').send(user);
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422, { message: USER_ERROR, internal_code: USER_CODE })
      .expect('Content-Type', /application\/json/);
  });

  test('password invalid', async done => {
    const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '1234567' };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422, {
        errors: {
          password: {
            value: '1234567',
            msg: 'Password should be at least 8 chars long',
            param: 'password',
            location: 'body'
          }
        }
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

const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('Get users controller', () => {
  const userFirts = {
    email: 'edilberto1@wolox.co',
    name: 'Edilberto',
    lastName: 'Roa',
    password: '12345678e'
  };
  const userSecond = {
    email: 'edilberto2@wolox.co',
    name: 'Edilberto',
    lastName: 'Roa',
    password: '12345678e'
  };
  beforeEach(async () => {
    await api.post('/users').send(userFirts);
    await api.post('/users').send(userSecond);
  });
  test('get users', async done => {
    const userLoggin = {
      email: 'edilberto1@wolox.co',
      password: '12345678e'
    };
    const token = await api
      .post('/users/sessions')
      .send(userLoggin)
      .then(res => res.body.token);
    await api
      .get('/users')
      .set('Accept', 'application/json')
      .set('token', token)
      .expect(200, {
        users: [
          {
            name: userFirts.name,
            lastName: userFirts.lastName,
            email: userFirts.email
          },
          {
            name: userSecond.name,
            lastName: userSecond.lastName,
            email: userSecond.email
          }
        ]
      })
      .expect('Content-Type', /application\/json/)
      .then(res => {
        expect(res.body).toHaveProperty('users');
      });
    done();
  });
});

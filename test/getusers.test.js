const supertest = require('supertest');
const app = require('../app');
const { createToken } = require('../app/helpers/user');

const api = supertest(app);

describe('Get users controller', () => {
  const user = {
    email: 'root@wolox.co',
    name: 'User',
    lastName: 'Root',
    password: '12345678e'
  };
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
  const token = createToken(1, user.name, user.email, 'admin');

  beforeEach(async () => {
    await api.post('/users').send(userFirts);
    await api.post('/users').send(userSecond);
  });
  test('get users', async done => {
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

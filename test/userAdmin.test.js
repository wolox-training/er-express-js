const supertest = require('supertest');
const app = require('../app');
const { createToken } = require('../app/helpers/user');

const api = supertest(app);

describe('User registration controller admin', () => {
  const user = {
    email: 'root@wolox.co',
    name: 'User',
    lastName: 'Root',
    password: '12345678e'
  };
  const token = createToken(1, user.name, user.email, 'admin');
  test('create user admin', async done => {
    await api
      .post('/admin/users')
      .send(user)
      .set('Accept', 'application/json')
      .set('token', token)
      .expect(201, {
        id: 1,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: 'admin'
      })
      .expect('Content-Type', /application\/json/);
    done();
  });
  test('create user regular update admin', async done => {
    await api
      .post('/users')
      .send(user)
      .expect(201, {
        id: 1,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: 'regular'
      });
    await api
      .post('/admin/users')
      .send(user)
      .set('Accept', 'application/json')
      .set('token', token)
      .expect(201, {
        id: 1,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: 'admin'
      })
      .expect('Content-Type', /application\/json/);
    done();
  });
});

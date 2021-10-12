const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('User registration controller', () => {
  test('create user', async () => {
    const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '12345678e' };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
  test('password invalid', async done => {
    const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '1234567' };
    await api
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(422)
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

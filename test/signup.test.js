const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const { createUser } = require('../app/controllers/user');

describe('Controller user', () => {
  it('deberia ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
});

test('add user', async done => {
  const user = { email: 'edilberto@wolox.co', name: 'Edilberto', lastName: 'Roa', password: '12345678e' };
  await api
    .post('/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  done();
});

require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can sign up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'email@email.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'email@email.com',
          __v: 0
        });
      });
  });

  it('can log in a user', async() => {
    const user = await User.create({ email: 'email@email.com', password: 'password' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'email@email.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'email@email.com',
          __v: 0
        });
      });
  });

  it('fails when a bad email is used', async() => {
    await User.create({ email: 'email@email.com', password: 'password' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'notemail@email.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email/Password',
          status: 401
        });
      });
  });

  it('fails when a bad password is used', async() => {
    await User.create({ email: 'email@email.com', password: 'password' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'email@email.com', password: 'notpassword' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email/Password',
          status: 401
        });
      });
  });

  it('can verify if a user is logged in', async() => {
    const user = await User.create({
      email: 'email@email.com',
      password: 'password'
    });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'email@email.com', password: 'password' });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'email@email.com',
          __v: 0
        });
      });
  });
});

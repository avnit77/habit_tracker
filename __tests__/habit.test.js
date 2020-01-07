require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

describe('Habit routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let habit;

  beforeEach(async() => {
    habit = await Habit.create({
      date: 'January 1, 2020',
      type: 'good habit',
      notes: 'notes'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('enters a habit', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        date: 'January 1, 2020',
        type: 'good habit',
        notes: 'notes'
      });
  });
});

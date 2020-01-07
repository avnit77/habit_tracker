const { Router } = require('express');
const Habit = require('../models/Habit');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    Habit
      .create(req.body)
      .then(habit => res.send(habit))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Habit
      .findById(req.params.id)
      .then(habit => {
        res.send(habit);
      })

      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Habit
      .find()
      .then(habits => res.send(habits))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Habit
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(habit => res.send(habit))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Habit
      .findByIdAndDelete(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  });

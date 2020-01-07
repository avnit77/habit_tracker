const Habit = require('./Habit');

describe('Habit model', () => {
  it('has a required date', () => {
    const habit = new Habit();
    const { errors } = habit.validateSync();

    expect(errors.date.message).toEqual('Path `date` is required.');
  });

  it('has a required type', () => {
    const habit = new Habit();
    const { errors } = habit.validateSync();

    expect(errors.type.message).toEqual('Path `type` is required.');
  });
});

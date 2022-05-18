const { Schema, model } = require('mongoose');

const phoneSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Поле code не должно быть пустым'],
    },
    number: {
      type: Number,
      required: [true, 'Поле number не должно быть пустым'],
    },
  },
  { versionKey: false },
);

module.exports = model('phone', phoneSchema);

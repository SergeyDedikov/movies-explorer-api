const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, "Поле country не должно быть пустым"],
  },
  director: {
    type: String,
    required: [true, "Поле director не должно быть пустым"],
  },
  duration: {
    type: Number,
    required: [true, "Поле duration не должно быть пустым"],
  },
  year: {
    type: String,
    required: [true, "Поле year не должно быть пустым"],
  },
  description: {
    type: String,
    required: [true, "Поле description не должно быть пустым"],
  },
  image: {
    type: String,
    required: [true, "Должна быть указана ссылка на постер"],
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  trailerLink: {
    type: String,
    required: [true, "Должна быть указана ссылка на трейлер"],
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  thumbnail: {
    type: String,
    required: [true, "Должна быть указана ссылка на миниизображение постера"],
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {
    type: String,
    required: [true, "Поле movieId не должно быть пустым"],
  },
  nameRU: {
    type: String,
    required: [true, "Поле nameRU не должно быть пустым"],
  },
  nameEN: {
    type: String,
    required: [true, "Поле nameEN не должно быть пустым"],
  },
}, { versionKey: false });

module.exports = model("movie", movieSchema);

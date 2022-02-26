const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { isURL } = require("validator");

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

const longStringRequired = Joi.string().required().max(99);
const urlStringRequired = Joi.string()
  .required()
  .pattern(
    /^https?:\/\/w?w?w?\.?[a-zA-Z0-9а-яА-ЯёЁ\-._~:/?#[\]@!$&'()*+,;=]#?/
  );

router.get("/movies", getMovies);

router.post(
  "/movies",
  celebrate({
    body: Joi.object().keys({
      country: longStringRequired,
      director: longStringRequired,
      duration: Joi.number().required().integer(),
      year: Joi.string().required().max(4),
      description: longStringRequired,
      image: urlStringRequired,
      trailerLink: urlStringRequired,
      thumbnail: urlStringRequired,
      movieId: Joi.string().required().length(24),
      nameRU: longStringRequired,
      nameEN: longStringRequired,
    }),
  }),
  createMovie
);

router.delete(
  "/movies/_id",
  celebrate({
    body: Joi.object().keys({
      movieId: Joi.string().required().length(24),
    }),
  }),
  deleteMovie
);

module.exports = router;

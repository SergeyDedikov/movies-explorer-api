const Movie = require("../models/movie");

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  const { _id } = req.user;
  return Movie.find({ owner: _id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле параметрами
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  return Movie.findOne({ movieId })
    .then((movie) => {
      if (movie) {
        // приведём к строке поле owner карточки
        const owner = movie.owner.toString();
        // сравним наш id со значением owner у фильма
        if (owner === req.user._id) {
          return movie.remove();
        }
        return Promise.reject(new Error("Запрещено удалять чужие фильмы!"));
      }
      return Promise.reject(new Error("Фидьм не найден"));
    })
    .then(() => res.status(200).send({ message: "Фильм удалён навсегда!" }))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

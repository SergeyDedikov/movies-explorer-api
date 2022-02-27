const router = require("express").Router();

const {
  validateBodyCreateMovie,
  validateBodyDeleteMovie,
} = require("../middlewares/validations");

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/movies", getMovies);

router.post("/movies", validateBodyCreateMovie, createMovie);

router.delete("/movies/_id", validateBodyDeleteMovie, deleteMovie);

module.exports = router;

const router = require("express").Router();

const usersRoutes = require("./users");
const moviesRoutes = require("./movies");

router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;

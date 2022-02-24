const router = require("express").Router();

const usersRoutes = require("./users");
const moviesRoutes = require("./movies");
const auth = require("../middlewares/auth");

router.use(auth);
router.use(usersRoutes);
router.use(moviesRoutes);

module.exports = router;

const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, signout } = require('../controllers/users');
const {
  validateBodyCreateUser,
  validateAuthentication,
} = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-error');

// -- Маршруты авторизации
router.post('/signup', validateBodyCreateUser, createUser);
router.post('/signin', validateAuthentication, login);
router.post('/signout', signout);

// -- Защищённые маршруты
router.use(auth);
router.use(usersRoutes);
router.use(moviesRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

module.exports = router;

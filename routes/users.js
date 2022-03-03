const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { validateBodyUpdateUser } = require('../middlewares/validations');

router.get('/users/me', getUser);
router.patch('/users/me', validateBodyUpdateUser, updateUser);

module.exports = router;

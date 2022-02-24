const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { isEmail } = require("validator");

const { getUser, updateUser } = require("../controllers/users");

const validateCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(isEmail),
  }),
});

router.get("/users/me", validateCelebrate(), getUser);

router.patch("/users/me", validateCelebrate(), updateUser);

module.exports = router;

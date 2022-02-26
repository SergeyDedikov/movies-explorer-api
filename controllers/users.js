const bcrypt = require("bcryptjs");

const User = require("../models/user");
const ConflictError = require("../errors/conflict-error");
const BadRequestError = require("../errors/bad-request-error");

// создаёт пользователя с переданными в теле
// email, password и name
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("Пользователь с данныи email уже существует");
      } else {
        return bcrypt.hash(password, 10); // захешируем пароль
      }
    })
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(". ")}`
          )
        );
      } else {
        next(err);
      }
    });
};

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findById(_id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = { createUser, getUser, updateUser };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require("../models/user");
const ConflictError = require("../errors/conflict-error");
const BadRequestError = require("../errors/bad-request-error");
const Unauthorized = require("../errors/unauthorized-error");

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

// проверяет переданные в теле почту и пароль
// и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new Unauthorized("Неправильные почта или пароль")
        );
      }
      // сравниваем хеши паролей
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(
            new Unauthorized("Неправильные почта или пароль")
          );
        }
        // аутентификация успешна — создадим токен на 7 дней
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "secret-string",
          {
            expiresIn: "7d",
          }
        );
        // вернём куку с токеном
        return res
          .cookie("jwt", token, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 3600000,
          })
          .status(200)
          .end();
      });
    })
    .catch(next);
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

module.exports = { createUser, login, getUser, updateUser };

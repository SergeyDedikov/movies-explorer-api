const User = require("../models/user");

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

module.exports = { getUser, updateUser };

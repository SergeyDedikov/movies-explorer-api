const Phone = require('../models/phone');
const BadRequestError = require('../errors/bad-request-error');

// создаём номер
const createPhone = (req, res, next) => {
  const { code, number } = req.body;

  Phone.create({ code, number })
    .then((newNumber) => res.status(201).send(newNumber))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join('. ')}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

// возвращает все сохранённые номера
const getPhones = (req, res, next) => Phone.find({})
  .then((phones) => res.status(200).send(phones))
  .catch(next);

// удаляем все номера
const deleteAllPhones = (req, res, next) => {
  Phone.deleteMany({})
    .then((count) => res.status(200).send(count))
    .catch(next);
};

module.exports = {
  createPhone, getPhones, deleteAllPhones,
};

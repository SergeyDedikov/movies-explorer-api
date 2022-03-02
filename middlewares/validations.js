const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const nameStringRequired = Joi.string().required().min(2).max(30)
  .messages({
    'string.required': 'Поле name не должно быть пустым',
    'string.min': 'Длина поля name должна быть минимум 2',
    'string.max': 'Длина поля name должна быть максимум 30',
  });
const emailStringRequired = Joi.string().required().email().messages({
  'string.required': 'Поле email обязательное',
  'string.email': 'Поле email должно быть валидным адресом',
});
const passwordStringRequired = Joi.string().required().messages({
  'string.required': 'Поле password должно быть заполнено',
});
const longStringRequired = Joi.string().required().max(99);
const urlStringRequired = Joi.string().required().custom((value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message('Невалидная ссылка');
});

const validateBodyCreateUser = celebrate({
  body: Joi.object().keys({
    name: nameStringRequired,
    email: emailStringRequired,
    password: passwordStringRequired,
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: emailStringRequired,
    password: passwordStringRequired,
  }),
});

const validateBodyUpdateUser = celebrate({
  body: Joi.object().keys({
    name: nameStringRequired,
    email: emailStringRequired,
  }),
});

const validateBodyCreateMovie = celebrate({
  body: Joi.object().keys({
    country: longStringRequired.messages({
      'string.required': 'Поле country не должно быть пустым',
    }),
    director: longStringRequired.messages({
      'string.required': 'Поле director не должно быть пустым',
    }),
    duration: Joi.number().required().integer().messages({
      'number.required': 'Поле duration обязательное',
    }),
    year: Joi.string().required().length(4).messages({
      'string.required': 'Поле year не должно быть пустым',
      'string.length': 'Длина поля year должна быть равна 4',
    }),
    description: longStringRequired.messages({
      'string.required': 'Поле description не должно быть пустым',
    }),
    image: urlStringRequired
      .message('Поле image должно быть валидной ссылкой')
      .messages({ 'string.required': 'Поле image не должно быть пустым' }),
    trailerLink: urlStringRequired
      .message('Поле trailerLink должно быть валидной ссылкой')
      .messages({
        'string.required': 'Поле trailerLink не должно быть пустым',
      }),
    thumbnail: urlStringRequired
      .message('Поле thumbnail должно быть валидной ссылкой')
      .messages({
        'string.required': 'Поле thumbnail не должно быть пустым',
      }),
    movieId: Joi.number().required().integer().messages({
      'number.required': 'Поле movieId обязательное',
      'number.integer': 'Поле movieId должно быть целым числом',
    }),
    nameRU: longStringRequired.messages({
      'string.required': 'Поле nameRU не должно быть пустым',
    }),
    nameEN: longStringRequired.messages({
      'string.required': 'Поле nameEN не должно быть пустым',
    }),
  }),
});

const validateBodyDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).messages({
      'string.required': 'Параметр id обязательный',
      'string.length': 'Параметр id должен быть валидным',
    }),
  }),
});

module.exports = {
  validateBodyCreateUser,
  validateAuthentication,
  validateBodyUpdateUser,
  validateBodyCreateMovie,
  validateBodyDeleteMovie,
};

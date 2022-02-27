const { celebrate, Joi } = require("celebrate");

const nameStringRequired = Joi.string().required().min(2).max(30).messages({
  "string.required": "Поле name не должно быть пустым",
  "string.min": "Длина поля name должна быть больше 2",
  "string.max": "Длина поля name должна быть меньше 30",
});
const emailStringRequired = Joi.string().required().email().messages({
  "string.required": "Поле email обязательное",
  "string.email": "Поле email должно быть валидным адресом",
});
const passwordStringRequired = Joi.string().required().messages({
  "string.required": "Поле password должно быть заполнено",
});
const longStringRequired = Joi.string().required().max(99);
const urlStringRequired = Joi.string()
  .required()
  .pattern(
    /^https?:\/\/w?w?w?\.?[a-zA-Z0-9а-яА-ЯёЁ\-._~:/?#[\]@!$&'()*+,;=]#?/
  );

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
      "string.required": "Поле country не должно быть пустым",
    }),
    director: longStringRequired.messages({
      "string.required": "Поле director не должно быть пустым",
    }),
    duration: Joi.number()
      .message("Поле duration должно быть числом")
      .required()
      .message("Поле duration обязательное")
      .integer(),
    year: Joi.string().required().length(4).messages({
      "string.required": "Поле year не должно быть пустым",
      "string.length": "Длина поля year должна быть равна 4",
    }),
    description: longStringRequired.messages({
      "string.required": "Поле description не должно быть пустым",
    }),
    image: urlStringRequired
      .message("Поле image должно быть валидной ссылкой")
      .messages({ "string.required": "Поле image не должно быть пустым" }),
    trailerLink: urlStringRequired
      .message("Поле trailerLink должно быть валидной ссылкой")
      .messages({
        "string.required": "Поле trailerLink не должно быть пустым",
      }),
    thumbnail: urlStringRequired
      .message("Поле thumbnail должно быть валидной ссылкой")
      .messages({
        "string.required": "Поле thumbnail не должно быть пустым",
      }),
    movieId: Joi.string()
      .required()
      .message("Поле movieId обязательное")
      .length(24)
      .message("Поле movieId должно быть валидным id"),
    nameRU: longStringRequired,
    nameEN: longStringRequired,
  }),
});

const validateBodyDeleteMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .message("Поле movieId обязательное")
      .length(24)
      .message("Поле movieId должно быть валидным id"),
  }),
});

module.exports = {
  validateBodyCreateUser,
  validateAuthentication,
  validateBodyUpdateUser,
  validateBodyCreateMovie,
  validateBodyDeleteMovie,
};

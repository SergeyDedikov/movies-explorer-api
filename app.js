const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { celebrate, Joi, errors } = require("celebrate");

const NotFoundError = require("./errors/not-found-error");
const errorHandler = require("./middlewares/error-handler");
const router = require("./routes");
const { createUser, login, signout } = require("./controllers/users");

const app = express();
const { PORT = 3000, DB_PATH = `mongodb://localhost:27017/bitfilmsdb` } =
  process.env;

mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cookieParser());

// -- Маршруты авторизации
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post("/signout", signout);

// -- Защищённые маршруты
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на localhost:${PORT}`);
});

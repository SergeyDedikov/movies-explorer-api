const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const limiter = require('./middlewares/rate-limiter');
const corsHandler = require('./middlewares/cors-handler');

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://localhost:27017/moviesdb' } = process.env;

mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger); // логгер запросов
app.use(helmet());
app.use(limiter);
app.use(corsHandler); // обработаем CORS-запросы

app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на localhost:${PORT}`);
});

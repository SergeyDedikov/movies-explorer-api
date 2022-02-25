const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const NotFoundError = require("./errors/not-found-error");
const errorHandler = require("./middlewares/error-handler");
const router = require("./routes");

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

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError("Был запрошен несуществующий роут"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на localhost:${PORT}`);
});

const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Поле email не должно быть пустым"],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат email",
    },
  },
  password: {
    type: String,
    required: [true, "Поле password не должно быть пустым"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Поле name не должно быть пустым"],
    minlength: [2, "Слишком короткое имя"],
    maxlength: [30, "Слишком длинное имя"],
  },
});

// уберём поле пароля из отдаваемого объекта
// при регистрации нового пользователя
userSchema.set("toJSON", {
  transform(doc, ret) {
    const copy = { ...ret }; // создаём копию
    delete copy.password;
    return copy; // возвращаем копию без пароля
  },
});

module.exports = model("user", userSchema);

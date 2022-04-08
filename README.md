# Дипломный проект курса "Веб-разработчик" Я.Практикума. Бэкенд

**[Описание](#desc)**
**[Технологии](#tech)**
**[Установка](#install)**
**[Запросы к серверу](#req)**
**[Модели](#models)**
**[Ссылка](#link)**

## <a name="desc"></a>Описание

Серверная часть проекта **[Любимые фильмы](https://movies-favorite.nomoredomains.work)** — реализована с использованием **`MongoDB`** и **`Express.JS`**.

В проекте две модели для хранения данных:

- схема User хранит имя, e-mail и хэш пароля пользователя;
- схема Movie — данные о фильме, название, описание, url`ы превью и трейлера, с привязкой к User.

У каждой модели есть контроллер:

- контроллер **Users** управляет созданием, авторизацией, получением и обновлением данных о пользователе;
- контроллер **Movies** управляет получением сохранённых пользователем фильмов, созданием и удалением фильмов пользователя.

Все входящие запросы обрабатываются CORS, лимитируется количество обращений к серверу, проверяются на валидность входящие данные, ведётся логгирование запросов и ошибок, при авторизации клиенту отправляется _cookie_.

## <a name="tech"></a>Технологии

В проекте используются технологии и библиотеки с открытым исходным кодом:

- [Node.js](https://nodejs.org) - асинхронное событийное JavaScript-окружение для построения масштабируемых сетевых приложений;
- [Express](https://expressjs.com) - быстрый и гибкий веб-фреймворк для приложений Node.js;
- [MongoDB](https://www.mongodb.com/docs/v4.4/installation/) && [mongoose](https://mongoosejs.com/docs/index.html) - создание и работа с базой данных;
- [Joi](https://joi.dev/api/?v=17.6.0) && [celebrate](https://www.npmjs.com/package/celebrate) - описание схем и средство проверки данных для Express.js;
- [validator](https://www.npmjs.com/package/validator) - валидация строчных данных;
- [helmet](https://www.npmjs.com/package/helmet) - настройка различных HTTP-заголовков.

## <a name="install"></a>Установка

Установить **[MongoDB](https://www.mongodb.com/docs/v4.4/installation/)**.

Старт базы из командной строки:

```sh
mongod
```

Клонировать проект, установить зависимости, старт приложения:

```sh
git clone https://github.com/SergeyDedikov/movies-explorer-api.git
cd movies-explorer-api
npm i
npm run dev
```

Для тестирования локально изменить переменную `allowedCors`:

```javascript
// middlewares/cors-handler.js
const allowedCors = ["http://localhost:3000"];
```

## <a name="req"></a>Запросы к серверу

Для обращения к серверу используются следующие HTTP-запросы:

| Метод  | Маршрут       | Действие                                                  |
| ------ | ------------- | --------------------------------------------------------- |
| POST   | /signup       | Регистрация пользователя                                  |
| POST   | /signin       | Авторизация пользователя                                  |
| POST   | /signout      | Выход пользователя                                        |
| GET    | /users/me     | Получение данных о пользователе                           |
| PATCH  | /users/me     | Обновление данных пользователя                            |
| POST   | /movies       | Создание нового фильма                                    |
| DELETE | /movies/:\_id | Удаление фильма по id                                     |
| GET    | /movies       | Получение данных фильмов, созданных текущим пользователем |

## <a name="models"></a>Модели

**Обязательные поля схемы создания пользователя:**

- name
- email
- password

**Обязательные поля схемы создания фильма:**

- country
- director
- duration
- year
- description
- image
- trailerLink
- thumbnail
- owner
- movieId
- nameRU
- nameEN

## <a name="link"></a>Ссылка

АПИ сервера **[по ссылке >>>](https://api.movies-favorite.nomoredomains.work)**

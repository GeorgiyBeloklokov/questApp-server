

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## This server REST API created for quiz App with registration, authentication, login,  by JWT, roles, swagger, orm sequelize, postgreSQL, validation data, docker, prod/dev environments.
## Running the app:
For use server you need to install postgresql db in you machine https://www.postgresql.org/download/ 
 configuring .development.env for develop mode and  .production.env for deploy

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

## Docker:
For use whit Docker you need to install Docker desktop in you machine https://www.docker.com/

```bash
# build docker image
$ docker-compose build

# Up docker image whit server and postgressql db
$ docker-compose up
```
1 - Использован REST API

2 - Использован MVC паттерн

3 - Подключение и работа с БД

4 - Аутентификация

5 - Авторизация

6 - Регистрация

7 - Используется ORM Sequelize.

8 - Сервер реализован на Nest.js

9 - Реализованы роли на сервере (user/admin)

10 - Реализована возможность запустить сервер и бд в докере

11 - Реализована валидация данных на сервере

12 - Документация swagger https://questapp-server-production.up.railway.app/api/docs

13 - Реализована работа с изображениями.

14 - Сервер отдаёт корректные ответы, отдаёт HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи

## Postman:
### 1 - Регистрация с ролью "user":
![registration](https://user-images.githubusercontent.com/77876368/221429504-41734ed8-fd25-41ea-bc44-992dc6e622a9.jpg)

### Остальные эндпойнты можно посмотреть в swagger https://questapp-server-production.up.railway.app/api/docs

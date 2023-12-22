# pdf-generator

pdf-generator using mantine, react and node

```console
npm i express dotenv typeorm reflect-metadata mysql2 cors body-parser express-async-errors

```

```console
npm i -D @types/express typescript ts-node tsconfig-paths @types/node nodemon @types/cors @types/body-parser
```

Create migration

```console
/pdf-generator/api$ npm run migration:create CreateUserTable
```

Open MySQL shell and run :

mysql -u root -p

Password root123

show databases;

USE db_name;

SHOW TABLES;

[typeorm](https://typeorm.io/)

https://github.com/sadhakbj/Bookie-NodeJs-Typescript/blob/main/src/http/validators/IsUniqueValidator.ts

https://sadhakbj.medium.com/lets-create-fully-dockerized-nodejs-backend-application-with-express-js-typescript-typeorm-and-1f7396623301

Env setup

Create .env file in the root of the project.

```json
HOST = localhost
PORT = 3100
AUTH_PASSWORD_SALT = 'encription-salt'
AUTH_JWT_SECRET = 'jwt-secret'
AUTH_JWT_EXPIRES = '24h'
AUTH_JWT_REFRESH_SECRET = 'jwt-refresh-secret'
AUTH_JWT_REFRESH_EXPIRES = '48h'
```

```console
docker-compose up
// or
docker compose up
```

if something is running on port `3306` default one for mysql you can check with command:

```console
sudo netstat -nlp | grep 3306
```

You can kill that service with command:

```console
service mysql stop
```

# Storefront Backend Project

## Getting Started

To get started, clone this repo and run `yarn` or `npm i` in your terminal at the project root.

## Starting Project

Before start up you can `npx db-migrate up` to structure your database tables providing that all database connection setup has been completed on **PORT 5432**.

All Endpoints will be exposed on **PORT 3000** `http://localhost:3000/api/`

TO start the server you can run `npm run dev` command or `npm start` to build files and run compiled js files in **build** folder.

To start app testing run `npm run test` command.

#### ENV VARIABLES ARE AVAILABEL BELOW:

PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_DB=udacitystore
POSTGRES_DB_TEST=udacitystore_test
POSTGRES_PORT=5432
POSTGRES_USERNAME=wezza
POSTGRES_PASSWORD=123456
PEPPER=wezza@wezza999
SALT_ROUNDS=10
TOKEN_SECRET=wezza@wezza999$secretmytoken

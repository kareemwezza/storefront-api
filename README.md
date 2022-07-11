# Storefront Backend Project

## Getting Started

To get started, clone this repo and run `yarn` or `npm i` in your terminal at the project root.

## Database Setup

In psql terminal you need to create 2 database one for testing and the other for development environment.

`CREATE DATABASE udacitystore;` to create the database used in development.
`CREATE DATABASE udacitystore_test;` to create the database used in testing.

Before start up you can `npx db-migrate up` to structure your database tables providing that all database connection setup has been established on **PORT 5432**.

## Starting Project

All Endpoints will be exposed on **PORT 3000** `http://localhost:3000/api/v1`

TO start the server you can run `npm run dev` command or `npm start` to build files and run compiled js files in **build** folder.

To start app testing run `npm run test` command that will initiate DB migration on test DB and starting test cases.

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

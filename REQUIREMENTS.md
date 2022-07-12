# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

All endpoints of this API will be exposed on `http://localhost:3000/api/v1/`.

### Users Endpoints

- List all users in the app `GET /users` [Authorization required].
- Create a new user to the database `POST /users`. your req body must have [first_name, last_name, email, password]
- Get information about single user `GET /users/:userId` [Authorization required].
- To authenticate a new user `POST /users/authenticate` your req body must have [email, password]

#### Products

- List all Products in the app `GET /products`.
- Get information about single Product `GET /products/:productId`.
- Create a new Product to the database `POST /products`. your req body must have [name, price, category]. **[Authorization required]**
- Get All products by category `POST /products/category` your req body must have[category].

#### Orders

- Create a new Order to the database `POST /orders`. **[Authorization required]**
- Get All Orders from the database to specific user `GET /orders/current`. you have to query the status of the order [status="active" | "complete"] **[Authorization required]**

## Project Schema

#### Products Table

- **COLUMN** id >> INT PK
- **COLUMN** name >> VARCHAR 255
- **COLUMN** price >> INT
- **COLUMN** [OPTIONAL] category >> VARCHAR 100

#### Users Table

- **COLUMN** id >> INT PK
- **COLUMN** firstName >> VARCHAR 50
- **COLUMN** lastName >> VARCHAR 50
- **COLUMN** email >> VARCHAR 100 NOT NULL UNIQUE
- **COLUMN** password >> VARCHAR 255 NOT NULL

#### Orders Table

- **COLUMN** id >> INT PK
- **COLUMN** id of each product in the order >> INT FK
- **COLUMN** quantity of each product in the order >> INT
- **COLUMN** user_id ref to the id of the user purchuased order >> INT FK
- **COLUMN** status of order (active or complete) >> VARCHAR 50

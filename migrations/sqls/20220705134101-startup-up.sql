CREATE TABLE Users (id serial Primary Key, first_name varchar(50), last_name varchar(50), email varchar(100) NOT NULL UNIQUE, password varchar(255) NOT NULL);
CREATE TABLE Products (id serial Primary Key, name varchar(255), price int, category varchar(100));
CREATE TABLE Orders (id serial Primary key, status varchar(50), user_Id int, FOREIGN KEY(user_Id) REFERENCES Users(id));
CREATE TABLE Orders_Products(
  id serial Primary key,
  product_id int,
  quantity int,
  order_id int,
  FOREIGN KEY (product_id) REFERENCES Products(id),
  FOREIGN KEY (order_id) REFERENCES Orders(id));
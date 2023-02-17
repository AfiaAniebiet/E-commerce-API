# E-Commerce API

## Packages

| Package Name | Description                       | Registry                      |
| ------------ | --------------------------------- | ----------------------------- |
| Express      | Node.js web application framework | `npm install express --save`  |
| mongoose     | MongoDB ODM                       | `npm install mongoose --save` |

- Express
- JOI
- mongoose

### Getting Started - Install all dependencies

Run `npm install` in your command line to install all dependencies.

## Routes

### Auth Route

| Route   | Path                | Method |
| ------- | ------------------- | ------ |
| Login   | /api/v1/auth/login  | POST   |
| Sign-up | /api/v1/auth/signup | POST   |
| Logout  | /api/v1/auth/logout | GET    |

### User Route

| Route           | Path                          | Method | Description |
| --------------- | ----------------------------- | ------ | ----------- |
| Get All Users   | /api/v1/users/                | GET    | Admin       |
| Get Single User | /api/v1/users/:id             | GET    | Admin       |
| Update User     | /api/v1/users/:id             | PATCH  | User        |
| Update Password | /api/v1/users/update-password | POST   | User        |

### Order Route

| Route              | Path                           | Method | Description  |
| ------------------ | ------------------------------ | ------ | ------------ |
| Fetch all Orders   | /api/v1/orders/                | GET    | Admin        |
| Show all my Orders | /api/v1/orders/showAllMyOrders | GET    | Admin & User |
| Create Order       | /api/v1/orders/                | POST   | All Users    |
| Single Order       | /api/v1/orders/id              | GET    | All Users    |
| Update Order       | /api/v1/orders/ id             | PATCH  | All Users    |

# E-Commerce API

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc

## Packages

| Package Name                        | Description                       | Registry                        |
| ----------------------------------- | --------------------------------- | ------------------------------- |
| [Express]("https://expressjs.com/") | Node.js web application framework | `npm install express --save`    |
| mongoose                            | MongoDB ODM                       | `npm install mongoose --save`   |
| http-status-codes                   | Rich set of HTTP status codes     | `npm install http-status-codes` |

### Getting Started - Install all dependencies

Run `npm install` in your command line to install all dependencies.

## Routes

### Auth Route

| Route   | Path                | Method | Description |
| ------- | ------------------- | ------ | ----------- |
| Login   | /api/v1/auth/login  | POST   | All Users   |
| Sign-up | /api/v1/auth/signup | POST   | All Users   |
| Logout  | /api/v1/auth/logout | GET    | All Users   |

### User Route

| Route           | Path                          | Method | Description |
| --------------- | ----------------------------- | ------ | ----------- |
| Get All Users   | /api/v1/users/                | GET    | Admin       |
| Get Single User | /api/v1/users/:id             | GET    | Admin       |
| Update User     | /api/v1/users/:id             | PATCH  | All Users   |
| Update Password | /api/v1/users/update-password | POST   | All Users   |

### Order Route

| Route              | Path                           | Method | Description |
| ------------------ | ------------------------------ | ------ | ----------- |
| Fetch all Orders   | /api/v1/orders/                | GET    | Admin       |
| Show all my Orders | /api/v1/orders/showAllMyOrders | GET    | All Users   |
| Create Order       | /api/v1/orders/                | POST   | All Users   |
| Single Order       | /api/v1/orders/id              | GET    | All Users   |
| Update Order       | /api/v1/orders/ id             | PATCH  | All Users   |

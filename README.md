# E-Commerce API

## Packages used

- Express
- JOI
- mongoose

### Getting Started - Install all dependencies

```
Run `npm install` in your command line to install all dependencies.
```

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

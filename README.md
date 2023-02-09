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

- Update Password (Authenticated)
- Get All Users (Authorized & Authenticated)
- Get Single User
- Update User

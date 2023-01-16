# Lottus
Small ecommerce to practice PERN stack. This is still in development.

## Build with
- [![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
- [![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
- [![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![mui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com)
- [![jwt](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)](https://jwt.io/)

# Getting started
## Prerequisites
- Install node.js, preferably using NVM.
- Install Docker and Docker Compose to deploy the project locally.

## Installation
1. Clone the repo
```
git clone https://github.com/ClouddCoder/ecommerce-PERN.git
```

2. In the project root install NPM packages
```
npm install
```

3. You must create an **.env** file for the **api** and **client** directories with the following variables:

**api** directory
```
PORT = <SERVER_PORT>
JWT_PASSWORD = <JWT_PASSWORD> # The backend uses JWT to authenticate the user.

# Database setup for deployment.
DB_USER = <YOUR_DB_USERNAME>
DB_PASSWORD = <YOUR_DB_PASSWORD>
DB_HOST = <YOUR_DB_HOST>
DB_NAME = <YOUR_DB_NAME>
DB_PORT = <YOUR_DB_PORT>
DB_SSL = <1_OR_0> # If your database is hosted in a server, probably you need to set SSL.

# Database setup for development using docker-compose.
DB_USER_DEV = <YOUR_DB_FOR_DEVELOPING>
DB_PASSWORD_DEV = <YOUR_DB_PASSWORD_FOR_DEVELOPING>
DB_HOST_DEV = <YOUR_DB_HOST_FOR_DEVELOPING>
DB_NAME_DEV = <YOUR_DB_NAME_FOR_DEVELOPING>
DB_PORT_DEV = <YOUR_DB_PORT_FOR_DEVELOPING>
DB_SSL_DEV = <1_OR_0>

# Database setup for testing using a docker container.
DB_USER_TEST = <YOUR_DB_USER_FOR_TESTING>
DB_PASSWORD_TEST = <YOUR_DB_PASSWORD_FOR_TESTING>
DB_HOST_TEST = <YOUR_DB_HOST_FOR_TESTING>
DB_NAME_TEST = <YOUR_DB_NAME_FOR_TESTING>
DB_PORT_TEST = <YOUR_DB_PORT_FOR_TESTING>
DB_SSL_TEST = <1_OR_0>
```
**client** directory
```
# These variables are used to connect the backend.

# For deployment.
BASE_URL = <ENTER_YOUR_BACKEND_SERVER_URL>

# For developing using docker-compose.
BASE_URL_DEV = <ENTER_YOUR_LOCALHOST_URL>
```
# Usage
This project can be deployed locally with Docker compose. In the project root, open a terminal and do
```
docker compose up
```
Currently the ecommerce is deployed using Google Cloud for the frontend and backend, the database is using a different server.
```
https://lottus-shop.cf
```
# Contributors
- [@ClouddCoder](https://github.com/ClouddCoder)

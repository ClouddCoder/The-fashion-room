<div align="center">
    <h1>Lottus</h1>
    <div><span>Ecommerce built with PERN stack</span></div>
</div>

# Introduction

<div align="center">

| Desktop                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- |
| ![desktop_view](https://user-images.githubusercontent.com/103080410/214464291-dd7db668-6f4c-4c5f-90a6-c219831504d1.png) |

| Phone                                                                                                            | Tablet                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![phone](https://user-images.githubusercontent.com/103080410/214462884-cf7667a3-5f73-4b82-8018-fb24834b6f13.png) | ![tablet](https://user-images.githubusercontent.com/103080410/214462931-60ff4764-4f23-42f2-aaf0-e0499b85c9d1.png) |

</div>

Lottus is an ecommerce built with the PERN stack and other technologies such as Docker and Nginx as a reverse proxy.

It can be developed and deployed with Docker, Docker compose and Nginx for a better performance.

The user may log in, sign up, make purchases, add products to the wishlist, see the purchases and other stuff like edit the profile.

## Built with

- [![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
- [![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com)
- [![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
- [![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![mui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com)
- [![jwt](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)](https://jwt.io/)

# Getting started

## Prerequisites

- Install node.js.
- Install Docker and Docker Compose to deploy the project locally.

## Installation

1. Clone the repo:

```
git clone https://github.com/ClouddCoder/ecommerce-PERN.git
```

2. In the `api` and `client` directories install npm packages:

```
npm install
```

3. It is important to create an `.env` file for the `api` and `client` directories with the following environment variables:

`api` directory

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
DB_USER_DEV = <YOUR_DB_USER_FOR_DEVELOPMENT>
DB_PASSWORD_DEV = <YOUR_DB_PASSWORD_FOR_DEVELOPMENT>
DB_HOST_DEV = <YOUR_DB_HOST_FOR_DEVELOPMENT>
DB_NAME_DEV = <YOUR_DB_NAME_FOR_DEVELOPMENT>
DB_PORT_DEV = <YOUR_DB_PORT_FOR_DEVELOPMENT>
DB_SSL_DEV = <1_OR_0>

# Database setup for testing using a docker container.
DB_USER_TEST = <YOUR_DB_USER_FOR_TESTING>
DB_PASSWORD_TEST = <YOUR_DB_PASSWORD_FOR_TESTING>
DB_HOST_TEST = <YOUR_DB_HOST_FOR_TESTING>
DB_NAME_TEST = <YOUR_DB_NAME_FOR_TESTING>
DB_PORT_TEST = <YOUR_DB_PORT_FOR_TESTING>
DB_SSL_TEST = <1_OR_0>
```

`client` directory

```
# These variables are used to connect the backend.

# For deployment.
REACT_APP_BASE_URL = <ENTER_YOUR_BACKEND_SERVER_URL>

# For development using Docker compose.
REACT_APP_BASE_URL_DEV = <ENTER_YOUR_LOCALHOST_URL>
```

# Usage

This project can be deployed locally with Docker compose. In the project root, run the application:

```
docker compose up
```

Then open a new tab in the browser and type `localhost:3050`.

## Demo

Currently the ecommerce is deployed using Render.com for the front-end and the database and Cloud Run from GCP for the API.

```
https://lottus.onrender.com
```

# Contributors

- [@ClouddCoder](https://github.com/ClouddCoder)

# License

Lottus is MIT licensed.

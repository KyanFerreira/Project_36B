# Project Architecture

This document is not comprehensive but should provide a general idea of how this project is laid out.

## Backend

`server/`

- `index.js`: Entrypoint file that initializes an Express app
- `app.js`: connects relevant Express middleware and also serves `client/dist`.
  - For development, see `:dev` scripts in `package.json`.
- `db/`: handles connection to the database.
  - `seed.js`: populates the database with initial data. Look here for the schema.
- `auth/`: handles user account authentication with JWT
- `api/`: handles the api endpoints.
  - `students.js`: routes and controllers for student data

## Frontend

`client/src/`

- `index.html`: Entrypoint file that loads `main.jsx`
- `main.jsx`: Root React component that renders `<App/>`
- `app/`: app-wide setup
  - `store.js`: Redux store setup
  - `api.js`: central RTK Query API service
- `features/`:
  - `auth/`: user authentication
  - `dashboard/`: main user interface
  - `students/`: CRUD interface for managing student data

# Student Record Management API

A simple REST API for managing students, courses, and enrollments using Node.js and Express.js.

## Features

- Add students
- View students
- Update students
- Delete students
- Add courses
- View courses
- Enroll students in courses
- View enrollments

## Technologies Used

- Node.js
- Express.js
- Postman
- REST API

## How to Run

1. Open the project in VS Code.
2. Open the terminal.
3. Install dependencies:

```bash
npm install
```
5. Start the server:

```bash
npm start
```
5. Start the server:

```bash
npm start
```

6. The server will run at:

```text
http://localhost:3000
```

## API Endpoints

### Students

- GET `/students`
- POST `/students`
- PUT `/students/:id`
- DELETE `/students/:id`

### Courses

- GET `/courses`
- POST `/courses`

### Enrollments

- GET `/enrollments`
- POST `/enrollments`

## Example Student

```json
{
  "name": "Aman Kumar",
  "age": 22,
  "course": "MCA"
}
```

## Project Status

Completed and tested using Postman.

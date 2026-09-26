# Student Record Management API & Contact Management System

A RESTful backend API built with **Node.js** and **Express.js**.

This project contains two backend modules:

1. Student Record Management API
2. Contact Management System

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON file storage
- CORS
- Postman for API testing

---

# 1. Student Record Management API

The Student Record Management API provides APIs for managing:

- Students
- Courses
- Enrollments

## Student APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

## Course APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| POST | `/courses` | Create a course |
| PUT | `/courses/:id` | Update a course |
| DELETE | `/courses/:id` | Delete a course |

## Enrollment APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/enrollments` | Get all enrollments |
| GET | `/enrollments/:id` | Get enrollment by ID |
| POST | `/enrollments` | Create an enrollment |
| PUT | `/enrollments/:id` | Update an enrollment |
| DELETE | `/enrollments/:id` | Delete an enrollment |

---

# 2. Contact Management System

The Contact Management System provides REST APIs for creating and managing contacts.

Each contact contains:

- Name
- Email
- Phone number
- Address
- Company information

Contact data is stored in `contacts.json`.

## Contact API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get contact by ID |
| POST | `/contacts` | Add a new contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

---

## Add Contact

### Request

```http
POST /contacts
{
  "name": "Amit Kumar",
  "email": "amit@gmail.com",
  "phone": "9876543212",
  "address": "Delhi, India",
  "company": "Tech Solutions"
}
{
  "message": "Contact created successfully",
  "contact": {
    "id": 1,
    "name": "Amit Kumar",
    "email": "amit@gmail.com",
    "phone": "9876543212",
    "address": "Delhi, India",
    "company": "Tech Solutions"
  }
}
GET /contacts
GET /contacts?search=Rahul
GET /contacts?search=gmail.com
GET /contacts?sort=name&order=asc
GET /contacts?sort=name&order=desc
GET /contacts?page=1&limit=2
GET /contacts?page=2&limit=2
GET /contacts/1
PUT /contacts/1
{
  "name": "Amit Sharma",
  "email": "amit.sharma@gmail.com",
  "phone": "9876543212",
  "address": "Delhi, India",
  "company": "ABC Technologies"
}
{
  "message": "Contact updated successfully",
  "contact": {
    "id": 1,
    "name": "Amit Sharma",
    "email": "amit.sharma@gmail.com",
    "phone": "9876543212",
    "address": "Delhi, India",
    "company": "ABC Technologies"
  }
}
DELETE /contacts/1
{
  "error": "Name, email and phone are required"
}
{
  "error": "Contact with this email or phone already exists"
}
409 Conflict
{
  "error": "Page must be a positive number"
}
{
  "error": "Limit must be a positive number"
}
{
  "error": "Invalid sort field",
  "allowedFields": [
    "id",
    "name",
    "email",
    "phone",
    "company"
  ]
}
{
  "error": "Order must be either asc or desc"
}
{
  "error": "Contact not found"
}

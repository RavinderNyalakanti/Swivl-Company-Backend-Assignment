Travel Diary Platform Backend API
Overview
This project is aimed at developing a backend API for a Travel Diary Platform. It enables users to manage their travel diary entries, including creation, retrieval, updating, and deletion. The API is built using Node.js, Express.js, and MongoDB, integrating Object-Oriented Programming (OOP) concepts for better code organization and maintainability.

Technology Stack
Node.js
Express.js
MongoDB
Features
User Class
User registration: Allows users to register by providing a username, email, and password.
User login: Enables users to authenticate by providing their username and password.
Profile management: Users can view and update their profile information.
Diary Entry Class
CRUD operations: Users can create, read, update, and delete their travel diary entries.
Diary entry fields: Each diary entry includes a title, description, date, location, and optional photos.
Database Implementation
MongoDB is used as the database system.
Schemas are defined for User and Diary Entry models to ensure data consistency.
Sample data is provided for demonstration purposes.
Functionality
User Class Functionality
User Registration:

Endpoint: POST /register
Request body: { username, email, password }
Response: { message: 'User registered successfully', user: { _id, username, email } }
User Login:

Endpoint: POST /login
Request body: { username, password }
Response: { message: 'Login successful', token }
Profile Management:

Endpoint: GET /profile
Authentication required
Response: { _id, username, email }
Diary Entry Class Functionality
Create Diary Entry:

Endpoint: POST /diary
Request body: { title, description, date, location, photos }
Authentication required
Response: { message: 'Diary entry created successfully', entry: { _id, title, description, date, location, photos } }
Retrieve Diary Entries:

Endpoint: GET /diary
Authentication required
Response: [ { _id, title, description, date, location, photos }, ...]
Retrieve Diary Entry by ID:

Endpoint: GET /diary/:id
Authentication required
Response: { _id, title, description, date, location, photos }
Update Diary Entry:

Endpoint: PUT /diary/:id
Request body: { title, description, date, location, photos }
Authentication required
Response: { message: 'Diary entry updated successfully', updatedEntry: { _id, title, description, date, location, photos } }
Delete Diary Entry:

Endpoint: DELETE /diary/:id
Authentication required
Response: { message: 'Entry deleted successfully' }
Installation and Usage
Clone the repository: git clone <repository-url>
Install dependencies: npm install
Set up MongoDB and update the connection URI in app.js.
Start the server: npm start
Use API endpoints to interact with the application.
API Documentation
User Endpoints
User Registration:

Method: POST
Endpoint: /register
Request body: { username, email, password }
User Login:

Method: POST
Endpoint: /login
Request body: { username, password }
Profile Management:

Method: GET
Endpoint: /profile
Diary Entry Endpoints
Create Diary Entry:

Method: POST
Endpoint: /diary
Request body: { title, description, date, location, photos }
Retrieve Diary Entries:

Method: GET
Endpoint: /diary
Retrieve Diary Entry by ID:

Method: GET
Endpoint: /diary/:id
Update Diary Entry:

Method: PUT
Endpoint: /diary/:id
Request body: { title, description, date, location, photos }
Delete Diary Entry:

Method: DELETE
Endpoint: /diary/:id
Deployment
Deploy the API to a cloud platform of your choice and provide the live API URL for testing and evaluation.

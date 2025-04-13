
# Online Music Shop Database System

A minimalistic web application for managing an online music shop database with MySQL backend.

## Features

- Manage Singers, Composers, Record Companies, Customers, and Songs
- Simple CRUD operations (Create, Read, Update, Delete)
- Search functionality for songs by title, movie, singer, composer, and record company
- Direct MySQL database connectivity

## Database Structure

The system manages the following entities:

- **Singers**: Name, Contact no, Address
- **Composers**: Name, Address, Contact no
- **Record Companies**: Name, Contact no, Address
- **Customers**: Name, Contact no, Address
- **Songs**: Title, Movie name, Price, Duration, Category, available_as, Size

## Setup Instructions

### Prerequisites
- Node.js
- MySQL server

### Database Setup
1. Install MySQL if you haven't already
2. Create a database named `music_shop`
3. Update the database connection details in `src/server/index.js`

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  database: 'music_shop'
});
```

### Running the Application

1. Start the backend server:
```
node src/server/index.js
```

2. In a separate terminal, start the frontend:
```
npm run dev
```

3. The application will automatically create the necessary tables when the server starts

## Usage

The application has tabs for managing:
- Songs
- Singers
- Composers
- Record Companies
- Customers

Each tab provides a form to add/update entries and a table to view, edit, and delete records.

## Notes
- Price of songs is in Rupees (₹)
- Size of songs is in MB
- Only movie songs are available in this system

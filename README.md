# School Management API

A Node.js REST API for managing schools with location-based sorting functionality.

## Features

- Add new schools with name, address, and coordinates
- List all schools sorted by proximity to a given location
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or later)
- MySQL (v5.7 or later)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_management
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Add a New School
- **URL**: `/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 School St, City",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "schoolId": 1
  }
  ```

### List Schools by Proximity
- **URL**: `/listSchools?latitude=12.9716&longitude=77.5946`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude` (required): User's latitude
  - `longitude` (required): User's longitude
- **Success Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Example School",
        "address": "123 School St, City",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "created_at": "2023-01-01T12:00:00.000Z",
        "distance": 0
      }
    ]
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Postman Collection

A Postman collection is available in the `postman` directory. Import this file into Postman to test the API endpoints.

## Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## License

MIT

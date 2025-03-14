# Pet App API Documentation

## Base URL

```
http://localhost:3000/api
```

## User APIs

### 1. Register User

**Endpoint:** `/users/register`  
**Method:** `POST`  
**Content-Type:** `multipart/form-data`

**Request Body:**

```json
{
  "name": "John Doe", // Required
  "email": "john@example.com", // Required, valid email format
  "phoneNumber": "1234567890", // Required, 10 digits
  "dob": "1990-01-01", // Required, YYYY-MM-DD format
  "petCategory": "dog", // Required, one of: dog, cat, bird, other
  "profilePic": "(file)" // Optional, image file
}
```

**Sample cURL:**

```bash
curl -X POST http://localhost:3000/api/users/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phoneNumber=1234567890" \
  -F "dob=1990-01-01" \
  -F "petCategory=dog" \
  -F "profilePic=@path/to/image.jpg"
```

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "petCategory": "dog",
    "profilePic": "/uploads/images/profile-123456.jpg"
  }
}
```

### 2. Get User by Phone Number

**Endpoint:** `/users/phone/:phoneNumber`  
**Method:** `GET`

**Sample cURL:**

```bash
curl http://localhost:3000/api/users/phone/1234567890
```

**Success Response (200):**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "dob": "1990-01-01",
    "petCategory": "dog",
    "profilePic": "/uploads/images/profile-123456.jpg",
    "createdAt": "2024-01-20T12:00:00.000Z"
  }
}
```

## Pet APIs

### 1. Register Pet

**Endpoint:** `/pets/register`  
**Method:** `POST`  
**Content-Type:** `multipart/form-data`  
**Authorization:** Required

**Request Body:**

```json
{
  "userId": "user_id", // Required
  "petName": "Max", // Required
  "breed": "Golden Retriever", // Required
  "dob": "2020-01-01", // Required, YYYY-MM-DD format
  "petImages": "(files)", // Optional, up to 5 image files
  "certificates": "(files)" // Optional, up to 5 PDF/image files
}
```

**Sample cURL:**

```bash
curl -X POST http://localhost:3000/api/pets/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "userId=user_id" \
  -F "petName=Max" \
  -F "breed=Golden Retriever" \
  -F "dob=2020-01-01" \
  -F "petImages=@image1.jpg" \
  -F "petImages=@image2.jpg" \
  -F "certificates=@certificate.pdf"
```

**Success Response (201):**

```json
{
  "message": "Pet profile registered successfully",
  "pet": {
    "id": "pet_id",
    "petName": "Max",
    "breed": "Golden Retriever",
    "dob": "2020-01-01",
    "images": [
      "/uploads/images/pet-123456.jpg",
      "/uploads/images/pet-123457.jpg"
    ],
    "certificates": [
      {
        "name": "certificate.pdf",
        "fileUrl": "/uploads/certificates/cert-123456.pdf",
        "uploadDate": "2024-01-20T12:00:00.000Z"
      }
    ]
  }
}
```

### 2. Get Pet Profiles by User ID

**Endpoint:** `/pets/user/:userId`  
**Method:** `GET`  
**Authorization:** Required

**Sample cURL:**

```bash
curl http://localhost:3000/api/pets/user/user_id \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**

```json
{
  "pets": [
    {
      "id": "pet_id",
      "petName": "Max",
      "breed": "Golden Retriever",
      "dob": "2020-01-01",
      "images": [
        "/uploads/images/pet-123456.jpg",
        "/uploads/images/pet-123457.jpg"
      ],
      "certificates": [
        {
          "name": "certificate.pdf",
          "fileUrl": "/uploads/certificates/cert-123456.pdf",
          "uploadDate": "2024-01-20T12:00:00.000Z"
        }
      ],
      "createdAt": "2024-01-20T12:00:00.000Z"
    }
  ]
}
```

### 3. Update Pet Profile

**Endpoint:** `/pets/:id`  
**Method:** `PUT`  
**Content-Type:** `multipart/form-data`  
**Authorization:** Required

**Request Body:**

```json
{
  "petName": "Max", // Optional
  "breed": "Golden Retriever", // Optional
  "dob": "2020-01-01", // Optional
  "petImages": "(files)", // Optional, additional images
  "certificates": "(files)" // Optional, additional certificates
}
```

**Sample cURL:**

```bash
curl -X PUT http://localhost:3000/api/pets/pet_id \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "petName=Max Updated" \
  -F "petImages=@new_image.jpg" \
  -F "certificates=@new_certificate.pdf"
```

**Success Response (200):**

```json
{
  "message": "Pet profile updated successfully",
  "pet": {
    "id": "pet_id",
    "petName": "Max Updated",
    "breed": "Golden Retriever",
    "dob": "2020-01-01",
    "images": [
      "/uploads/images/pet-123456.jpg",
      "/uploads/images/pet-789012.jpg"
    ],
    "certificates": [
      {
        "name": "certificate.pdf",
        "fileUrl": "/uploads/certificates/cert-123456.pdf",
        "uploadDate": "2024-01-20T12:00:00.000Z"
      },
      {
        "name": "new_certificate.pdf",
        "fileUrl": "/uploads/certificates/cert-789012.pdf",
        "uploadDate": "2024-01-20T13:00:00.000Z"
      }
    ]
  }
}
```

### 4. Delete Pet Profile

**Endpoint:** `/pets/:id`  
**Method:** `DELETE`  
**Authorization:** Required

**Sample cURL:**

```bash
curl -X DELETE http://localhost:3000/api/pets/pet_id \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**

```json
{
  "message": "Pet profile deleted successfully"
}
```

## Error Responses

### Validation Error (400):

```json
{
  "message": "Please provide all required fields"
}
```

### Authentication Error (401):

```json
{
  "message": "No token, authorization denied"
}
```

### Not Found Error (404):

```json
{
  "message": "User not found"
}
```

### Server Error (500):

```json
{
  "message": "Internal server error message"
}
```

## File Upload Specifications

### Image Files:

- Accepted formats: JPG, JPEG, PNG
- Maximum file size: 5MB per file
- Maximum files: 5 images for pets

### Certificate Files:

- Accepted formats: PDF, JPG, JPEG, PNG
- Maximum file size: 5MB per file
- Maximum files: 5 certificates per pet

## Testing with Postman

1. Create a new collection in Postman
2. Import the following environment variables:
   - `BASE_URL`: http://localhost:3000/api
   - `TOKEN`: Your authentication token

### Example Postman Collection:

```json
{
  "info": {
    "name": "Pet App API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "url": "{{BASE_URL}}/users/register",
        "body": {
          "mode": "formdata",
          "formdata": [
            { "key": "name", "value": "John Doe", "type": "text" },
            { "key": "email", "value": "john@example.com", "type": "text" },
            { "key": "phoneNumber", "value": "1234567890", "type": "text" },
            { "key": "dob", "value": "1990-01-01", "type": "text" },
            { "key": "petCategory", "value": "dog", "type": "text" },
            { "key": "profilePic", "type": "file", "src": "/path/to/image.jpg" }
          ]
        }
      }
    }
  ]
}
```

## Notes

1. All dates should be in ISO format (YYYY-MM-DD)
2. Phone numbers must be exactly 10 digits
3. File uploads are optional but must follow size and format restrictions
4. Authentication token must be included in the header for protected routes
5. All responses include appropriate HTTP status codes

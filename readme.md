# Table of Contents

1. [ContactManager API](#contactmanager-api)
2. [Getting Started](#getting-started)
3. [Scripts](#scripts)
4. [Usage](#usage)
   - [User endpoints](#user-endpoints)
     1. [User Registration](#1-user-registration)
     2. [User Log In](#2-user-log-in)
     3. [User Log Out](#3-user-log-out)
     4. [Get User Info](#4-get-user-info)
     5. [Verify User](#5-verify-user)
   - [Contacts endpoints](#contacts-endpoints)
     1. [List Contacts](#1-list-contacts)
     2. [Get Contact by ID](#2-get-contact-by-id)
     3. [Add New Contact](#3-add-new-contact)
     4. [Update Contact](#4-update-contact)
     5. [Remove Contact](#5-remove-contact)
     6. [Update Contact Status](#6-update-contact-status)

# ContactManager API

The "ContactManager" project is a basic Node.js-based API service designed for contact management. It allows users to create accounts and perform operations on contacts stored in an address book. This API offers endpoints for signing in, logging in & out and listing, retrieving specific contacts, adding new contacts, removing or updating existing one. Additionally, it implements user authentication and authorized access, ensuring secure interaction and restricting certain functions to authorized users.
The project has been refactored from JavaScript to TypeScript and adapted to integrate seamlessly with the frontend developed earlier during the programming course. This refactoring enhances type safety, improves code maintainability, and ensures better alignment with modern TypeScript practices.

## Getting Started

To use the "ContactManager" API, follow the instructions below to set up your environment and understand the available endpoints.

#### To run this project, you will need:

- **Node.js** (v18 or higher)
- **MongoDB** database (using Mongoose)

#### Installation

1. Clone this repository.
2. Run `npm install` to install the necessary dependencies.
3. Update `.env` file in the root directory with the variables set:
   - `DB_HOST`: Your MongoDB database connection URL
   - `SECRET`: Secret key used for encrypting sensitive information
   - `BASE_URL`: The URL of your frontend application
   - `API_KEY`: The API key provided by Mailjet
   - `API_SECRET`: The API secret provided by Mailjet
   - `CORS_ORIGIN`: A comma-separated list of allowed domains that are permitted to make requests to your backend

## Scripts

- `npm start`: Launches the application in production mode, allowing you to manage contacts using the command-line interface.
- `npm run start:dev`: Launches the application in development mode.

## Build the Project

1. Run `npm run build` to transpile the TypeScript code into JavaScript. This will generate the compiled files in the dist directory.
2. Add Module Aliases: Ensure that you include `require("module-alias/register");` at the very beginning of your entry point file server.js in the dist directory. This step is crucial for resolving module aliases defined in your tsconfig.json during runtime.

## Usage

### **User endpoints**

#### 1. User registration

Register a new user.

- **Path:** `/api/users/signup`
- **Method:** POST
- **Content-Type:** application/json
- **Request Body:** JSON with new user data
  Example Request Body:

```json
{
  "name": "exampleName",
  "email": "example@example.com",
  "password": "examplePassword"
}
```

**Response status:**

- 201 Created - Registration success response
- 409 Conflict - Registration conflict error - "Email in use"
- 400 Bad Request - Registration validation error

#### 2. User log in

Log in an existing user.

- **Path:** `/api/users/login`
- **Method:** POST
- **Content-Type:** application/json
- **Request Body:** JSON with user data
  Example Request Body:

```json
{
  "email": "example@example.com",
  "password": "examplePassword"
}
```

**Response status:**

- 200 OK - Login success response
- 400 Bad Request - Login validation error
- 401 Unauthorized - Login auth error

#### 3. User log out

Log out a user.

- **Path:** `/api/users/logout`
- **Method:** GET
- **Authorization:** "Bearer {{token}}"

**Response status:**

- 204 No Content - Logout success response
- 401 Unauthorized - Logout unauthorized error

#### 4. Get user info

Get info about existing user.

- **Path:** `/api/users/current`
- **Method:** GET
- **Authorization:** "Bearer {{token}}"

**Response status:**

- 200 OK - Current user success response
- 401 Unauthorized - Current user unauthorized error

#### 5. Verify user

Verify user

- **Path:** `/api/users/verify/:verificationToken`
- **Method:** GET

**Response status:**

- 200 OK - Current user success response
- 404 Not Found

### **Contacts endpoints**

#### 1. List Contacts

Get a list of all contacts in the address book.

- **Path:** `/api/contacts`
- **Method:** GET

**Response status:**

- 200 OK
- 401 Unauthorized
- 404 Not Found

**Example response:**

```json
[
  {
    "_id": "AeHIrLTr6JkxGE6SN-0Rw",
    "name": "Allen Raymond",
    "phone": "(992) 914-3792",
    "favorite": false,
    "owner": "66ae0243b7b0fafebe26c9fb",
    "createdAt": "2024-08-11T15:37:47.213Z"
  },
  {
    "_id": "qdggE76Jtbfd9eWJHrssH",
    "name": "Chaim Lewis",
    "phone": "(294) 840-6685",
    "favorite": true,
    "owner": "66ae0243b7b0fafebe26c9fb",
    "createdAt": "2024-08-11T15:37:47.213Z"
  }
]
```

##### Pagination

The Contacts API offers pagination functionality, enabling the retrieval of contacts in a paginated manner. Users have the ability to set the page and limit parameters in the API requests to manage the number of contacts displayed per page and navigate through the contact list.

###### Pagination Parameters:

- **page:** Represents the page number for the requested contacts (e.g., page=1, page=2).
- **limit:** Indicates the maximum number of contacts to display on a single page (e.g., limit=10, limit=20). Dafault: limit=20
- **Example usage:** `/api/contacts?page=1&limit=10`

##### Filtering Contacts by Favorites

The Contacts API supports filtering contacts based on their favorite status. By appending favorite=true to the API endpoint, you can retrieve contacts marked as favorites.
**Usage:** `/api/contacts?favorite=true`

##### Filtering Contacts by query

The Contacts API supports filtering contacts by query.
**Usage:** `/api/contacts?query=example`

### 2. Get Contact by ID

Get details of a specific contact based on its ID.

- **Path:** `/api/contacts/:contactId`
- **Method:** GET
- **URL Parameters:** `contactId - Contact ID`

**Response status:**

- 200 OK
- 401 Unauthorized
- 404 Not Found

**Example response:**

```json
{
  "_id": "qdggE76Jtbfd9eWJHrssH",
  "name": "Chaim Lewis",
  "phone": "(294) 840-6685",
  "favorite": true,
  "owner": "66ae0243b7b0fafebe26c9fb",
  "createdAt": "2024-08-11T15:37:47.213Z"
}
```

### 3. Add New Contact

Add a new contact to the address book.

- **Path:** `/api/contacts/`
- **Method:** POST
- **Request Body:** JSON with new contact data

**Response status:**

- 201 Created
- 401 Unauthorized
- 400 Bad Request - message "missing required field"

**Example Request Body:**

```json
{
  "_id": "qdggE76Jtbfd9eWJHrssH",
  "name": "Chaim Lewis",
  "phone": "(294) 840-6685",
  "favorite": true,
  "owner": "66ae0243b7b0fafebe26c9fb",
  "createdAt": "2024-08-11T15:37:47.213Z"
}
```

### 4. Update Contact

Update the data of a specific contact based on its ID.

- **Path:** `/api/contacts/:contactId`
- **Method:** GET
- **URL Parameters:** `contactId - Contact ID`
- **Request Body:** JSON with updated contact data

**Response status:**

- 200 OK
- 401 Unauthorized
- 404 Not Found

### 5. Remove Contact

Delete a specific contact based on its ID.

- **Path:** `/api/contacts/:contactId`
- **Method:** DELETE
- **URL Parameters:** `contactId - Contact ID`

**Response status:**

- 200 OK
- 401 Unauthorized
- 404 Not Found

### 6. Update Contact Status

Update contact status as favorite.

- **Path:** `/api/contacts/:contactId/favorite`
- **Method:** PATCH
- **URL Parameters:** `contactId - Contact ID`
- **Request Body:** JSON with data

**Response status:**

- 200 OK
- 401 Unauthorized
- 404 Not Found

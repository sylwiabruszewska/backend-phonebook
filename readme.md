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
     5. [Update Subscription](#5-update-subscription)
     6. [Update Avatar](#6-update-avatar)
   - [Contacts endpoints](#contacts-endpoints)
     1. [List Contacts](#1-list-contacts)
     2. [Get Contact by ID](#2-get-contact-by-id)
     3. [Add New Contact](#3-add-new-contact)
     4. [Update Contact](#4-update-contact)
     5. [Remove Contact](#5-remove-contact)
     6. [Update Contact Status](#6-update-contact-status)

# ContactManager API

The "ContactManager" project is a basic Node.js-based API service designed for contact management. It allows users to create accounts and perform operations on contacts stored in an address book. This API offers endpoints for signing in, logging in & out, updating avatar or subscription type as well as listing contacts, retrieving specific contacts, adding new contacts, updating existing contact and removing contact. Additionally, it implements user authentication and authorized access, ensuring secure interaction and restricting certain functions to authorized users.

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

## Scripts

- `npm start`: Launches the application in production mode, allowing you to manage contacts using the command-line interface.
- `npm run start:dev`: Launches the application in development mode using the `nodemon` tool, which enables automatic reloading of the application when changes are made in the code.
- `npm run lint` — runs code checking with ESLint.
- `npm lint:fix` — same as the above, but it also automatically fixes simple errors.
- `npm test` — runs unit tests with JEST for register new user and log in.

## Usage

### **User endpoints**

#### 1. User registration

Register a new user.

**Path:** `/api/users/signup`
**Method:** POST
**Content-Type:** application/json
**Request Body:** JSON with new user data
Example Request Body:

```json
{
  "email": "example@example.com",
  "password": "examplePassword"
}
```

**Response status:**
201 Created - Registration success response
409 Conflict - Registration conflict error - "Email in use"
400 Bad Request - Registration validation error

#### 2. User log in

Log in an existing user.

**Path:** `/api/users/login`
**Method:** POST
**Content-Type:** application/json
**Request Body:** JSON with user data
Example Request Body:

```json
{
  "email": "example@example.com",
  "password": "examplePassword"
}
```

**Response status:**
200 OK - Login success response
400 Bad Request - Login validation error
401 Unauthorized - Login auth error

#### 3. User log out

Log out a user.

**Path:** `/api/users/logout`
**Method:** GET
**Authorization:** "Bearer {{token}}"
**Response status:**
204 No Content - Logout success response
401 Unauthorized - Logout unauthorized error

#### 4. Get user info

Get info about existing user.

**Path:** `/api/users/current`
**Method:** GET
**Authorization:** "Bearer {{token}}"
**Response status:**
200 OK - Current user success response
401 Unauthorized - Current user unauthorized error

#### 5. Update subscription

Update user subscription type.

**Path:** `/api/users/subscription`
**Method:** PATCH
**Authorization:** "Bearer {{token}}"
**Content-Type:** application/json
**Request Body:** JSON with user data
Example Request Body:

```json
{
  "subscription": "pro"
}
```

**Response status:**
200 OK - Update subscription success response
401 Unauthorized - Update subscription unauthorized error

#### 6. Update avatar

Update user avatar.

**Path:** `/api/users/avatars`
**Method:** PATCH
**Authorization:** "Bearer {{token}}"
**Content-Type:** multipart/form-data
**Request Body:** JSON with user data
**Response status:**
200 OK - Update avatar success response
401 Unauthorized - Update avatar unauthorized error

### **Contacts endpoints**

#### 1. List Contacts

Get a list of all contacts in the address book.

**Path:** `/api/contacts`
**Method:** GET
**Response status:**
200 OK
401 Unauthorized
404 Not Found

**Example response:**

```json
[
  {
    "id": "AeHIrLTr6JkxGE6SN-0Rw",
    "name": "Allen Raymond",
    "email": "nulla.ante@vestibul.co.uk",
    "phone": "(992) 914-3792"
  },
  {
    "id": "qdggE76Jtbfd9eWJHrssH",
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
  }
]
```

##### Pagination

The Contacts API offers pagination functionality, enabling the retrieval of contacts in a paginated manner. Users have the ability to set the page and limit parameters in the API requests to manage the number of contacts displayed per page and navigate through the contact list.

###### Pagination Parameters:

**page:** Represents the page number for the requested contacts (e.g., page=1, page=2).
**limit:** Indicates the maximum number of contacts to display on a single page (e.g., limit=10, limit=20). Dafault: limit=20
**Example usage:** `/api/contacts?page=1&limit=10`

##### Filtering Contacts by Favorites

The Contacts API supports filtering contacts based on their favorite status. By appending favorite=true to the API endpoint, you can retrieve contacts marked as favorites.
**Usage:** `/api/contacts?favorite=true`

### 2. Get Contact by ID

Get details of a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** GET
**URL Parameters:** `contactId - Contact ID`
**Response status:**
200 OK
401 Unauthorized
404 Not Found

**Example response:**

```json
{
  "id": "05olLMgyVQdWRwgKfg5J6",
  "name": "Cyrus Jackson",
  "email": "nibh@semsempererat.com",
  "phone": "(501) 472-5218"
}
```

### 3. Add New Contact

Add a new contact to the address book.

**Path:** `/api/contacts/`
**Method:** POST
**Request Body:** JSON with new contact data
**Response status:**
201 Created
401 Unauthorized
400 Bad Request - message "missing required field"

**Example Request Body:**

```json
{
  "name": "Sylwia",
  "email": "sylwia@example.pl",
  "phone": "657356849"
}
```

### 4. Update Contact

Update the data of a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** GET
**URL Parameters:** `contactId - Contact ID`
**Request Body:** JSON with updated contact data
**Response status:**
200 OK
401 Unauthorized
404 Not Found

### 5. Remove Contact

Delete a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** DELETE
**URL Parameters:** `contactId - Contact ID`
**Response status:**
200 OK
401 Unauthorized
404 Not Found

### 6. Update Contact Status

Update contact status as favorite.

**Path:** `/api/contacts/:contactId/favorite`
**Method:** PATCH
**URL Parameters:** `contactId - Contact ID`
**Request Body:** JSON with data
Example Request Body:

```json
{
  "favorite": true
}
```

**Response status:**
200 OK
401 Unauthorized
404 Not Found

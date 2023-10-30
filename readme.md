# ContactManager API

The "ContactManager" project is a basic Node.js-based API service designed for contact management. It lets you to perform operations on contacts stored in an address book. This API offers endpoints for listing contacts, retrieving specific contacts, adding new contacts, updating existing contact and removing contact.

## Getting Started

1. Clone this repository.
2. Run `npm install` to install the necessary dependencies.

## Scripts

- `npm start`: Launches the application in production mode, allowing you to manage contacts using the command-line interface.
- `npm run start:dev`: Launches the application in development mode using the `nodemon` tool, which enables automatic reloading of the application when changes are made in the code.
- `npm run lint` — runs code checking with ESLint.
- `npm lint:fix` — same as the above, but it also automatically fixes simple errors.

## Usage

### List Contacts

Get a list of all contacts in the address book.

**Path:** `/api/contacts`
**Method:** GET
**Status:**
200 OK
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
  // ...
]
```

### Get Contact by ID

Get details of a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** GET
**URL Parameters:** `contactId - Contact ID`
**Status:**
200 OK
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

### Add New Contact

Add a new contact to the address book.

**Path:** `/api/contacts/`
**Method:** POST
**Request Body:** JSON with new contact data
**Status:**
201 Created
400 Bad Request - message "missing required field"

**Example Request Body:**

```json
{
  "name": "Sylwia",
  "email": "sylwia@example.pl",
  "phone": "657356849"
}
```

### Update Contact

Update the data of a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** GET
**URL Parameters:** `contactId - Contact ID`
**Request Body:** JSON with updated contact data
**Status:**
200 OK
404 Not Found

### Remove Contact

Delete a specific contact based on its ID.

**Path:** `/api/contacts/:contactId`
**Method:** DELETE
**URL Parameters:** `contactId - Contact ID`
**Status:**
200 OK
404 Not Found

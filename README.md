# latex-mock-api

This is a sample REST API built with TypeScript, Node.js, and MongoDB. The API allows you to create, read, update, and delete documents.

## Installation

To install the dependencies for this project, run the following command:

```bash
npm install
```

## Running the API

To run the API, you can use the following command:

```bash
npm run dev
```

This will start the API on `http://localhost:3003`.

## API Endpoints

The following endpoints are available in this API:

- `GET /documents`: Returns a list of all documents.
- `GET /documents/:id`: Returns the document with the specified ID.
- `POST /documents`: Creates a new document.
- `PUT /documents/:id`: Updates the document with the specified ID.
- `DELETE /documents/:id`: Deletes the document with the specified ID.

### GET /documents

Returns a list of all documents.

```bash
curl http://localhost:3003/documents
```

### GET /documents/:id

Returns the document with the specified ID.

```bash
curl http://localhost:3003/documents/61204f5b5c1e892c6ef075f6
```

### POST /documents

Creates a new document.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "New Document", "content": "This is a new document."}' http://localhost:3003/documents
```

### PUT /documents/:id

Updates the document with the specified ID.

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Document", "content": "This is an updated document."}' http://localhost:3003/documents/61204f5b5c1e892c6ef075f6
```

### DELETE /documents/:id

Deletes the document with the specified ID.

```bash
curl -X DELETE http://localhost:3003/documents/61204f5b5c1e892c6ef075f6
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

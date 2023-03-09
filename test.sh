#!/bin/bash

# Set the API URL
API_URL="http://localhost:3003"

# Create a new document
echo "Creating a new document..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Document 1", "content": "This is document 1."}' \
  $API_URL/documents

# Get the created document by ID
echo "Getting the created document..."
DOCUMENT_ID=$(curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Document 1", "content": "This is document 1."}' \
  $API_URL/documents \
  | tr -d '"')
curl $API_URL/documents/$DOCUMENT_ID

# Update the created document by ID
echo "Updating the created document..."
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"name": "Document 1 updated", "content": "This is the updated content of document 1."}' \
  $API_URL/documents/$DOCUMENT_ID

# Delete the created document by ID
echo "Deleting the created document..."
curl -X DELETE $API_URL/documents/$DOCUMENT_ID

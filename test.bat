@echo off
setlocal EnableDelayedExpansion

set SERVER_URL=http://localhost:3003

REM create a new document
set NAME=Document1
set CONTENT=This is the content of Document1
set ID=123456
curl -X POST -H "Content-Type: application/json" -d "{\"id\":\"%ID%\",\"name\":\"%NAME%\",\"content\":\"%CONTENT%\"}" %SERVER_URL%/documents

REM get the created document
curl %SERVER_URL%/documents/%ID%

REM update the created document
set CONTENT=This is the updated content of Document1
curl -X PUT -H "Content-Type: application/json" -d "{\"content\":\"%CONTENT%\"}" %SERVER_URL%/documents/%ID%

REM delete the created document
curl -X DELETE %SERVER_URL%/documents/%ID%

# React Bootcamp 2019

## Instructions

https://docs.google.com/document/d/1e_FyFZ9ktDeKSRxtmWGryHIAGuIb-sufLKo0FCKDLUc/edit

## Server

```
curl http://localhost:3123/notes

curl http://localhost:3123/notes/1

curl -X POST -H 'Content-Type: application/json' --data '{"title":"Test", "desc":"Desc test"}' http://localhost:3123/notes

curl -X PUT -H 'Content-Type: application/json' --data '{"title":"New title"}' http://localhost:3123/notes/1

curl -X DELETE http://localhost:3123/notes/1
```
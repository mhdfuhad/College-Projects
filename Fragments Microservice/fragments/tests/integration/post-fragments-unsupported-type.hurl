# Authenticated POST to /v1/fragments
POST http://localhost:8080/v1/fragments
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
Content-Type: application/msword
```This is a fragment!```

# We expect to get back an HTTP 415
HTTP/1.1 415
[Asserts]
status == 415
jsonpath "$.status" == "error"

POST http://localhost:8080/v1/fragments
Content-Type: text/plain
```This is a fragment!```

# We expect to get back an HTTP 401
HTTP/1.1 401
[Asserts]
status == 401
jsonpath "$.status" == "error"

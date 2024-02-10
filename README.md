# Bearer Token Authentication

An example of _Bearer Token Authentication_ as a means of managing
access to protected API endpoints. Tokens are initially obtained by a
request to a dedicated endpoint and included in the `Authorization`
header of subsequent requests.

## API Endpoints

| Method   | Endpoint              |
| -------- | --------------------- |
| `POST`   | `api/user/register`   |
| `POST`   | `api/user/login`      |
| `GET`    | `api/user/dev-verify` |
| `DELETE` | `api/user/delete`     |

## Obtaining a Token

Accessing a protected route requires that the `Authorization` header of
the request contains a valid token. Such a token can be obtained by
first posting `application/json` content containing credentials to a
dedicated endpoint. In this case, the _register_ and _login_ endpoints
check username and password credentials against the application's
database.

```json
{
  "username": "alex",
  "password": "1037"
}
```

A successful request to either of these routes will return a token in
the response body.

```json
{
  "token": "....."
}
```

## Using the Token

Once a token had been obtained, a client may make requests to protected
routes. `GET` requests to `/api/user/dev-verify` can be made to test the
API. No request body is expected. To use the route, simply set the
`Authorization` header to `Bearer <token>`.

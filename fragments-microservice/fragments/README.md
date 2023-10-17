# fragments

**Not hosted and running as it was built using an AWS learners account.**

A cloud-based microservice that is built to handle pieces of data that could be images or text in different formats therefore handling different types which are dependent on the format and data. The system requires authorization to secure the data that will be handled by it while allowing to save, update, delete and read data to/from S3 and DynamoDB both of which are different types of storage services provided by AWS. Hosted using Elastic Beanstalk.

### AWS Cloud Based Microservice Features

- Provides an HTTP REST API to communicate to.
- Possible to store, retrieve, update, and delete small fragments of text and images.
- Possible to convert fragment data between different formats.
- All fragment data is stored along with information about the data, including its size, type, and creation/modification dates.
- All operations require proper authorization: nothing is publicly available, and all data is isolated from different users in the system.
- Built to be scalable in order to store massive amounts of data.
- Developed in GitHub and automatically built, tested, and deployed to AWS.

#### Valid Fragment Conversions

This is the current list of valid conversions for each fragment type (others may be added in the future):

| Type               | Valid Conversion Extensions    |
| ------------------ | ------------------------------ |
| `text/plain`       | `.txt`                         |
| `text/markdown`    | `.md`, `.html`, `.txt`         |
| `text/html`        | `.html`, `.txt`                |
| `application/json` | `.json`, `.txt`                |
| `image/png`        | `.png`, `.jpg`, `.webp`, `gif` |
| `image/jpeg`       | `.png`, `.jpg`, `.webp`, `gif` |
| `image/webp`       | `.png`, `.jpg`, `.webp`, `gif` |
| `image/gif`        | `.png`, `.jpg`, `.webp`, `gif` |

## Available Routes

This project consists of the following routes:

> **_NOTE:_** All routes are secure and require authentication, except health check route.

### `GET /`

Health Check Route returns some details and use to make sure server is running.

### `GET /v1/fragments`

Route returns an array of fragments ID's, if none exist an empty array will be returned.

### `GET /v1/fragments?expand=1`

Route returns an array of fragments extended metadata, if none exist an empty array will be returned.

### `GET /v1/:id`

Route returns a fragment objects data as per the id passed, if it can't be found then a 404 is returned.

### `GET /v1/:id/info`

Route returns a fragment objects metadata as per the id passed, if it can't be found then a 404 is returned.

### `POST /v1/fragments`

Allows sending data to be created into a fragment and saved to the database. Content-Type must match the type of the data in body.

Current Supported Types:

- text/plain
- text/plain; charset=utf-8
- text/markdown
- text/html
- application/json
- image/png
- image/jpeg
- image/webp

### `PUT /v1/fragments/:id`

Allows sending data to replace the data contained in the fragment object with the passed in id, if fragment does not exist 404 is returned. If content-type of request does not match type of fragment 400 is returned.

### `DELETE /v1/fragments/:id`

Allows the deletion of a fragment object, if fragment does not exist 404 is returned.

## Available Scripts

In this project directory, you can run:

### `npm start`

Runs the app.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run lint`

Runs the app using eslint.

### `npm run dev`

Runs the app in the development mode using nodemon.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run debug`

Runs the app in the development mode using nodemon.\
Starts the node inspector on port 9229 with the --inspect flag.\

> **_NOTE:_** Have Toggle Auto Attach on VSCode set to 'only with flag' so that debugger is only attached\
> when running this command that has the --inspect flag.

### `npm test`

Runs unit tests defined using Jest for the app.

### `npm test:watch`

Runs unit tests defined using Jest for the app and watches for changes in real time to re-run tests as per the changes.

### `npm run coverage`

Runs unit tests defined using Jest and displays an extensive report for all areas of code that has been covered in tests.

## Additional Information

Cross-env package used for support of overriding environment variables on windows for scripts used above.

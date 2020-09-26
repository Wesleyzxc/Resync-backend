# Back end served on ExpressJS with SwaggerUI on /docs

## Installation

Required. Before running the server, install all the necessary packages by running the command:

```sh
$ npm install module-name
```

## Database

The database used is MySQL. Import the provided `resync_users.sql` file for the structure of the database. Some test data are also included.

## Start up

To start up the server, simply run the command

```sh
$ npm start
```

## Logging

The app uses `morgan` to log any requests to the server and can be found under `/logs/access.log`

## Authentication & Security

For basic encryption, `bcrypt` is used to encrypt data using the `hashSync(plainText, saltRounds)` function before storing into the database.

For authentication, `jsonwebtoken` is used to provide a token upon logging in. Then, further API requests will compare authorisation header with token before permission is granted.

Other security features such as keys stored on /process.env has been uploaded for ease of use upon clone. The key is used to verify the token.

## Docker

The docker files are merely an attempt at trying to package the app, without any testing.
Enter command `$ docker build -t backend/express-app` and `$ docker run -p 49160:3000 -d backend/express-app` to run the container.

## Additional Information

This server is hosted on localhost port 3000 without the use of certificate. The settings can be modified on `/bin/www` to include a certificate and/or through HTTPS.

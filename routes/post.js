var express = require("express");
var router = express.Router();

router.get("/test", function (req, res, next) {
  res.json({ Title: "Test" });
});

router.post("/login", function (req, res, next) {
  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(401).json({
      message: "Invalid login - user did not supply both an email and password",
    });
  }
  // SQL: select password (hashed) from users where email = req.body.email
  req.db
    .from("users")
    .select("password")
    .where({ email: req.body.email })
    .then((data) => {
      if (data) {
        return data[0].password;
      }
      // catch bad email
      else {
        throw new Error({
          message:
            "Oh no! It looks like there was a database error while retrieving user, give it another try...",
        });
      }
    })
    .then((response) => {
      let token = req.bc
        .compare(req.body.password, response)
        .then((response) => {
          // token is verified
          if (response) {
            let token = req.jwt.sign(
              { id: req.body.email },
              process.env.secret,
              {
                expiresIn: 86400, // expires in 24 hours
              }
            );
            return token;
          }
          // catch bad password
          else {
            res.status(401).send({ message: "Invalid login- bad password" });
          }
        });
      return token;
    })
    .then((result) => {
      if (result) {
        res.status(200).send({
          token: result,
          token_type: "Bearer",
          expiresIn: 86400,
        });
      }
      // shouldn't be here
      else {
        res.status(401).send({ message: "invalid login- bad password" });
      }
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'password' of undefined") {
        res.status(401).send({
          message: "It looks like that user doesn't exist...",
        });
      }
    });
});

router.post("/register", function (req, res, next) {
  if (
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.fName === undefined ||
    req.body.lName === undefined
  ) {
    return res.status(400).json({
      message: "Error creating new user - Not all values supplied",
    });
  }
  // body is  x-www-form-urlencoded
  // standard hashing password before storing in database
  let hashedPassword = req.bc.hashSync(req.body.password, 8);
  // SQL: insert into users values(email=req.body.email, password=hashedPassword)
  req
    .db("users")
    .insert({
      firstName: req.body.fName,
      lastName: req.body.lName,
      email: req.body.email,
      password: hashedPassword,
    })
    .then((data) => {
      res.status(200).send({
        message: "Yay! You've successfully registered your user account :)",
      });
    })
    .catch((err) => {
      // unable to insert due to duplicate keys
      res
        .status(400)
        .send({ message: "Oops! It looks like that user already exists :(" });
    });
});
module.exports = router;

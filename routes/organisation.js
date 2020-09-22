const { json } = require("express");
var express = require("express");
var router = express.Router();

router.get("/org/select", function (req, res, next) {
  let results = [];
  req.db
    .select()
    .from("organisations")
    .then((rows) => {
      if (rows.length === 0) {
        throw new Error("No organisations added yet.");
      }
      rows.map((row) => {
        results.push({
          id: row.id,
          organisation_name: row.organisation_name,
          owner: row.owner,
          address: row.address,
          city: row.city,
          state: row.state,
          country: row.country,
        });
      });
      return res.status(200).json({ results });
    })
    .catch((err) => {
      if (err.toString().includes("No organisations added yet.")) {
        return res.status(200).json({ query: req.query, results: [] });
      } else
        return res.status(500).json({
          error:
            "oh no! It looks like there was a database error while performing your search, give it another try...",
        });
    });
});

router.post("/org/add", function (req, res, next) {
  let org_name = req.headers.organisation_name;
  let owner = req.headers.owner;
  let address = req.headers.address;
  let city = req.headers.city;
  let state = req.headers.state;
  let country = req.headers.country;
  if (!req.headers["authorization"])
    return res.status(401).send({
      error: "Missing the authorization header",
    });
  let token = req.headers["authorization"].replace("Bearer ", "");
  if (org_name == undefined || owner == undefined) {
    return res
      .status(400)
      .send({ error: "Missing organisation name or owner name" });
  }
  req.jwt.verify(token, process.env.secret, function (err) {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    } else {
      // add row
      req
        .db("organisations")
        .insert({
          organisation_name: org_name,
          owner: owner,
          address: address,
          city: city,
          state: state,
          country: country,
        })
        .then(() => {
          res.status(200).send({
            message: "New organisation added",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ message: "This entry already exists." });
        });
    }
  });
});

router.put("/org/update", function (req, res, next) {
  // old values to find in db
  let org_name = req.headers.organisation_name;
  if (org_name == undefined)
    return res
      .status(400)
      .send({ message: "No organisation provided to update." });

  // new values to update
  let new_OrgName = req.headers.new_organisation_name;
  let newOwner = req.headers.new_owner;
  let address = req.headers.address;
  let city = req.headers.city;
  let state = req.headers.state;
  let country = req.headers.country;
  if (
    new_OrgName == undefined &&
    newOwner == undefined &&
    address == undefined &&
    city == undefined &&
    state == undefined &&
    country == undefined
  )
    return res.status(400).send({ message: "No values provided to update." });

  if (!req.headers["authorization"])
    return res.status(401).send({
      error: "Missing the authorization header",
    });
  let token = req.headers["authorization"].replace("Bearer ", "");
  req.jwt.verify(token, process.env.secret, function (err) {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    } else {
      // add row
      req
        .db("organisations")
        .where({
          organisation_name: org_name,
        })
        .update({
          organisation_name: new_OrgName,
          owner: newOwner,
          address: address,
          city: city,
          state: state,
          country: country,
        })
        .then((data) => {
          if (data == 0)
            return res
              .status(400)
              .send({ message: "This entry does not exist." });
          res.status(200).send({
            message: "Saved changes",
          });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(400)
            .send({ message: "The database cannot update this change." });
        });
    }
  });
});

module.exports = router;

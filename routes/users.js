var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");

/* GET home page. */

router.get("/users", async (req, res) => {
    let results = await db("SELECT * FROM usertable;");
    try {
      let users = results.data;
      if (users.length === 0) {
        res.status(404).send({ error: "No users registered" });
      } else {
        res.send(users);
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });



module.exports = router;

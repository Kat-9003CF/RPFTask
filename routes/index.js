var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get("/usertable", async (req, res) => {
  try {
      let results = await db('SELECT * FROM usertable');
      let userdetails = results.data;
      res.send(userdetails);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;

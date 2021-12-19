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


  // GET user with ID
router.get("/users/:id", async (req, res) => {
    let userId = req.params.id;

    try {
        let results = await db(`SELECT * FROM usertable WHERE id = ${userId}`);
        let users = results.data;
        if (users.length === 0) {
            res.status(404).send({ error: 'User not found' });
        } else {
            res.send(users[0]);
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// POST new user
router.post("/users", async (req, res) => {
    let { username, email, passwordHash } = req.body;

    let sql = `
        INSERT INTO usertable (username, email, passwordHash)
        VALUES ('${username}', '${email}', MD5('${passwordHash}'))
    `;

    try {
        await db(sql);
        let result = await db('SELECT * FROM usertable');
        let users = result.data;
        res.status(201).send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


const user_API = process.env.KEY

router.delete(`/users/:id`, async (req, res) => { 
    if (user_API === 'secretkey'){

      let userId = req.params.id;

    try {
        let result = await db(`SELECT * FROM usertable WHERE id = ${userId}`);
        if (result.data.length === 0) {
            res.status(404).send({ error: 'User not found' });
        } else {
            await db(`DELETE FROM usertable WHERE id = ${userId}`);
            let result = await db('SELECT * FROM usertable');
            let users = result.data;
            res.send(users);
        }   
    }   catch (err) {
        res.status(500).send({ error: err.message });
    }
} else {
    res.status(401).send({ error: 'Access Denied' });
}

});

module.exports = router;

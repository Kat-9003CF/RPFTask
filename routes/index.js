var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");
const validator = require('./validator')

exports.basic=()=>{
    return true;
}


//GET all users in database.  If no users, return error.

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


  // GET user with specified ID.  If not found, return error.
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


/* 
POST new user.  
Hashes password
Checks username is longer than 0
checks password is longer than 8 characters
checks email address contains @
If not, returns error 'invalid data'
*/
router.post("/users", async (req, res) => {
    let { username, email, passwordHash } = req.body;

    if (validator.isValidUsername(username) && 
        validator.isValidEmail(email) &&
        validator.isValidPass(passwordHash)){

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
    } else {
        res.status(400).send({error: 'Bad request: invalid data'})
    }
});


/*
DELETEs the user, if the API key is correct.  If the key is not present or is incorrect
user gets error message 'Access Denied'.
*/
router.delete(`/users/:id`, async (req, res) => { 
    const user_API = process.env.KEY

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

const router = require('express').Router();
const pool = require('../modules/pool');

//! Adding a GET route from the db
router.get("/", (req, res) => {
    let queryText = 'SELECT * FROM "todos";';//gets all the info from todos
    
    
    pool.query(queryText)
    .then((result) => {
      // console.log(result.rows);
      console.log("TODOS Backend is running");
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Woops, error making query: ", queryText);
      console.error(error);
      res.sendStatus(500);
    });
})

//! Adding a POST route
router.post("/", (req, res) => {
    console.log("This is the req.body: ", req.body);

    const addTodos = req.body;
    const queryText = `
    INSERT INTO "todos" ("text")
    VALUES ($1);
    `
    let queryParams = [
        addTodos.text
    ];
    console.log("Query Text: ", queryText);
    console.log("Query Params", queryParams);

    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log("Woops that did't work", queryText);
            console.log(error);
            res.sendStatus(500)
        })
})




module.exports = router;

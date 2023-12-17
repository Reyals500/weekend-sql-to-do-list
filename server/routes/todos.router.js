const router = require('express').Router();
const pool = require('../modules/pool');

//! Adding a GET route from the db
router.get("/", (req, res) => {
    let queryText = 'SELECT * FROM "todos";';//gets all the info from todos
    
    
    pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
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

router.put("/:id", (req, res) => {
    let todoId = req.params.id;
    console.log("todoID", todoIdId);
    let queryText;
    let queryParams = [todoId];
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log("Woops, error making query: ", queryText);
        console.error(error);
        res.sendStatus(500);
      });
  });

  router.delete("/:id", (req, res) => {
    // Accessing the ID directly from req.params
    // No need to assign it to another variable like reqId
    let todoId = req.params.id;
    console.log("todo id:", todoId);
  
    // SQL query to delete the book with the specified ID
    let sqlText = "DELETE FROM todos WHERE id=$1;";
  
    // Executing the query using the pool object
    pool
      .query(sqlText, [todoId])
      .then((result) => {
        console.log("todo ElImInAtEd");
        res.sendStatus(200); // Send success status
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Send error status if there's a problem
      });
  });


module.exports = router;

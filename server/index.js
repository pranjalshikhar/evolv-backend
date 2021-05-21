const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase',
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// ------------------------------------ LEVEL 1 ------------------------------------------------

// Add a blog
app.post("/api/insert", (req, res) => {

    const blogTitle = req.body.blogTitle;
    const blogBody = req.body.blogBody;
    
    const sqlInsert = 
        `INSERT INTO blog_table (blogTitle, blogBody) VALUES (?,?);`
    connection.query(sqlInsert, [blogTitle, blogBody], (err, result) => {
        console.log(err);  
    }); 
});


// Get all the blogs
app.get("/api/get", (req, res) => {
    const sqlSelect = 
        `SELECT * FROM blog_table`
    connection.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});


// Get a blog by id
app.get("/api/get/:id", (req, res) => {
    const sqlSelectById = 
        `SELECT * FROM blog_table WHERE id=?;`
    connection.query(sqlSelectById, [req.params.id], (err, result) => {
        // console.log(result);
        res.send(result);
    });
});


// Delete a blog with given id
app.delete("/api/delete/:id", (req, res) => {
    const sqlDeleteById = 
        `DELETE FROM blog_table WHERE id=?;`
    connection.query(sqlDeleteById, [req.params.id], (err, result) => {
        // console.log(result);
        res.send(result);
        console.log(`deleted : ${[req.params.id]}`);
    });
});



// Update the blog with given id.
app.put("/api/update/:id", (req, res) => {

    const blogBody = req.body.blogBody;
    const blogId = req.params.id;

    const sqlUpdateById = 
        `UPDATE blog_table SET blogBody="${blogBody}" WHERE id=${blogId};`
    connection.query(sqlUpdateById,  (err, result) => {
        console.log(err);
        res.send(result);
        console.log(`updated : ${[req.params.id]}`);
    });

    // console.log(blogBody);
    // console.log(blogId);
    // console.log(sqlUpdateById);
});









// ------------------------------------ LEVEL 2 ------------------------------------------------



// Add a blog
app.post("/api/insert/comment/:id", (req, res) => {
    
    const blogId = req.params.id;

    const sqlInsertComment = 
        `INSERT INTO comment_table (commBody, id) VALUES (?,${blogId});`
    connection.query(sqlInsertComment, (err, result) => {
        console.log(err);  
        // res.send(result);
    }); 
});



// Get all comments for a post
app.get("/api/get/comment/:id", (req, res) => {
    
    const sqlSelectComment = 
    `SELECT * FROM blog_comment_table WHERE id=${req.params.id};`
    connection.query(sqlSelectComment, (err, result) => {
        // console.log(result);  
        res.send(result);
    }); 
});









app.listen(8000, () => {
    console.log("running at 8000");
});



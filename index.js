// For input validation
const Joi = require('joi');

// For express.js
const express = require('express');
const app = express();

app.use(express.json());

// Connect to port
const port = process.env.port || 3000;
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
});

// Local storage for movie genres
genres = [
    { id: 1, name: "action" },
    { id: 2, name: "adventure" },
    { id: 3, name: "drama" }
];

// Schema for movie genres
const schema = Joi.object({
    name: Joi.string().required().pattern(new RegExp('^[a-zA-Z]+'))
});

// GET request for the displaying the whole movie genres
app.get("/api/genres",(req,res) => {
    console.log("Get request to print all the movie genres......");
    res.send(genres);
});

// GET request for displaying the genre with given id
app.get("/api/genres/:id",(req,res) => {

    console.log("Get request to print a movie genre with given id......");

    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send("The genre with given id is not found.....");

    res.send(genre);
});

// POST request for creating new genre
app.post("/api/genres",(req,res) => {

    console.log(genres);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    console.log(genre);
    const result = schema.validate(req.body);

    if(result.error)
    {
        res.status(400).send(result.error);
    }

    genres.push(genre);
    console.log(genres);
    res.send(genre);
});

// PUT request for updating the genre
app.put("/api/genres/:id",(req,res) => {

    console.log("put request called...");
    console.log(genres);
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    console.log(genre);
    const result = schema.validate(req.body);
    console.log(result);

    // Invalid genre
    if(!genre) res.status(404).send("The genre with given id is not found.....");

    // Invalid name
    if(result.error)
    {
        return res.status(400).send(result.error);
    }

    genre.name = req.body.name;
    console.log(genres);
    res.send(genre);
});

// DELETE request
app.delete("/api/genres/:id",(req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // Invalid genre
    if(!genre) res.status(404).send("The genre with given id is not found.....");

    console.log(genres);
    const i = genres.indexOf(genre);
    genres.splice(i,1);
    
    console.log(genres);

    res.send(genre);
});


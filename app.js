const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose 
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to Mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    const {title, instructions, level, ingredients, image, duration, isArchived } = req.body;
    Recipe.create({title, instructions, level, ingredients, image, duration, isArchived}).then(newRecipe => {
        res.status(201).json(newRecipe);
    }).catch(error => res.status(500).json(error));

});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res, next) => {
Recipe.find().then(allRecipes => {
    res.status(200).json(allRecipes);
    }).catch(error => res.status(500).json(error))
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res, next) => {
    const {id} = req.params;
    Recipe.findById(id).then(foundRecipe => {
        res.status(200).json(foundRecipe);
    }).catch(error => res.status(500).json(error))
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    const {id} = req.params;
    Recipe.findByIdAndUpdate(id, req.body, {new:true}).then(editedRecipe => {
        res.status(200).json(editedRecipe);
    }).catch(error => res.status(500).json(error))
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    const {id} = req.params;
    Recipe.findByIdAndDelete(id).then(() => {
        res.status(204).json({message: `post ${id} has been deleted`});
    }).catch(error => res.status(500).json(error))
});

// Iteration 8 - User
app.post('/users', (req, res) => {
    const {email, firstName, lastName, password, image} = req.body;
    User.create({email, firstName, lastName, password, image}).then(newUser => {
        res.status(201).json(newUser);
    }).catch(error => res.status(500).json(error));

});

// Iteration 9 - Get all users
app.get('/users', (req, res) =>{
    User.find().then(allUsers => {
        res.status(200).json(allUsers);
    }).catch(error => res.status(500).json(error));
});

// Iteration 10 - Get user by Id
app.get('/users/:id', (req,res) => {
    const {id} = req.params;
    User.findById(id).then(foundUser => {
        res.status(200).json(foundUser);
    }).catch(error => res.status(500).json(error));
});




// Start the server
app.listen(3000, () => console.log('André 3000 is listening'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;

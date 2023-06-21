
//imports the "path" module
const path = require("path");
// imports the "Router" module from the "express" library
const router = require("express").Router();


// GET request
// sets up a route handler for GET requests to the endpoint.
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Return to Homepage
// sets up a route handler for GET requests to any other endpoint. 
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
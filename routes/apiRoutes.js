//imports the "fs" module
const fs = require("fs");
//imports the "util" module
const util = require("util");
// imports the "Router" module from the "express" library
const app = require("express").Router();
//creates a promisified version of the "writeFile" function from the "fs" module
const writeFileAsync = util.promisify(fs.writeFile);
//creates a promisified version of the "readFile" function from the "fs" module
const readFileAsync = util.promisify(fs.readFile);

var notesData;

//defines a route handler for GET requests to the "/notes" endpoint
app.get("/notes", (req, res) => {
// reads the contents of the "db.json" file and returns a promise.
  readFileAsync("db/db.json", "utf8").then(function (data) {
    // parses the retrieved data from JSON get an array of objects
    notesData = JSON.parse(data);
    //sends a JSON response
    res.json(notesData);
  });
});

// POST  request, similar to previous request (get)
app.post("/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {
    notesData = JSON.parse(data);

    let newNote = req.body;
    let currentID = notesData.length;

    newNote.id = currentID + 1;
    notesData.push(newNote);

    notesData = JSON.stringify(notesData);

    writeFileAsync("db/db.json", notesData).then(function (data) {
      console.log("Note has been added.");
    });
    res.json(notesData);
  });
});

// DELETE request, similar to GET and POST request
app.delete("/notes/:id", (req, res) => {
  let selID = parseInt(req.params.id);

  for (let i = 0; i < notesData.length; i++) {
    if (selID === notesData[i].id) {
      notesData.splice(i, 1);
      let noteJSON = JSON.stringify(notesData, null, 2);

      writeFileAsync("db/db.json", noteJSON).then(function () {
        console.log("Note has been deleted.");
      });
    }
  }
  res.json(notesData);
});


module.exports = app;
// imports the 'htmlRoutes' module
const htmlRoutes = require('./routes/htmlRoutes');
// imports the 'express' module
const express = require('express');
// initializes an instance of the express application.
const app = express();
// imports the 'apiRoutes' module
const apiRoutes = require('./routes/apiRoutes');
//sets the value of the PORT at 3000
const PORT = process.env.PORT || 3000;

// Folder to retrieve CSS and JS Files
app.use(express.static("public"));

// Middleware to parse the JSON data
app.use(express.urlencoded({extended:true}));
//configures the express application to use the built-in middleware
app.use(express.json());
//sets up a middleware in the express application
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// sets up a server to listen on a specified
// PORT and prints a message when the server starts listening.
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

//exports the 'app' object
//making it available as a module for other files to use or require.
module.exports = app;
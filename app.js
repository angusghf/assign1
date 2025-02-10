// Import express framework
const express = require('express');
// import the books router and save it to booksRouter
const booksRouter = require("./routes/books")
// create an express application
const app = express();
// define the server port
const PORT = 3000;

// path module for handling file paths
const path = require('path');

// 3rd party Middleware
// parses json data
const bodyParser = require("body-parser");

// parse every req sent to server
// The parsed data will be converted to json and be available with req.body
app.use(bodyParser.json());

// apply all the routes in books.js to /api/ROUTES_FROM_OTHER_FULE
// i.e. api/books
// api/books/2

// uses the books router for api requests
app.use("/api", booksRouter);

// Serves static files from the public folder 
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    // logging the server url
    console.log(`Server running at http://localhost:${PORT}/`);
});
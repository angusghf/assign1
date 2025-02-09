const express = require('express');
// import the books router and save it to booksRouter
const booksRouter = require("./routes/books")
const app = express();
const PORT = 3000;

// 3rd party Middleware
const bodyParser = require("body-parser");

// parse every req sent to server
// The parsed data will be converted to json and be available with req.body
app.use(bodyParser.json());

// apply all the routes in books.js to /api/ROUTES_FROM_OTHER_FULE
    // i.e. api/books
// api/books/2
app.use("/api", booksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
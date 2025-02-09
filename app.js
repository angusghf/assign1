const express = require('express');
const app = express();
const PORT = 3000;

// 3rd party Middleware
const bodyParser = require("body-parser");

// parse every req sent to server
// The parsed data will be converted to json and be available with req.body
app.use(bodyParser.json());



// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
// Import Express.framework
const express = require("express");

// create a new group of routes

// create a new router instance
const router = express.Router();

// List of books with initial items
const books = [
    { id: 1, title: 'Darkly Dreaming Dexter', author: "Jeff Lindsay", imageURL: '/assets/darklydreamingdexter.jpg', year: '2004' },
    { id: 2, title: 'Dearly Devoted Dexter', author: "Jeff Lindsay", imageURL: '/assets/dearlydevoteddexter.jpg', year: '2005' },
    { id: 3, title: 'Dexter in the Dark', author: "Jeff Lindsay", imageURL: '/assets/dexterinthedark.jpg', year: '2007' },
    { id: 4, title: 'Dexter by Design', author: "Jeff Lindsay", imageURL: '/assets/dexterbydesign.jpg', year: '2009' }
];


//Find and Return a Book
// Middleware to find a book by ID
function findBookById(req, res, next) {

    // get the id from the url
    const requestedId = Number(req.params.id);

    // save the matching array item to bookData if the Id of the item is the same as the requested Id
    // Basically finds a book in the list
    const bookData = books.find((singleBook) => {
        return singleBook.id === requestedId;
    })

    // if it is defined, that means it exists, so attach it to the request as a new .book prop
    if (bookData !== undefined) {
        // Attach a book to the request
        req.book = bookData;
        // Move to the next middleware
        next();
        // send a 404 response if there is no match
    } else {
        res.status(404).send("Book Not Found!");
    }
}





// Get all books
// all of these used to be app.get/post/put/delete
// they now now become router.get/post/put/delete
router.get('/books', (req, res) => res.send(books));
// Get a single book by Id
router.get('/books/:id', findBookById, (req, res) => res.send(req.book));

// Add a new book via POST
router.post('/books', (req, res) => {
    const book = req.body
    // Assigns a new Id
    book.id = books.length + 1;
    // Adds to the list
    books.push(book);
    // sends confirmation
    res.status(201).send(book);
});

// Delete a book by id via a DELETE request
router.delete('/books/:id', findBookById, (req, res) => {
    // removed the book from list
    books.splice((req.book.id - 1), 1);

    // Respond with a success message if it works properly
    res.status(204).send('Book deleted');

});

// Update a book by Id
router.put('/books/:id', findBookById, (req, res) => {
    const updatedData = req.body;
    // Update book details
    req.book.text = updatedData.text;

    // Respond with the updated book and a status of 200
    res.send(req.book);

});

// export router we made
module.exports = router;
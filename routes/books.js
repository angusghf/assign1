const express = require("express");

// create a new group of routes
const router = express.Router();

// List of books with initial items
const books = [
    { id: 1, title: 'Darkly Dreaming Dexter', author: "Jeff Lindsay", imageURL: '/assets/darklydreamingdexter.jpg', year: '2004' },
    { id: 2, title: 'Dearly Devoted Dexter', author: "Jeff Lindsay", imageURL: '/assets/dearlydevoteddexter.jpg', year: '2005' },
    { id: 3, title: 'Dexter in the Dark', author: "Jeff Lindsay", imageURL: '/assets/dexterinthedark.jpg', year: '2007' },
    { id: 4, title: 'Dexter by Design', author: "Jeff Lindsay", imageURL: '/assets/dexterbydesign.jpg', year: '2009' }
];


//Find and Return a a Book
function findBookById(req, res, next) {

    // get the id from the url
    const requestedId = Number(req.params.id);

    // save the matching array item to bookData if the Id of the item is the same as the requested Id
    const bookData = books.find((singleBook) => {
        return singleBook.id === requestedId;
    })

    // if it is defined, that means it exists, so attach it to the request as a new .book prop
    if (bookData !== undefined) {
        req.book = bookData;
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
router.get('/books/:id', findBookById, (req, res) => res.send(req.book));

// Add a new book via POST
router.post('/books', (req, res) => {
    const book = req.body
    book.id = books.length + 1;
    books.push(book);

    res.status(201).send(book);
});

// Delete a book by id via a DELETE request
router.delete('/books/:id', findBookById, (req, res) => {

    // removed the todo object from the group
    books.splice((req.book.id - 1), 1);

    // Respond with a success message
    res.status(204).send('Book deleted');

});

router.put('/books/:id', findBookById, (req, res) => {

    const updatedData = req.body;
    req.book.text = updatedData.text;

    // Respond with the updated book and a status of 200
    res.send(req.book);

});

// export router we made
module.exports = router;
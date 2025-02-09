const express = require('express');
const app = express();
const PORT = 3000;

// List of books with initial items
const books = [
    { id: 1, title: 'test1', author: "Jeff Lindsay", imageURL: 'XYZIMG', year: 'ABCDATE' },
    { id: 2, title: 'test2', author: "Jeff Lindsay", imageURL: 'XYZIMG', year: 'ABCDATE' },
    { id: 3, title: 'test3', author: "Jeff Lindsay", imageURL: 'XYZIMG', year: 'ABCDATE' },
    { id: 4, title: 'test4', author: "Jeff Lindsay", imageURL: 'XYZIMG', year: 'ABCDATE' }
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
app.get('/books', (req, res) => res.send(books));
app.get('/books/:id', findBookById, (req, res) => res.send(req.book));

// Add a new book via POST
app.post('/books', (req, res) => {
    // Wait for the request body to be fully parsed
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {

        const book = JSON.parse(body);
        book.id = books.length + 1;
        books.push(book);

        // Respond with a success message and the newly added book
        // @NOTE: a 201 status code is used for items that are created successfully
        res.status(201).send(book);

    });
});

// Delete a book by id via a DELETE request
app.delete('/books/:id', findBookById, (req, res) => {

    // removed the todo object from the group
    books.splice((req.book.id - 1), 1);

    // Respond with a success message
    res.status(204).send('Book deleted');

});

app.put('/books/:id', findBookById, (req, res) => {

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {

        const updatedData = JSON.parse(body);
        req.book.text = updatedData.text;

        // Respond with the updated book and a status of 200
        res.send(req.book);

    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
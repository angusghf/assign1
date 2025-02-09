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
    console.log(req.params.id);
    next();
}
 
// Get all books
app.get('/books', (req, res) => {
    res.send(books);
});        

app.get('/books/:id', findBookById,  (req, res) => {

    const requestedId = Number(req.params.id);

    // Use Array.find to get the reminder with the matching id or undefined
    const reminderData = books.find(reminderInList => reminderInList.id === requestedId);
    
    // If the reminder is found, send it back as a response
    if (reminderData !==  undefined) {
        res.send(reminderData)
    // Else set the Not Found status and send a message
    } else {
        res.status(404).send('Reminder not found');
    }

});

// Add a new reminder via POST
app.post('/books', (req, res) => {
    // Wait for the request body to be fully parsed
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {

        const reminder = JSON.parse(body);
        reminder.id = books.length + 1;
        books.push(reminder);
 
        // Respond with a success message and the newly added reminder
        // @NOTE: a 201 status code is used for items that are created successfully
        res.status(201).send(reminder);

    });
});

// Delete a reminder by id via a DELETE request
app.delete('/books/:id', (req, res) => {
    
    // Convert the id to a number
    const requestedId = Number(req.params.id);
    
    // Use Array.find to get the reminder with the matching id or undefined
    const requestedData = books.find(reminderInList => reminderInList.id === requestedId);
    
    // If the reminder is not found, requestData will be undefined
    if (requestedData !== undefined) {
        // Find the index of the reminder in the array and remove it
        books.splice(requestedData.id, 1);
        
        // Respond with a success message
        res.status(204).send('Reminder deleted');
    
    } else {
        // Respond with a 404 status and a message
        res.status(404).send('Reminder not found');
    }
    
});

app.put('/books/:id', (req, res) => {
	 
    let body = '';
 
    req.on('data', chunk => {
        body += chunk.toString();
    });            
 
    req.on('end', () => {
 
        // Convert the id to a number
        const requestedId = Number(req.params.id);
    
        // Use Array.find to get the reminder with the matching id or undefined
        const reminderData = books.find(reminderInList => reminderInList.id === requestedId);
 
        // If the reminder is found, update the text property
        if (reminderData !== undefined) {
            const updatedData = JSON.parse(body);
            reminderData.text = updatedData.text;
 
            // Respond with the updated reminder and a status of 200
            res.send(reminderData);
 
        } else {
 
            // If the reminder is not found, respond with a 404 status
            res.status(404).send('Reminder not found');
 
        }
 
    }); 
 
 
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
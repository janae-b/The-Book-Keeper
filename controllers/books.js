const Book = require('../models/book')


module.exports = {
    new: newBook,
    index
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add Book', user: req.user});
}

function index(req, res) {
    Book.find({}, function(err, books){
    console.log('books', books)
    res.render('books/index', {
        title: 'All Books',
        books
        })
    })
}
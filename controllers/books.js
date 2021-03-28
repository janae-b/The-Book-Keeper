const Book = require('../models/book')


module.exports = {
    new: newBook,
    index,
    create
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

function create(req, res) {
    const book = new Book(req.body)
    book.save(function(err) {
      if (err){ return res.redirect('/books/new')} 
      console.log(book)
      res.redirect(`/books/new`)
    })
  }
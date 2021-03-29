const Book = require('../models/book')


module.exports = {
    new: newBook,
    index,
    create,
    show
}

function show(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', { title: 'Book Review', user: req.user, book})
    })
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add Book', user: req.user});
}

function index(req, res) {
    Book.find({})
    .then(books => {
    res.render('books/index', {
        title: 'All Books',
        user: req.user,
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


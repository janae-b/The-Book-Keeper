const Book = require('../models/book')


module.exports = {
    new: newBook,
    index,
    create,
    show,
    createReview,
    delete: deleteBook,
    update,
}

function deleteBook(req, res) {
    Book.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect(`/books`)
    })
}

function createReview(req, res) {
    Book.findById(req.params.id, function(err, book) {
        // Add the review (from req.body)
        // and save the movie
        book.reviews.push(req.body)
        book.save(function(err) {
          // Redirect to show view
        res.redirect(`/books/${book._id}`)
        })
    })
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
    req.body.readAgain = !!req.body.readAgain;
    const book = new Book(req.body)
    book.save(function(err) {
      if (err){ return res.redirect('/books')} 
      console.log(book)
      res.redirect(`/books`)
    })
  }

  function update(req, res) {
    req.body.readAgain = !!req.body.readAgain
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((book) => {
        res.redirect(`/books`)
    })
}   


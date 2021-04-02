const Book = require('../models/book')
const User = require('../models/user')


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
    Book.findById(req.params.id)
    .then((book) => {
        let idx = book.collectedBy.indexOf(req.user._id);
        book.collectedBy.splice(idx, 1);
        book.save()
        .then(() => {
        res.redirect(`/books`)
        })
    })
}

function createReview(req, res) {
    Book.findById(req.params.id)
    .then((book) => { 
        book.reviews.push(req.body)
        book.save()
        .then(()=> {
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
    Book.find({ collectedBy: req.user._id })
    .then (books => {
    res.render('books/index', {
        title: 'All Books',
        user: req.user,
        books,
        })
    })
}

function create(req, res) {
    req.body.collectedBy = req.user._id
    req.body.readTwice = !!req.body.readTwice;
    const book = new Book(req.body)
    book.save(function(err) {
        if (err){ return res.redirect('/books')} 
        console.log(book)
        res.redirect(`/books`)
    })
}

function update(req, res) {
    req.body.readTwice = !!req.body.readTwice
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((book) => {
        res.redirect(`/books`)
    })
} 

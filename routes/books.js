const router = require("express").Router();
const books = require("../controllers/books");
const booksCtrl = require("../controllers/books")

router.get('/new', isLoggedIn, booksCtrl.new)
router.get('/', isLoggedIn, booksCtrl.index)
router.get('/:id', isLoggedIn, booksCtrl.show)
router.post('/', isLoggedIn, booksCtrl.create)
router.post('/:id/reviews', isLoggedIn, booksCtrl.createReview)
router.delete('/:id',isLoggedIn, booksCtrl.delete)
router.put('/:id', isLoggedIn, booksCtrl.update)
router.delete('/:id/reviews',isLoggedIn, booksCtrl.deleteReview)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

  module.exports = router
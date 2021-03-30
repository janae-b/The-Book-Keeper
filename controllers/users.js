const User = require("../models/user");
const Book = require("../models/book")

module.exports = {
  showProfile,
  index,
  show,
  update
};

function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, {new: true}) 
  .then((user) => {
    console.log(user)
    res.redirect('/users/profile')
  })
}


function show(req, res) {
  User.findById(req.params.id)
  .then((userInfo) => {
    Book.find({ collectedBy: userInfo._id })
    .then((books) => {
      res.render('users/show', {
        title: 'User Details',
        userInfo,
        user: req.user,
        books
      })
    })
  })
}



function showProfile(req, res) {
  User.findById(req.user._id)
  .then((user) => {
    res.render("users/profile", { title: "Profile Page", user });
  });
}

function index(req, res) {
  User.find({}).then((users) => {
    res.render("users/index", { title: "User Index", user: req.user, users });
  });
}


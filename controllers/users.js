const User = require("../models/user");
const Book = require("../models/book");
const user = require("../models/user");

module.exports = {
  showProfile,
  index,
  update,
  addIntro
};

function addIntro(req, res) {
  user.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(() => {
    res.redirect('/user/profile')
  })
}

function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, {new: true}) 
  .then(() => {
    res.redirect('/users/profile')
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


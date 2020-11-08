var auth = {};

auth.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/users/login");
};

module.exports = auth;
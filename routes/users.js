const express = require("express");
const User = require("../models/User");
const Driver = require("../models/Driver");
const Vendor = require("../models/Vendor");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const toPosixPath = (pathstring) => {
    // And heck, you don't even need to put it in a function unless
    // you need this conversion all over the place in your code.
    return pathstring.split(path.sep).join(path.posix.sep);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/users/login");
};

router.get("/users/register", (req, res) => {
    res.render("users/register");
});

// New user POST route - handle register logic and sign the user in
router.post("/users/register", upload.single("image"), (req, res) => {
    if (
        req.body.username &&
        req.body.name &&
        req.body.password
    ) {
        let newUser = new User({
            username: req.body.username,
            name: req.body.name,
        });
        if (req.file) {
            let imgPath = toPosixPath(req.file.path)
            newUser.profile = imgPath.split("public")[1];
            return createUser(newUser, req.body.password, req, res);
        } else {
            newUser.profile = "/images/no_profile.jpg";
            return createUser(newUser, req.body.password, req, res);
        }
    }
});

function createUser(newUser, password, req, res) {
    User.register(newUser, password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, function() {
                console.log(req.user);
                req.flash(
                    "success",
                    "Success! You are registered and logged in!"
                );
                res.redirect(`/users/${newUser._id}/profile`);
            });
        }
    });
}

// Log in GET route - show login form
router.get("/users/login", (req, res) => {
    res.render("users/login");
});

// Log in POST route - handle login logic
router.post(
    "/users/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login"
    }),
    (req, res) => {}
);

// All users GET route
router.get("/users/all", isLoggedIn, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            req.flash(
                "error",
                "There has been a problem getting all users info."
            );
            res.redirect("/");
        } else {
            res.render("users/users", { users: users });
        }
    });
});

// Logout
router.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("back");
});

// User Profile
router.get("/users/:id/profile", isLoggedIn, (req, res) => {
    // getting the user data (including friends and friend requests)
    User.findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                console.log(err);
                req.flash("error", "There has been an error.");
                res.redirect("back");
            } else {
                // render the page without the friends array.
                console.log(user);
                res.render("users/user", { userData: user }); // im calling it userData because i have a local template variable called user and i don't want to over-write it
            }
        });
});

module.exports = router;

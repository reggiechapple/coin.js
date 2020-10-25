const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const Product = require("./models/Product");
const port = process.env.PORT || 3000;
const MongoStore = require('connect-mongo')(session);

const shopRoutes = require("./routes/shop");
const rootRoutes = require("./routes/root");

const MONGODB_URI = "mongodb://localhost:27017/coin";

const app = express();

// Set view engine to ejs so that template files will be ejs files
app.set("view engine", "ejs");
// Set up express session
app.use(session({
    store: new MongoStore({
        url: MONGODB_URI
    }),
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));

// Set up passport for authentication
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Setup static directories
app.use(express.static("public"));
app.use(express.static("node_modules"));

// Set up flash (alerts)
app.use(flash());

// Connect to MongoDB database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Passing variables to template files
app.use((req, res, next) => {
    //   res.locals.user = req.user;
    //   res.locals.login = req.isAuthenticated();
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Passing variables to template files
app.use((req, res, next) => {
    res.locals.session=req.session
    res.locals.user = req.user;
    res.locals.login = req.isAuthenticated();
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.locals.scripts = [];
app.locals.addScripts = function (all) {
    app.locals.scripts = [];
    if (all != undefined) {
        app.locals.scripts = all.map(function (script) {
            return "<script src='/" + script + "'></script>";
        }).join('\n ');
    }

};
app.locals.getScripts = function (req, res) {
    return app.locals.scripts;
};

app.locals.styles = [];
app.locals.addStyles = function (all) {
    app.locals.styles = [];
    if (all != undefined) {
        app.locals.styles = all.map(function (stylesheet) {
            return "<link rel='stylesheet' href='/" + stylesheet + "'>";
        }).join('\n ');
    }

};
app.locals.getStyles = function (req, res) {
    return app.locals.styles;
};

// Routes & Middleware
app.use("/", rootRoutes);
app.use("/", shopRoutes);

const server = app.listen(port, () => {
    console.log("App is running on port " + port);
});

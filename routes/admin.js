var router = require("express").Router();
var Product = require("../models/Product");
var Driver = require("../models/Driver");
const Order = require("../models/Order");
const User = require("../models/User");
const Customer = require("../models/Customer");
const multer = require("multer");
const path = require("path");
const Vendor = require("../models/Vendor");
const OrderItem = require("../models/OrderItem");
const ProductRepository = require("../repositories/ProductRepository");

let _productRepository = new ProductRepository(Product);

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

router.get("/admin", isLoggedIn, (req, res) => {
    res.render("admin/index");
});

router.get("/admin/drivers", isLoggedIn, (req, res) => {
    Driver.find({}).populate("identity").exec((err, drivers) => {
        if (err) {
            console.log(err);
            req.flash("error", "There has been an error finding drivers");
            res.redirect("back");
        }
        else {
            res.render("admin/drivers", {drivers: drivers});
        }
    });
});

router.get("/admin/users", isLoggedIn, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            req.flash("error", "There has been an error finding drivers");
            res.redirect("back");
        }
        else {
            res.render("admin/users", {users: users});
        }
    });
});

router.get("/admin/users/add", isLoggedIn, (req, res) => {
    res.render("admin/add-user");
});

router.post("/admin/users/add", isLoggedIn, upload.single("image"), (req, res) => {
    if (
        req.body.username &&
        req.body.name &&
        req.body.password &&
        req.body.role
    ) {
        let newUser = new User({
            username: req.body.username,
            name: req.body.name,
            role: req.body.role
        });
        if (req.file) {
            let imgPath = toPosixPath(req.file.path)
            newUser.avatar = imgPath.split("public")[1];
            return createUser(newUser, req.body.password, req, res);
        } else {
            newUser.avatar = "/images/no_profile.jpg";
            return createUser(newUser, req.body.password, req, res);
        }
    }
});

router.get("/admin/orders/pending", (req, res) => {
    Order.find({ isComplete: { $eq: false }}).exec((err, orders) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("admin/orders", { orders: orders });
        }
    });
});

router.get("/admin/orders/:id", (req, res) => {
    Order.findById(req.params.id).populate("items").exec((err, order) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            Driver.find({}).populate("identity").exec((err, drivers) => {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    res.render("admin/order-details", { order: order, drivers: drivers });
                }
            });
        }
    });
});

router.get("/admin/order-items/:id", (req, res) => {
    OrderItem.findById(req.params.id)
        .populate("vendor")
        .populate({
            path: 'driver',
            populate: {
            path: 'identity',
            model: 'User'
        }})
        .exec((err, order) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            statues = ["PREPARING", "DELIVERING", "ARRIVED", "COMPLETE"]
            res.render("admin/order-items", { order: order, statues: statues });
        }
    });
});

router.post("/admin/order-items/:id/update-tracking", (req, res) => {
    OrderItem.findById(req.params.id, (err, order) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            order.status = req.body.status;
            order.save();
            res.redirect("back");
        }
    })
})


router.post("/admin/order-items/:id/assign-driver", (req, res) => {
    OrderItem.findById(req.params.id, (err, order) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            if (req.body.driver) {
                order.driver = req.body.driver;
                order.save();
            }
            res.redirect("back");
        }
    });
});

function createUser(newUser, password, req, res) {
    User.register(newUser, password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/");
        } else {
            if (user.role === "Driver") {
                Driver.create({ identity: user }, (err, driver) => {
                    if (err) {
                        req.flash("error", err.message);
                        res.redirect("/");
                    } else {
                        user.driver = driver;
                        user.save();
                        res.redirect("/admin/users");
                    }
                });
            }

            if (user.role === "Customer") {
                Customer.create({ identity: user }, (err, customer) => {
                    if (err) {
                        req.flash("error", err.message);
                        res.redirect("/");
                    } else {
                        user.customer = customer;
                        user.save();
                        res.redirect("/admin/users");
                    }
                });
            }

            if (user.role === "Vendor") {
                Vendor.create({ identity: user }, (err, vendor) => {
                    if (err) {
                        req.flash("error", err.message);
                        res.redirect("/");
                    } else {
                        user.vendor = vendor;
                        user.save();
                        res.redirect("/admin/users");
                    }
                });
            }
        }
    });
}

module.exports = router;
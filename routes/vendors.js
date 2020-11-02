var router = require("express").Router();
var Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const OrderItem = require("../models/OrderItem");
const multer = require("multer");
const path = require("path");

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

router.get("/vendors/:id", (req, res) => {
    Vendor.findById(req.params.id).populate("identity").exec((err, vendor) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("vendors/index", {vendor: vendor});
        }
    });
});

router.get("/vendors/:id/products", (req, res) => {
    Vendor.findById(req.params.id).populate("identity").populate("products").exec((err, vendor) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("vendors/products", {vendor: vendor});
        }
    });
});

router.get("/vendors/:id/orders", (req, res) => {
    OrderItem.find({ $and: [{ isPending: { $eq: true } }, { vendor: { $eq: req.params.id } }] }).populate("order").exec((err, orders) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("vendors/orders", {orders: orders});
        }
    })
});

router.get("/vendors/products/add", (req, res) => {
    res.render("vendors/add-product");
});

router.post("/vendors/products/add", isLoggedIn, upload.single("image"), (req, res) => {
    if (
       req.body.name &&
        req.body.price
    ) {
        let newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            vendor: req.user.vendor
        });
        if (req.file) {
            let imgPath = toPosixPath(req.file.path)
            newProduct.image = imgPath.split("public")[1];
            return createProduct(newProduct, req, res);
        } else {
            newProduct.image = "/images/no_profile.jpg";
            return createProduct(newProduct, req, res);
        }
    }
});

function createProduct(newProduct, req, res) {
    Product.create(newProduct, (err, product) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/");
        } 
        else {
            Vendor.findById(req.user.vendor._id, (err, vendor) => {
                if (err) {
                    req.flash("error", err.message);
                    res.redirect("/");
                } 
                else {
                    vendor.products.push(product);
                    vendor.save();
                    res.redirect(`/vendors/${vendor._id}/products`);
                }
            });
        }
    });
}

module.exports = router;
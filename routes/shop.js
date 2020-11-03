var router = require("express").Router();
var Product = require("../models/Product");

router.get("/shop/products", (req, res) => {
    Product.find({}).populate("vendor").exec((err, products) => {
        if (err) {
            console.log(err);
            req.flash("error", "There has been an error finding products");
            res.redirect("back");
        } else {
            res.render("shop/products", { products: products });
        }
    });
});

router.get("/shop/products/:id", (req, res) => {
    Product.findById(req.params.id).populate({
        path: 'vendor',
        populate: {
        path: 'identity',
        model: 'User'
    }}).exec((err, product) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("shop/product-details", {product: product});
        }
    });
});
router.get("/cart", (req, res) => {
    res.render("shop/cart");
});

router.get("/cart/add/:id", (req, res) => {
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }

    let cart = req.session.cart;

    if (req.params.id) {

        Product.findById(req.params.id, (err, product) => {
            if (err) {
                console.log(err);
                req.flash("error", "There has been an error finding this product");
                res.redirect("back");
            } else {
                if (!cart.items[product._id]) {

                    cart.items[product._id] = {
                        product: product,
                        qty: 1,
                        vendorId: product.vendor._id
                    }
                    cart.totalQty = cart.totalQty + 1;
                    cart.totalPrice = cart.totalPrice + product.price
                }
                else {
                    cart.items[product._id].qty = cart.items[product._id].qty + 1
                    cart.totalQty = cart.totalQty + 1
                    cart.totalPrice = cart.totalPrice + product.price
                }
                return res.redirect("/cart");
            }
        });
    }
});

router.get("/cart/remove/:id", (req, res) => {
    let cart = req.session.cart;

    if (req.params.id) {

        Product.findById(req.params.id, (err, product) => {
            if (err) {
                console.log(err);
                req.flash("error", "There has been an error finding this product");
                res.redirect("back");
            } else {
                if (cart.items[product._id]) {

                    delete cart.items[product._id];
                    cart.totalQty = cart.totalQty - 1;
                    cart.totalPrice = cart.totalPrice - product.price
                }
                else {
                   console.log("Item is not in cart")
                }
                return res.redirect("/cart");
            }
        });
    }
});

module.exports = router;
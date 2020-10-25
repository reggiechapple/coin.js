var router = require("express").Router();
var Product = require("../models/Product");

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
                req.flash("error", "There has been an error finding this post");
                res.redirect("back");
            } else {
                if (!cart.items[product._id]) {

                    cart.items[product._id] = {
                        product: product,
                        qty: 1,
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

module.exports = router;
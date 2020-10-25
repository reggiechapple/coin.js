var router = require("express").Router();
var Product = require("../models/Product");

router.get("/", (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
            req.flash("error", "There has been an error finding products");
            res.redirect("back");
        } else {
            res.render("index", {products: products});
        }
    });
});

module.exports = router;
var router = require("express").Router();
var Product = require("../models/Product");

router.get("/", (req, res) => {
    if (req.isAuthenticated() && req.user.role !== "Customer") {

        if (req.user.role === "Vendor") {
            res.redirect(`/vendors/${req.user.vendor._id}`);
        }
        else if (req.user.role === "Driver") {
            res.redirect(`/drivers/${req.user.driver._id}`);
        }
        else if (req.user.role === "Admin") {
            res.redirect("/admin");
        }
    }
    else {
        Product.find({}).populate({
            path: 'vendor',
            populate: {
            path: 'identity',
            model: 'User'
        }}).exec((err, products) => {
            if (err) {
                console.log(err);
                req.flash("error", "There has been an error finding products");
                res.redirect("back");
            } else {
                res.render("index", { products: products });
            }
        });    
    }
});

module.exports = router;
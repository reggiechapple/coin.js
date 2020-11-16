var router = require("express").Router();
var Product = require("../models/Product");
const fs = require("fs");
let setupFile = `${process.cwd()}/views/setup/setup.ejs`;

router.get("/", (req, res) => {
  try {
    if (fs.existsSync(setupFile)) {
      console.log("The file exists.");
      res.redirect("/setup");
    } else {
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
          }
        }).exec((err, products) => {
          if (err) {
            console.log(err);
            req.flash("error", "There has been an error finding products");
            res.redirect("back");
          } else {
            res.render("index", { products: products });
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
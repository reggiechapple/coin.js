var router = require("express").Router();
var Product = require("../models/Product");

router.get("/vendors", (req, res) => {
    res.render("vendors/index");
});

module.exports = router;
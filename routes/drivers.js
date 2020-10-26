var router = require("express").Router();
var Product = require("../models/Product");

router.get("/drivers", (req, res) => {
    res.render("drivers/index");
});


module.exports = router;
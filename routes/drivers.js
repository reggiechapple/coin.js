var router = require("express").Router();
var Order = require("../models/Order");
var Driver = require("../models/Driver");
const e = require("express");

router.get("/drivers/:id", (req, res) => {
    Driver.findById(req.params.id).populate("identity").exec((err, driver) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("drivers/index", {driver: driver})
        }
    });
});

router.get("/drivers/:id/assignments", (req, res) => {
    Order.find({ driver: { $eq: req.params.id }}).exec((err, orders) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("drivers/orders", { orders: orders });
        }
    });
});

module.exports = router;
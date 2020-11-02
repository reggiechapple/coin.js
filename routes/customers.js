var router = require("express").Router();
var Order = require("../models/Order");
var Customer = require("../models/Customer");
const OrderItem = require("../models/OrderItem");

router.get("/profile/:id", (req, res) => {
    Customer.findById(req.params.id).populate("identity").exec((err, customer) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("customers/profile", {customer: customer})
        }
    });
});

router.get("/profile/:id/orders", (req, res) => {
    Order.find({ customer: { $eq: req.params.id }})
        .populate("items")
        .exec((err, orders) => {
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("customers/orders", { orders: orders });
        }
    });
});

router.get("/order-items/:id/tracking", (req, res) => {
    OrderItem.findById(req.params.id)
        .populate("vendor")
        .populate("order")
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
            res.render("customers/track-order", { order: order });
        }
    });
});

module.exports = router;
const router = require("express").Router();
const OrderViewService = require("../services/orders/OrderViewService");

let _viewService = new OrderViewService();

router.get("/orders/checkout", (req, res) => {
    res.render("orders/checkout");
});

router.post("/orders/checkout", (req, res) => {
    let cart = req.session.cart;

    return _viewService.checkout({
        name: req.body.name,
        email: req.body.email,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip
        },
        orderTotal: cart.totalPrice
    }, req, res);
});

router.get("/orders/success", (req, res) => {
    res.render("orders/success");
});

module.exports = router;
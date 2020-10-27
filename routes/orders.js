const router = require("express").Router();
const order = require("../models/Order");

router.get("/orders/checkout", (req, res) => {
    res.render("orders/checkout");
});

router.post("/orders/checkout", (req, res) => {
    if(
        req.body.name &&
        req.body.email &&
        req.body.street &&
        req.body.city &&
        req.body.state &&
        req.body.zip
    ) {
        let cart = req.session.cart;
        let newOrder = new Order({
            name: req.body.name,
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            },
            orderTotal: cart.totalPrice,
        });
        cart.items.forEach(item => {
            newOrder.items.push(item);
        });
        return createOrder(newOrder, req, res);
    }

});

function createOrder(newOrder, req, res) {
    Order.create(newOrder, (err, order) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/");
        } 
        else {
            order.items.forEach(item => {

                item.orders.push(order);
                item.save();
                
            });
            res.redirect("/orders/success");
        }
    });
}

module.exports = router;
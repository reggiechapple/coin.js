const router = require("express").Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

router.get("/orders/checkout", (req, res) => {
    res.render("orders/checkout");
});

router.post("/orders/checkout", (req, res) => {
    
    let cart = req.session.cart;
    let newOrder = new Order({
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
    });
    return createOrder(newOrder, req, res);
});

router.get("/orders/success", (req, res) => {
    res.render("orders/success");
})

function createOrder(newOrder, req, res) {
    Order.create(newOrder, (err, order) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } 
        else {

            let cart = req.session.cart;
            for(let item of Object.values(cart.items)) {
                OrderItem.create({
                    product: item["product"],
                    qty: item["qty"],
                    vendor: item["vendorId"],
                    order: order
                }, (err, orderItem) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        order.items.push(orderItem);
                        order.save();           
                    }
                });
            }
            req.session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0
            }
            res.redirect("/orders/success");
        }
    });
}

module.exports = router;
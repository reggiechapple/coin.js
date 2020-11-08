const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const OrderRepository = require("../../repositories/OrderItemRepository");
const OrderItemRepository = require("../../repositories/OrderItemRepository");

let _orderItemRepository = new OrderItemRepository(OrderItem);
let _orderRepository = new OrderRepository(Order);

class OrderViewService {
    constructor () {}

    checkout(newOrder, req, res) {
        _orderRepository.create(newOrder, (err, order) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } 
            else {
                let cart = req.session.cart;
                for(let item of Object.values(cart.items)) {
                    _orderItemRepository.create({
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
                if (req.user && req.user.role === "Customer") {
                    res.redirect(`/profile/${req.user.customer._id}/orders`)
                }
                res.redirect("/orders/success");
            }
        });
    }
}

module.exports = OrderViewService;
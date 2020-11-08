const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const Customer = require("../../models/Customer");
const OrderRepository = require("../../repositories/OrderRepository");
const OrderItemRepository = require("../../repositories/OrderItemRepository");
const CustomerRepository = require("../../repositories/CustomerRepository");

let _orderRepository = new OrderRepository(Order);
let _orderItemRepository = new OrderItemRepository(OrderItem);
let _customerRepository = new CustomerRepository(Customer);

class CustomerViewService {
    constructor () {}

    getProfile(id, req, res) {
        _customerRepository.identity(id, (err, customer) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                _orderRepository.customerOrders(id, (err, orders) => {
                    if(err) {
                        console.log(err);
                        res.redirect("back");
                    }
                    else {
                        var orderItems = [];
                        var orderCount = orders.length;
                        orders.forEach(order => {
                            order.items.forEach(item => {
                                orderItems.push(item);
                            });
                        });
                        res.render("customers/profile", {
                            customer: customer, 
                            orderItems: orderItems,
                            orderCount: orderCount
                         });
                    }
                });
            }
        });
    }

    getAddresses(id, req, res) {
        _customerRepository.identity(id, (err, customer) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("customers/address", {customer: customer})
            }
        });
    }

    getIncompleteOrders(id, req, res) {
        _orderRepository.customerIncompleteOrders(id, (err, orders) => {
            if(err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("customers/orders", { orders: orders });
            }
        });
    }

    getOrderTracking(id, req, res) {
        _orderItemRepository.populated(id, (err, order) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("customers/track-order", { order: order });
            }
        });
    }

    getSettings(id, req, res) {
        _customerRepository.identity(req.params.id, (err, customer) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("customers/settings", {customer: customer})
            }
        });
    }
}

module.exports = CustomerViewService;
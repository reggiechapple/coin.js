var Repository = require("./Repository");

class OrderRepository extends Repository {

    constructor(Order) {
        super(Order);
        this.Order = Order;
    }

    customerIncompleteOrders(id, cb) {
        this.Order.find({ $and: [{ isComplete: { $eq: false } }, { customer: { $eq: id } }] })
        .populate("items")
        .exec(cb);
    }

}

module.exports = OrderRepository;
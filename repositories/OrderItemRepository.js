var Repository = require("./Repository");

class OrderItemRepository extends Repository {

    constructor(OrderItem) {
        super(OrderItem);
        this.OrderItem = OrderItem;
    }

    vendorPendingOrderItems(id, cb) {
        this.OrderItem.find({ $and: [{ status: { $ne: 'ARRIVED' } }, { vendor: { $eq: id } }] }).populate("order").exec(cb);
    }

    driverOrderItems(id, cb) {
        this.OrderItem.find({ driver: { $eq: id } }).populate({
            path: 'driver',
            populate: {
            path: 'identity',
            model: 'User'
        }}).exec(cb);
    }

    populated(id, cb) {
        this.OrderItem.findById(id)
            .populate("vendor")
            .populate("order")
            .populate({
                path: 'driver',
                populate: {
                path: 'identity',
                model: 'User'
            }})
            .exec(cb);
    }

}

module.exports = OrderItemRepository;
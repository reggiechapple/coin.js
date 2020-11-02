var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
    status: {
        type: String,
        enum : ['PREPARING', 'DELIVERING', 'ARRIVED'],
        default: 'PREPARING'
    },
    product: { type: Object, required: true },
    qty: { type: Number, required: true },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

var OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;
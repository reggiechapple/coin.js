var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
    isPending: { type: Boolean, default: true },
    product: { type: Object, required: true },
    qty: { type: Number, required: true },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

var OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;
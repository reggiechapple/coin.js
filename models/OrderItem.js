var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
     },
    qty: { type: Number, required: true },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
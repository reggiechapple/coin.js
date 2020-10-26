var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    orders: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Order' 
    }],
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
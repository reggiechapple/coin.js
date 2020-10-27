var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { 
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true }
    },
    orderTotal: { type: Number, required: true },
    orderTime: { type: Date, default: Date.now },
    status: {
        type: String,
        enum : ['PENDING', 'PREPARING', 'DELIVERING', 'ARRIVED', 'COMPLETE'],
        default: 'PENDING'
    },
    timeSlot: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlot'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
});

var Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { 
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: Number, required: true }
    },
    orderTotal: { type: Number, required: true },
    orderTime: { type: Date, default: Date.now },
    isComplete: { type: Boolean, default: false },
    timeSlot: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlot'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    }]
});

var Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
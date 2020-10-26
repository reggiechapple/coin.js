var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({

    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
    slot: { type: String, required: true },
    maxOrders: { type: Number, required: true },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],

});

var TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = TimeSlot;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    identity: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
});

var Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;

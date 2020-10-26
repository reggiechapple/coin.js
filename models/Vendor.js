var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
    status: {
        type: String,
        enum : ['PENDING', 'ACTIVE', 'INACTIVE'],
        default: 'PENDING'
    },
    identity: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'OrderItem' 
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

});

var Vendor = mongoose.model("Vendor", VendorSchema);
module.exports = Vendor;

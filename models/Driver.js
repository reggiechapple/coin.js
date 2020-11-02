var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DriverSchema = new Schema({
    identity: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
});

var Driver = mongoose.model("Driver", DriverSchema);
module.exports = Driver;

var Repository = require("./Repository");

class DriverRepository extends Repository {

    constructor(Driver) {
        super(Driver);
        this.Driver = Driver;
    }

    identity(id, cb) {
        this.Driver.findById(id).populate('identity').exec(cb);
    }

}

module.exports = DriverRepository;
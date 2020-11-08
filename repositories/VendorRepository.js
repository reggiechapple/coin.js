var Repository = require("./Repository");

class VendorRepository extends Repository {

    constructor(Vendor) {
        super(Vendor);
        this.Vendor = Vendor;
    }

    vendorIdentity(id, cb) {
        this.Vendor.findById(id).populate('identity').exec(cb);
    }

}

module.exports = VendorRepository;
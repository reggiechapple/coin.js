var Repository = require("./Repository");

class CustomerRepository extends Repository {

    constructor(Customer) {
        super(Customer);
        this.Customer = Customer;
    }

    identity(id, cb) {
        this.Customer.findById(id).populate('identity').exec(cb);
    }

}

module.exports = CustomerRepository;
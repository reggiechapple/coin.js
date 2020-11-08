var Repository = require("./Repository");

class ProductRepository extends Repository {

    constructor(Product) {
        super(Product);
        this.Product = Product;
    }

    vendorProducts(id, cb) {
        this.Product.find({ vendor: { $eq: id } }).populate('vendor',).exec(cb);
    }

}

module.exports = ProductRepository;
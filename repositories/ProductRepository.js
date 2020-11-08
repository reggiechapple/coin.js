var Repository = require("./Repository");

class ProductRepository extends Repository {

    constructor(Product) {
        super(Product);
        this.Product = Product;
    }

    vendorProducts(id, cb) {
        this.Product.find({ vendor: { $eq: id } }).populate('vendor',).exec(cb);
    }

    populatedCollection(cb) {
        this.Product.find({}).populate("vendor").exec(cb);
    }

    populatedSingle(id, cb) {
        this.Product.findById(id).populate({
            path: 'vendor',
            populate: {
            path: 'identity',
            model: 'User'
        }}).exec(cb);
    }

}

module.exports = ProductRepository;
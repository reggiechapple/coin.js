const Product = require("../../models/Product");
const ProductRepository = require("../../repositories/ProductRepository");

let _productRepository = new ProductRepository(Product);

class ShopViewService {

    constructor() {}

    getProducts(req, res) {
        _productRepository.populatedCollection((err, products) => {
            if (err) {
                console.log(err);
                req.flash("error", "There has been an error finding products");
                res.redirect("back");
            } else {
                res.render("shop/products", { products: products });
            }
        });
    }

    getProductDetails(id, req, res) {
        _productRepository.populatedSingle(id, (err, product) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("shop/product-details", {product: product});
            }
        });
    }

}

module.exports = ShopViewService;
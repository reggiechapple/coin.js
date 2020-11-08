const Product = require("../../models/Product");
const ProductRepository = require("../../repositories/ProductRepository")

let _productRepository = new ProductRepository(Product);

class SessionCartService {
    constructor() {}

    initCart(session) {
        if (!session.cart) {
            session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0
            }
        }
    }

    addToCart(id, req, res) {
        this.initCart(req.session);
        let cart = req.session.cart;
        if (id) {
            _productRepository.single(id, (err, product) => {
                if (err) {
                    console.log(err);
                    req.flash("error", "There has been an error finding this product");
                    res.redirect("back");
                } else {
                    if (!cart.items[product._id]) {
    
                        cart.items[product._id] = {
                            product: product,
                            qty: 1,
                            vendorId: product.vendor._id
                        }
                        cart.totalQty = cart.totalQty + 1;
                        cart.totalPrice = cart.totalPrice + product.price
                    }
                    else {
                        cart.items[product._id].qty = cart.items[product._id].qty + 1
                        cart.totalQty = cart.totalQty + 1
                        cart.totalPrice = cart.totalPrice + product.price
                    }
                    return res.redirect("/cart");
                }
            });
        }
    }

    removeFromCart(id, req, res) {
        let cart = req.session.cart;
        if (id) {
            _productRepository.single(id, (err, product) => {
                if (err) {
                    console.log(err);
                    req.flash("error", "There has been an error finding this product");
                    res.redirect("back");
                } else {
                    if (cart.items[product._id]) {

                        delete cart.items[product._id];
                        cart.totalQty = cart.totalQty - 1;
                        cart.totalPrice = cart.totalPrice - product.price
                    }
                    else {
                    console.log("Item is not in cart")
                    }
                    return res.redirect("/cart");
                }
            });
        }
    }


}

module.exports = SessionCartService;
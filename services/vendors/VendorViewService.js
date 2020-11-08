const Product = require("../../models/Product");
const OrderItem = require("../../models/OrderItem");
const Vendor = require("../../models/Vendor");
const ProductRepository = require("../../repositories/ProductRepository");
const OrderItemRepository = require("../../repositories/OrderItemRepository");
const VendorRepository = require("../../repositories/VendorRepository");

let _productRepository = new ProductRepository(Product);
let _orderItemRepository = new OrderItemRepository(OrderItem);
let _vendorRepository = new VendorRepository(Vendor);

class VendorViewService {
    constructor () {}

    createProduct(newProduct, req, res) {
        _productRepository.create(newProduct, (err, product) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/");
            } 
            else {
                _vendorRepository.single(req.user.vendor._id, (err, vendor) => {
                    vendor.products.push(product);
                    vendor.save();
                    res.redirect(`/vendors/${vendor._id}/products`);
                });
            }
        });
    }

    getProducts(id, req, res) {
        _productRepository.vendorProducts(id, (err, products) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("vendors/products", {products: products});
            }
        });
    }

    getProfile(id, req, res) {
        _vendorRepository.vendorIdentity(id, (err, vendor) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("vendors/index", {vendor: vendor});
            }
        });
    }

    getPendingOrders(id, req, res) {
        _orderItemRepository.vendorPendingOrderItems(id, (err, orders) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("vendors/orders", {orders: orders});
            }
        });
    }
}

module.exports = VendorViewService;
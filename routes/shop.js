var router = require("express").Router();
var Product = require("../models/Product");
const SessionCartService = require("../services/cart/SessionCartService");
const ShopViewService = require("../services/shop/ShopViewService");

const _cartService = new SessionCartService();
const _viewService = new ShopViewService();

router.get("/shop/products", (req, res) => {
    _viewService.getProducts(req, res);
});

router.get("/shop/products/:id", (req, res) => {
    _viewService.getProductDetails(req.params.id, req, res);
});
router.get("/cart", (req, res) => {
    res.render("shop/cart");
});

router.get("/cart/add/:id", (req, res) => {
    _cartService.addToCart(req.params.id, req, res);
});

router.get("/cart/remove/:id", (req, res) => {
    _cartService.removeFromCart(req.params.id, req, res);
});

module.exports = router;
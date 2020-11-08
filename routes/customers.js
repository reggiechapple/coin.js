var router = require("express").Router();

const CustomerViewService = require("../services/customers/CustomerViewService");
let _viewService = new CustomerViewService();

router.get("/profile/:id", (req, res) => {
    _viewService.getProfile(req.params.id, req, res);
});

router.get("/profile/:id/addresses", (req, res) => {
    _viewService.getAddresses(req.params.id, req, res);
});

router.get("/profile/:id/orders", (req, res) => {
    _viewService.getIncompleteOrders(req.params.id, req, res);
});

router.get("/profile/:id/settings", (req, res) => {
    _viewService.getSettings(req.params.id, req, res);
});

router.get("/order-items/:id/tracking", (req, res) => {
    _viewService.getOrderTracking(req.params.id, req, res);
});

module.exports = router;
const router = require("express").Router();

const DriverViewService = require("../services/drivers/DriverViewService");
let _viewService = new DriverViewService();

router.get("/drivers/:id", (req, res) => {
    _viewService.getProfile(req.params.id, req, res);
});

router.get("/drivers/:id/assignments", (req, res) => {
    _viewService.getProfile(req.params.id, req, res);
});

module.exports = router;
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const VendorViewService = require("../services/vendors/VendorViewService");
let _viewService = new VendorViewService();

router.get("/vendors/:id", auth.isLoggedIn, (req, res) => {
    _viewService.getProfile(req.params.id, req, res);
});

router.get("/vendors/:id/products", auth.isLoggedIn, (req, res) => {
    _viewService.getProducts(req.params.id, req, res);
});

router.get("/vendors/:id/orders", auth.isLoggedIn, (req, res) => {
    _viewService.getPendingOrders(req.params.id, req, res);
});

router.get("/vendors/products/add", auth.isLoggedIn, (req, res) => {
    res.render("vendors/add-product");
});

router.post("/vendors/products/add", auth.isLoggedIn, upload.store.single("image"), (req, res) => {
    if (
       req.body.name &&
        req.body.price
    ) {
        let newProduct = {
            name: req.body.name,
            price: req.body.price,
            vendor: req.user.vendor
        };
        if (req.file) {
            newProduct.image = upload.posixfmt(req.file.path).split("public")[1];
            return _viewService.createProduct(newProduct, req, res);
        } else {
            newProduct.image = "/images/no_profile.jpg";
            return _viewService.createProduct(newProduct, req, res);
        }
    }
});

module.exports = router;
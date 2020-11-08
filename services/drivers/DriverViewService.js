const OrderItem = require("../../models/OrderItem");
const Driver = require("../../models/Driver");
const OrderItemRepository = require("../../repositories/OrderItemRepository");
const DriverRepository = require("../../repositories/DriverRepository");

let _orderItemRepository = new OrderItemRepository(OrderItem);
let _driverRepository = new DriverRepository(Driver);

class DriverViewService {

    constructor() {}

    getProfile(id, req, res) {
        _driverRepository.identity(id, (err, driver) => {
            if (err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("drivers/index", {driver: driver})
            }
        });
    }

    getAssignments(id, req, res) {
        _orderItemRepository.driverAssignments(id, (err, orders) => {
            if(err) {
                console.log(err);
                res.redirect("back");
            }
            else {
                res.render("drivers/orders", { orders: orders });
            }
        });
    }

}

module.exports = DriverViewService;
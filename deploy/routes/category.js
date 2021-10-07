"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var categoryController_1 = __importDefault(require("../controllers/categoryController"));
var authenticate_1 = __importDefault(require("../utils/authenticate"));
var isAdmin_1 = __importDefault(require("../utils/isAdmin"));
router.route('/')
    .get(categoryController_1["default"].list)
    .post(authenticate_1["default"], isAdmin_1["default"], categoryController_1["default"].post);
router.route('/:id')
    .get(categoryController_1["default"].getOne)
    .put(authenticate_1["default"], isAdmin_1["default"], categoryController_1["default"].put)["delete"](authenticate_1["default"], isAdmin_1["default"], categoryController_1["default"].destroy);
exports["default"] = router;
//# sourceMappingURL=category.js.map
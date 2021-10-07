"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var userController_1 = __importDefault(require("../controllers/userController"));
var authenticate_1 = __importDefault(require("../utils/authenticate"));
var isAdmin_1 = __importDefault(require("../utils/isAdmin"));
router.route('/')
    .get(authenticate_1["default"], userController_1["default"].getCurrentUser)
    .post(userController_1["default"].register);
router.post('/login', userController_1["default"].login);
router.post('/reactivate', userController_1["default"].reactivate);
router.put('/tags/:id', authenticate_1["default"], userController_1["default"].updateUserTags);
router.route('/admin')
    .get(authenticate_1["default"], isAdmin_1["default"], userController_1["default"].adminList);
router.route('/admin/:id')
    .put(authenticate_1["default"], isAdmin_1["default"], userController_1["default"].adminUpdate)["delete"](authenticate_1["default"], isAdmin_1["default"], userController_1["default"].adminDelete);
router.route('/admin/:id/:status')
    .put(authenticate_1["default"], isAdmin_1["default"], userController_1["default"].adminDeactivate);
router.route('/:id')
    .put(authenticate_1["default"], userController_1["default"].update);
exports["default"] = router;
//# sourceMappingURL=user.js.map
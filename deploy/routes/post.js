"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var postController_1 = __importDefault(require("../controllers/postController"));
var authenticate_1 = __importDefault(require("../utils/authenticate"));
var isAdmin_1 = __importDefault(require("../utils/isAdmin"));
var isAdminOrFriend_1 = __importDefault(require("../utils/isAdminOrFriend"));
router.post('/public', authenticate_1["default"], postController_1["default"].listPublic);
router.get('/public/:id', authenticate_1["default"], postController_1["default"].getOnePublic);
router.route('/')
    // dates don't seem to pass correctly via querystring, so the "/" GET functionality
    //  has been moved to the "/list" POST endpoint below (because "/" POST is for creating a new post)
    // .get(authenticate, isAdminOrFriend, postController.list)
    .post(authenticate_1["default"], isAdmin_1["default"], postController_1["default"].post);
router.route('/list')
    .post(authenticate_1["default"], isAdminOrFriend_1["default"], postController_1["default"].list);
router.route('/:id')
    .get(authenticate_1["default"], isAdminOrFriend_1["default"], postController_1["default"].getOne)
    .put(authenticate_1["default"], isAdmin_1["default"], postController_1["default"].put)["delete"](authenticate_1["default"], isAdmin_1["default"], postController_1["default"].destroy);
exports["default"] = router;
//# sourceMappingURL=post.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var blog_1 = __importDefault(require("./blog"));
var category_1 = __importDefault(require("./category"));
var post_1 = __importDefault(require("./post"));
var source_1 = __importDefault(require("./source"));
var user_1 = __importDefault(require("./user"));
router.use('/blogs', blog_1["default"]);
router.use('/categories', category_1["default"]);
router.use('/posts', post_1["default"]);
router.use('/sources', source_1["default"]);
router.use('/users', user_1["default"]);
if (process.env.NODE_ENV === 'production') {
    router.use(function (req, res) {
        res.sendFile(path_1["default"].join(__dirname, "../build/index.html"));
    });
}
exports["default"] = router;
//# sourceMappingURL=index.js.map
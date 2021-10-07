"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1["default"])();
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json({ limit: '16mb' }));
app.use(express_1["default"].text());
app.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.header('Access-Control-Allow-Origin', '***REMOVED***');
    }
    else {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1["default"].static('build'));
}
app.use(routes_1["default"]);
app.listen(3001, function () {
    return console.log('REST API server ready at: http://localhost:3001');
});
//# sourceMappingURL=server.js.map
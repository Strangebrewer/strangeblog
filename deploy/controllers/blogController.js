"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var models_1 = require("../models");
exports["default"] = {
    getOne: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.blogModel.findOne(parseInt(req.params.id))];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log('err in blogController getOne:::', err_1);
                        res.status(400).send(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    list: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blog, categories, i, cat, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.blogModel.findMany(req.query)];
                    case 1:
                        blog = _a.sent();
                        return [4 /*yield*/, models_1.categoryModel.findMany()];
                    case 2:
                        categories = _a.sent();
                        for (i = 0; i < categories.length; i++) {
                            cat = categories[i];
                        }
                        res.status(200).json({ blog: blog[0], categories: categories });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log('err in blogController list:::', err_2);
                        res.status(400).send(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    put: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.blogModel.update(req.body.id, req.body)];
                    case 1:
                        response = _a.sent();
                        res.status(201).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log('err in blogController put:::', err_3);
                        res.status(400).send(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    post: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        req.body.userId = req.user.id;
                        return [4 /*yield*/, models_1.blogModel.create(req.body)];
                    case 1:
                        response = _a.sent();
                        res.status(201).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log('err in blogController post:::', err_4);
                        res.status(400).send(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    destroy: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.blogModel["delete"](parseInt(req.params.id))];
                    case 1:
                        response = _a.sent();
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log('err in blogController destroy:::', err_5);
                        res.status(400).send(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=blogController.js.map
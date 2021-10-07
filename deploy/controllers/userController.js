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
    getCurrentUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.user)
                            throw new Error('User could not be authenticated');
                        return [4 /*yield*/, models_1.userModel.findOne(req.user.id)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log('err in userController getCurrentUser:::', err_1);
                        res.status(400).send({ message: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    register: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.create(req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(201).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log('err in userController register:::', err_2);
                        res.status(400).send({ message: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.login(req.body.email, req.body.password)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log('err in userController login:::', err_3);
                        res.status(400).send({ message: err_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    reactivate: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.reactivate(req.body.email)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log('err in userController reactivate:::', err_4);
                        res.status(400).send({ message: err_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    update: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = parseInt(req.body.id);
                        return [4 /*yield*/, models_1.userModel.update(id, req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.log('err in userController update:::', err_5);
                        res.status(400).send({ message: err_5.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    updateUserTags: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.updateUserTags(req.user.id, req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log('err in userController updateUserTags:::', err_6);
                        res.status(400).send({ message: err_6.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    adminDelete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.adminDelete(parseInt(req.params.id))];
                    case 1:
                        _a.sent();
                        res.status(200).send('success');
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        console.log('err in userController destroy:::', err_7);
                        res.status(400).send({ message: err_7.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    adminList: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.adminList(req.query)];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        err_8 = _a.sent();
                        console.log('err in userController adminList:::', err_8);
                        res.status(400).send({ message: err_8.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    adminUpdate: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.userModel.adminUpdate(parseInt(req.params.id), req.body)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_9 = _a.sent();
                        console.log('err in userController adminUpdate:::', err_9);
                        res.status(400).send({ message: err_9.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    adminDeactivate: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, status, user, err_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, id = _a.id, status = _a.status;
                        return [4 /*yield*/, models_1.userModel.adminDeactivate(parseInt(id), status)];
                    case 1:
                        user = _b.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_10 = _b.sent();
                        console.log('err in userController adminDestroy:::', err_10);
                        res.status(400).send({ message: err_10.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=userController.js.map
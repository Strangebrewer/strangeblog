"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var passport_1 = require("../passport");
var slugify_1 = __importDefault(require("slugify"));
var UserModel = /** @class */ (function () {
    function UserModel(client) {
        this.client = client;
        this.select = {
            id: true,
            email: true,
            username: true,
            acl: true
        };
    }
    UserModel.prototype.getUserTags = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user.findUnique({
                            where: { id: userId },
                            select: { tags: true }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserModel.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user.findUnique({
                            where: { id: id },
                            select: this.select
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('That user does not exist');
                        return [2 /*return*/, this.tokenize(user)];
                }
            });
        });
    };
    UserModel.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var changes, emailExists, sluggedUsername, userNameExists, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        changes = {};
                        if (!data.email) return [3 /*break*/, 2];
                        this.validateEmail(data.email);
                        return [4 /*yield*/, this.client.user.findUnique({ where: { normalizedEmail: data.email.toLowerCase() } })];
                    case 1:
                        emailExists = _a.sent();
                        if (emailExists) {
                            throw new Error('That email has already been used');
                        }
                        else {
                            changes.email = data.email;
                            changes.normalizedEmail = data.email.toLowerCase();
                        }
                        _a.label = 2;
                    case 2:
                        if (!data.username) return [3 /*break*/, 4];
                        this.validateUsername(data.username);
                        sluggedUsername = (0, slugify_1["default"])(data.username, { lower: true });
                        return [4 /*yield*/, this.client.user.findUnique({ where: { normalizedUsername: sluggedUsername } })];
                    case 3:
                        userNameExists = _a.sent();
                        if (userNameExists) {
                            throw new Error('That username has already been taken');
                        }
                        else {
                            changes.username = (0, slugify_1["default"])(data.username, ' ');
                            changes.normalizedUsername = sluggedUsername;
                        }
                        _a.label = 4;
                    case 4:
                        if (data.password) {
                            changes.password = this.hashPassword(data.password);
                        }
                        return [4 /*yield*/, this.client.user.update({
                                where: { id: id },
                                data: changes,
                                select: this.select
                            })];
                    case 5:
                        user = _a.sent();
                        return [2 /*return*/, this.tokenize(user)];
                }
            });
        });
    };
    UserModel.prototype.updateUserTags = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, tags, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user.findUnique({ where: { id: userId } })];
                    case 1:
                        user = _a.sent();
                        tags = user.tags ? __spreadArray([], user.tags, true) : [];
                        index = tags.findIndex(function (tag) { return tag.id === data.id; });
                        tags.splice(index, 1, data);
                        return [2 /*return*/, this.update(userId, { tags: tags })];
                }
            });
        });
    };
    UserModel.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var emailExists, sluggedUsername, userNameExists, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateEmail(data.email);
                        this.validateUsername(data.username);
                        return [4 /*yield*/, this.client.user.findUnique({ where: { normalizedEmail: data.email.toLowerCase() } })];
                    case 1:
                        emailExists = _a.sent();
                        if (emailExists) {
                            throw new Error('An account already exists with that email address');
                        }
                        sluggedUsername = (0, slugify_1["default"])(data.username, { lower: true });
                        return [4 /*yield*/, this.client.user.findUnique({ where: { normalizedUsername: sluggedUsername } })];
                    case 2:
                        userNameExists = _a.sent();
                        if (userNameExists) {
                            throw new Error('That username has already been taken');
                        }
                        data.password = this.hashPassword(data.password);
                        data.username = (0, slugify_1["default"])(data.username, ' ');
                        data.normalizedUsername = sluggedUsername;
                        data.normalizedEmail = data.email.toLowerCase();
                        return [4 /*yield*/, this.client.user.create({
                                data: data,
                                select: this.select
                            })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, this.tokenize(user)];
                }
            });
        });
    };
    UserModel.prototype.adminDelete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user["delete"]({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserModel.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user.findUnique({
                            where: { normalizedEmail: email.toLowerCase() }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('Can\'t find a user with that email');
                        passwordValid = this.checkPassword(password, user.password);
                        if (!passwordValid) return [3 /*break*/, 6];
                        if (!(user.status === 'banned')) return [3 /*break*/, 2];
                        throw new Error('That account has been banned.');
                    case 2:
                        if (!(user.status === 'inactive')) return [3 /*break*/, 3];
                        throw new Error('That account is inactive. Would you like to reactivate it?');
                    case 3: return [4 /*yield*/, this.client.user.findUnique({
                            where: { normalizedEmail: email.toLowerCase() },
                            select: this.select
                        })];
                    case 4:
                        user = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, this.tokenize(user)];
                    case 6: throw new Error('That password does not match');
                }
            });
        });
    };
    UserModel.prototype.reactivate = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.user.update({
                            where: { email: email },
                            data: { status: 'active' },
                            select: this.select
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.tokenize(user)];
                }
            });
        });
    };
    UserModel.prototype.adminList = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, search, options, users, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.buildQuery(data), search = _a.search, options = _a.options;
                        return [4 /*yield*/, this.client.user.findMany(__assign({ where: search }, options))];
                    case 1:
                        users = _b.sent();
                        return [4 /*yield*/, this.client.user.count({ where: search })];
                    case 2:
                        count = _b.sent();
                        return [2 /*return*/, { users: users, count: count }];
                }
            });
        });
    };
    UserModel.prototype.adminUpdate = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.password)
                            data.password = this.hashPassword(data.password);
                        if (data.resetPassword)
                            data.password = this.hashPassword('1234');
                        if (!(data.addFriend || data.removeFriend)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.user.findUnique({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (data.addFriend) {
                            if (!user.acl.includes('friend'))
                                data.acl = __spreadArray(__spreadArray([], user.acl, true), ['friend'], false);
                            delete data.addFriend;
                        }
                        if (data.removeFriend) {
                            if (user.acl.includes('friend'))
                                data.acl = user.acl.filter(function (u) { return u !== 'friend'; });
                            delete data.removeFriend;
                        }
                        _a.label = 2;
                    case 2:
                        delete data.resetPassword;
                        options = this.buildQuery(data).options;
                        return [4 /*yield*/, this.client.user.update(__assign({ where: { id: id }, data: data }, options))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserModel.prototype.adminDeactivate = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildQuery({}).options;
                        return [4 /*yield*/, this.client.user.update(__assign({ where: { id: id }, data: { status: status } }, options))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserModel.prototype.tokenize = function (user) {
        var token = (0, passport_1.sign)({ id: user.id, email: user.email });
        return { token: token, user: user };
    };
    UserModel.prototype.validateEmail = function (email) {
        var test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if (!test)
            throw new Error('That is not a valid email.');
        return;
    };
    UserModel.prototype.validateUsername = function (username) {
        var test = /^[ A-Za-z0-9\s]*$/.test(username);
        if (!test)
            throw new Error('Usernames must be only letters, numbers, and spaces');
        return;
    };
    UserModel.prototype.hashPassword = function (password) {
        return bcryptjs_1["default"].hashSync(password, bcryptjs_1["default"].genSaltSync(10));
    };
    UserModel.prototype.checkPassword = function (given, original) {
        return bcryptjs_1["default"].compareSync(given, original);
    };
    UserModel.prototype.buildQuery = function (data) {
        var _a;
        if (data === void 0) { data = {}; }
        var search = {};
        if (data.username) {
            var sluggedUsername = (0, slugify_1["default"])(data.username, { lower: true });
            search.normalizedUsername = { contains: sluggedUsername, mode: 'insensitive' };
        }
        if (data.email)
            search.email = { contains: data.email, mode: 'insensitive' };
        if (data.status)
            search.status = data.status;
        if (data.acl)
            search.acl = { has: data.acl };
        var options = {
            select: __assign(__assign({}, this.select), { tags: true, status: true, createdAt: true, updatedAt: true })
        };
        if (data.skip)
            options.skip = parseInt(data.skip);
        if (data.take)
            options.take = parseInt(data.take);
        if (data.orderBy)
            options.orderBy = (_a = {}, _a[data.orderBy] = data.order, _a);
        return { search: search, options: options };
    };
    return UserModel;
}());
exports["default"] = UserModel;
//# sourceMappingURL=user.js.map
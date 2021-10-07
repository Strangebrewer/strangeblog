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
exports.__esModule = true;
var PostModel = /** @class */ (function () {
    function PostModel(client) {
        this.client = client;
    }
    PostModel.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post.findUnique({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostModel.prototype.findOnePublic = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post.findUnique({ where: { id: id, public: true } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostModel.prototype.findManyPublic = function (data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, search, options, posts, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.buildQuery(data), search = _a.search, options = _a.options;
                        return [4 /*yield*/, this.client.post.findMany(__assign({ where: __assign(__assign({}, search), { public: true }) }, options))];
                    case 1:
                        posts = _b.sent();
                        return [4 /*yield*/, this.client.post.count({ where: __assign(__assign({}, search), { public: true }) })];
                    case 2:
                        count = _b.sent();
                        return [2 /*return*/, { posts: posts, count: count }];
                }
            });
        });
    };
    PostModel.prototype.findMany = function (data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, search, options, posts, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.buildQuery(data), search = _a.search, options = _a.options;
                        return [4 /*yield*/, this.client.post.findMany(__assign({ where: __assign({}, search) }, options))];
                    case 1:
                        posts = _b.sent();
                        return [4 /*yield*/, this.client.post.count({ where: __assign({}, search) })];
                    case 2:
                        count = _b.sent();
                        return [2 /*return*/, { posts: posts, count: count }];
                }
            });
        });
    };
    PostModel.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post.update({ where: { id: id }, data: data, include: { category: true } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostModel.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post.create({ data: data, include: { category: true } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostModel.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post["delete"]({ where: { id: id } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostModel.prototype.buildQuery = function (data) {
        var _a;
        if (data === void 0) { data = {}; }
        var search = {};
        if (data.ids && data.ids.length) {
            var ids = data.ids.map(function (id) { return parseInt(id); });
            search.id = { "in": ids };
        }
        // if data.byUserTag, the above conditional will catch it
        //  because there will be data.ids;
        if (data.tags && !data.byUserTag) {
            var tags = data.tags.split(',');
            tags = tags.map(function (tag) { return tag.trim(); });
            search.tags = { hasEvery: tags };
        }
        if (data.byDate) {
            if (data.startDate && !data.endDate) {
                search.createdAt = { gte: new Date(data.startDate) };
            }
            else if (!data.startDate && data.endDate) {
                search.createdAt = { lte: new Date(data.endDate) };
            }
            else if (data.startDate && data.endDate) {
                search.AND = [
                    { createdAt: { gte: new Date(data.startDate) } },
                    { createdAt: { lte: new Date(data.endDate) } }
                ];
            }
        }
        if (data.categoryId)
            search.categoryId = parseInt(data.categoryId);
        if (data.title)
            search.title = { contains: data.title, mode: 'insensitive' };
        var options = { include: { category: true } };
        if (data.skip)
            options.skip = parseInt(data.skip);
        if (data.take)
            options.take = parseInt(data.take);
        if (data.orderBy)
            options.orderBy = (_a = {}, _a[data.orderBy] = data.order, _a);
        return { search: search, options: options };
    };
    return PostModel;
}());
exports["default"] = PostModel;
//# sourceMappingURL=post.js.map
"use strict";
exports.__esModule = true;
var passport_1 = require("../passport");
function default_1(req, res, next) {
    passport_1.passport.authenticate('jwt', function (err, user) {
        if (user)
            req.user = user;
        next();
    })(req, res, next);
}
exports["default"] = default_1;
//# sourceMappingURL=authenticate.js.map
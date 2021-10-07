"use strict";
exports.__esModule = true;
function default_1(req, res, next) {
    if (req.user.acl.includes('admin')) {
        next();
    }
    else {
        res.status(403).send({
            error: 'You do not have access to this resource.'
        });
    }
}
exports["default"] = default_1;
//# sourceMappingURL=isAdmin.js.map
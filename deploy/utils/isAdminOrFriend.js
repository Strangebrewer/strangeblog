"use strict";
exports.__esModule = true;
function default_1(req, res, next) {
    var acl = req.user.acl;
    if (acl.includes('admin') || acl.includes('friend')) {
        next();
    }
    else {
        res.status(403).send({
            error: 'You do not have access to this resource.'
        });
    }
}
exports["default"] = default_1;
//# sourceMappingURL=isAdminOrFriend.js.map
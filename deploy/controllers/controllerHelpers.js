"use strict";
exports.__esModule = true;
exports.addUserTagsToPosts = exports.getPostQueryIds = void 0;
function getPostQueryIds(req) {
    var userTags = req.user.tags;
    var queryTags = req.query.tags ? req.query.tags : req.body.tags;
    var queryTagsArray = [];
    if (queryTags)
        queryTagsArray = queryTags.split(',');
    var ids = [];
    for (var i = 0; i < userTags.length; i++) {
        var uTag = userTags[i];
        var count = 0;
        for (var j = 0; j < queryTagsArray.length; j++) {
            var qTag = queryTagsArray[j].trim();
            if (uTag.tags.includes(qTag))
                count++;
        }
        if (count === queryTagsArray.length)
            ids.push(uTag.id.toString());
    }
    return ids;
}
exports.getPostQueryIds = getPostQueryIds;
function addUserTagsToPosts(data, tags) {
    tags.forEach(function (tag) {
        if (Array.isArray(data)) {
            var post = data.find(function (p) { return p.id === tag.id; });
            if (post)
                post.userTags = tag.tags;
        }
        else {
            if (data.id === tag.id)
                data.userTags = tag.tags;
        }
    });
}
exports.addUserTagsToPosts = addUserTagsToPosts;
//# sourceMappingURL=controllerHelpers.js.map
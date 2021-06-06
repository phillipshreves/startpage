"use strict";
exports.__esModule = true;
// Link Generator
//
//
var fs = require('fs');
function push_to_collection(collection, collection_index, breadcrumb, _a) {
    var title = _a.title, description = _a.uri, link = _a.uri, image = _a.iconuri;
    collection[collection_index].entity.push({
        title: title,
        description: description,
        breadcrumb: breadcrumb,
        link: link,
        image: image
    });
    return collection;
}
;
function create_collection(name) {
    var collection = {
        name: name,
        entity: []
    };
    return collection;
}
;
function parse_file(file) {
    var bookmarks = JSON.parse(file);
    var entity_collections = [];
    var breadcrumb;
    // Parse out data
    // loop over root children
    for (var _i = 0, _a = bookmarks.children; _i < _a.length; _i++) {
        var location_1 = _a[_i];
        if (location_1.title == 'toolbar') {
            var entity_index = entity_collections.length;
            // loop over toolbar children
            for (var _b = 0, _c = location_1.children; _b < _c.length; _b++) {
                var entity = _c[_b];
                // Check if this is a folder or a bookmark
                if (entity.children != undefined) {
                    var folder_first_index = entity_collections.length;
                    // loop over folders/top level bookmarks
                    for (var _d = 0, _e = entity.children; _d < _e.length; _d++) {
                        var bookmark_first = _e[_d];
                        if (bookmark_first.children != undefined) {
                            var folder_second_index = entity_collections.length;
                            // loop over folders/first level bookmarks
                            for (var _f = 0, _g = bookmark_first.children; _f < _g.length; _f++) {
                                var bookmark_second = _g[_f];
                                if (bookmark_second.children != undefined) {
                                    var folder_third_index = entity_collections.length;
                                    //loop over folders/second level bookmarks
                                    for (var _h = 0, _j = bookmark_second.children; _h < _j.length; _h++) {
                                        var bookmark_third = _j[_h];
                                        if (bookmark_third.children != undefined) {
                                            var folder_fourth_index = entity_collections.length;
                                            //loop over third level bookmarks
                                            for (var _k = 0, _l = bookmark_third.children; _k < _l.length; _k++) {
                                                var bookmark_fourth = _l[_k];
                                                // this is as deep as we go for now
                                                // initialize if this is the first bookmark
                                                if (entity_collections[folder_second_index] == undefined) {
                                                    entity_collections[folder_fourth_index] = create_collection(bookmark_third.title);
                                                }
                                                // parse the bookmark
                                                breadcrumb = entity.title + "." + bookmark_first.title + "." + bookmark_second.title + "." + bookmark_third.title;
                                                entity_collections = push_to_collection(entity_collections, folder_fourth_index, breadcrumb, bookmark_fourth);
                                            }
                                        }
                                        else {
                                            // initialize if this is the first bookmark
                                            if (entity_collections[folder_second_index] == undefined) {
                                                entity_collections[folder_third_index] = create_collection(bookmark_second.title);
                                            }
                                            // This is a bookmark and we can create a link
                                            breadcrumb = entity.title + "." + bookmark_first.title + "." + bookmark_second.title;
                                            entity_collections = push_to_collection(entity_collections, folder_third_index, breadcrumb, bookmark_third);
                                        }
                                    }
                                }
                                else {
                                    // initialize if this is the first bookmark
                                    if (entity_collections[folder_second_index] == undefined) {
                                        entity_collections[folder_second_index] = create_collection(bookmark_first.title);
                                    }
                                    // This is a bookmark and we can create a link
                                    breadcrumb = entity.title + "." + bookmark_first.title;
                                    entity_collections = push_to_collection(entity_collections, folder_second_index, breadcrumb, bookmark_second);
                                }
                            }
                        }
                        else {
                            // initialize if this is the first bookmark
                            if (entity_collections[folder_first_index] == undefined) {
                                entity_collections[folder_first_index] = create_collection(entity.title);
                            }
                            // This is a bookmark and we can create a link
                            breadcrumb = "" + entity.title;
                            entity_collections = push_to_collection(entity_collections, folder_first_index, breadcrumb, bookmark_first);
                        }
                    }
                }
                else {
                    // initialize if this is the first bookmark
                    if (entity_collections[entity_index] == undefined) {
                        entity_collections[entity_index] = create_collection(location_1.title);
                    }
                    // This is a bookmark and we can create a link
                    breadcrumb = "";
                    entity_collections = push_to_collection(entity_collections, entity_index, breadcrumb, location_1);
                }
            }
        }
    }
    return entity_collections;
}
fs.readFile('./data/firefox_bookmarks_export.json', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var navigation_tabs = [{
            name: 'home',
            icon: 'Home',
            entity_collections: parse_file(data)
        }];
    fs.writeFile('./data/tabs.json', JSON.stringify(navigation_tabs), function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
});

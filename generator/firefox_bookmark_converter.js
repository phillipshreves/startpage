"use strict";
exports.__esModule = true;
// Link Generator
//
//
var fs = require('fs');
// HTML functions
function create_bookmark(_a) {
    var title = _a.title, description = _a.title, link = _a.uri, image = _a.iconuri;
    //HTMl goes here
    var bookmark = "<li class=\"collection-item avatar\" id=\"" + title + "\">" +
        ("<a href=\"" + link + "\">") +
        ("<img src=\"" + image + "\" alt=\"" + title + "\" class=\"circle\">") +
        ("<span class=\"title\">" + title + "</span>") +
        ("<span class=\"description\">" + description + "</span>") +
        "</a>" +
        "</li>";
    return bookmark;
}
function parse_file(file) {
    var bookmarks = JSON.parse(file);
    var index_page = '';
    // Parse out data
    // loop over root children
    for (var _i = 0, _a = bookmarks.children; _i < _a.length; _i++) {
        var location_1 = _a[_i];
        var bookmark_top_list = '';
        if (location_1.title == 'toolbar') {
            // loop over toolbar children
            for (var _b = 0, _c = location_1.children; _b < _c.length; _b++) {
                var entity = _c[_b];
                var bookmark_first_list = '';
                // Check if this is a folder or a bookmark
                if (entity.children != undefined) {
                    // loop over folders/top level bookmarks
                    for (var _d = 0, _e = entity.children; _d < _e.length; _d++) {
                        var bookmark_first = _e[_d];
                        var bookmark_second_list = '';
                        if (bookmark_first.children != undefined) {
                            // loop over folders/first level bookmarks
                            for (var _f = 0, _g = bookmark_first.children; _f < _g.length; _f++) {
                                var bookmark_second = _g[_f];
                                var bookmark_third_list = '';
                                if (bookmark_second.children != undefined) {
                                    //loop over folders/second level bookmarks
                                    for (var _h = 0, _j = bookmark_second.children; _h < _j.length; _h++) {
                                        var bookmark_third = _j[_h];
                                        var bookmark_fourth_list = '';
                                        if (bookmark_third.children != undefined) {
                                            //loop over third level bookmarks
                                            for (var _k = 0, _l = bookmark_third.children; _k < _l.length; _k++) {
                                                var bookmark_fourth = _l[_k];
                                                // this is as deep as we go for now
                                                // parse the bookmark
                                                bookmark_fourth_list = bookmark_fourth_list + create_bookmark(bookmark_fourth);
                                            }
                                        }
                                        else {
                                            // This is a bookmark and we can create a link
                                            bookmark_third_list = bookmark_third_list + create_bookmark(bookmark_third);
                                        }
                                        index_page = bookmark_third_list + bookmark_fourth_list;
                                    }
                                }
                                else {
                                    // This is a bookmark and we can create a link
                                    bookmark_second_list = bookmark_second_list + create_bookmark(bookmark_second);
                                }
                                index_page = index_page + bookmark_second_list;
                            }
                        }
                        else {
                            // This is a bookmark and we can create a link
                            bookmark_first_list = bookmark_first_list + create_bookmark(bookmark_first);
                        }
                        index_page = index_page + bookmark_first_list;
                    }
                }
                else {
                    // This is a bookmark and we can create a link
                    bookmark_top_list = bookmark_top_list + create_bookmark(entity);
                }
                index_page = index_page + bookmark_top_list;
            }
        }
    }
    console.log(JSON.stringify(index_page));
}
//let navigation_tabs: NavigationTab[];
var navigation_tabs;
navigation_tabs = fs.readFile('./data/tabs.json', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    parse_file(data);
});
/*
fs.writeFile('../output/index.html', index_page, err => {
    if (err) {
        console.error(err)
        return
    }
})
*/ 

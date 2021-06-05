// Link Generator
//
//
const fs = require('fs');
import { NavigationTab, EntityCollection, Entity } from './interfaces';


// HTML functions
function create_bookmark({
    title,
    title:description,
    uri:link,
    iconuri:image
    }) {
    //HTMl goes here
    let bookmark: string = 
    `<li class=\"collection-item avatar\" id=\"${title}\">` + 
        `<a href=\"${link}\">` +
        `<img src=\"${image}\" alt=\"${title}\" class=\"circle\">` +
        `<span class=\"title\">${title}</span>` +
        `<span class=\"description\">${description}</span>` +
        `</a>` + 
    `</li>`;
    return bookmark
}

function parse_file(file){
    let bookmarks = JSON.parse(file);
    let index_page: string = '';

    // Parse out data
    // loop over root children
    for ( let location of bookmarks.children ) {
        let bookmark_top_list: string = '';

        if ( location.title == 'toolbar') {
            // loop over toolbar children
            for ( let entity of location.children ) {
                let bookmark_first_list: string = '';

                // Check if this is a folder or a bookmark
                if ( entity.children != undefined ) {
                    // loop over folders/top level bookmarks
                    for ( let bookmark_first of entity.children ) {
                        let bookmark_second_list: string = '';

                        if ( bookmark_first.children != undefined ) {
                            // loop over folders/first level bookmarks
                            for ( let bookmark_second of bookmark_first.children ) {
                                let bookmark_third_list: string = '';

                                if ( bookmark_second.children != undefined ) {
                                    //loop over folders/second level bookmarks
                                    for ( let bookmark_third of bookmark_second.children ) {
                                        let bookmark_fourth_list: string = '';

                                        if ( bookmark_third.children != undefined ) {
                                            //loop over third level bookmarks
                                            for ( let bookmark_fourth of bookmark_third.children){
                                            // this is as deep as we go for now
                                            // parse the bookmark
                                                bookmark_fourth_list = bookmark_fourth_list + create_bookmark(bookmark_fourth);
                                            }
                                        } else {
                                            // This is a bookmark and we can create a link
                                            bookmark_third_list = bookmark_third_list + create_bookmark(bookmark_third);
                                        }
                                        index_page = bookmark_third_list + bookmark_fourth_list ;

                                    }
                                } else {
                                    // This is a bookmark and we can create a link
                                    bookmark_second_list = bookmark_second_list + create_bookmark(bookmark_second);
                                }
                                index_page = index_page + bookmark_second_list;
                            }
                        } else {
                            // This is a bookmark and we can create a link
                            bookmark_first_list = bookmark_first_list + create_bookmark(bookmark_first);
                        }
                        index_page = index_page + bookmark_first_list;
                    }
                } else {
                    // This is a bookmark and we can create a link
                    bookmark_top_list = bookmark_top_list + create_bookmark(entity);
                }
                index_page = index_page + bookmark_top_list;
            }
        }
    }

    console.log(JSON.stringify(index_page))
}


//let navigation_tabs: NavigationTab[];
let navigation_tabs: any;
navigation_tabs = fs.readFile('./data/tabs.json', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	parse_file(data)
})


/*
fs.writeFile('../output/index.html', index_page, err => {
	if (err) {
		console.error(err)
		return
	}
})
*/
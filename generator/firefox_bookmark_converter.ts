// Link Generator
//
//
const fs = require('fs');


// Structure for links
interface Entity {
    title: string;
    description: string;
    link: string;
    image: string;
};;
// Collection wrapper
interface EntityCollection {
	name: string;
    entity: Entity[];
};
// Structure for navigation tabs 
interface NavigationTab {
	name: string;
    icon: string;
    entity_collections: EntityCollection[];
};
// Navigation wrapper
interface NavigationTabs {
	tabs: NavigationTab[];
};


// Navigation tabs data
let navigation_tabs: NavigationTabs = [{ 
    tabs:[{
		name: "Home",
        icon:"home",
        entity_collections:[{
			name: "test",
			entity: [{
				title: "Nginx Proxy Manager",
				description: "Reverse proxy manager",
				link: "http://reverse-proxy.phillips.work/login",
                image: "../images/icon-nginx-proxy-manager.png"
			}]
		},
        {
            name: "testwo",
            entity: [{
                title: "test",
                description: "test description",
                link: "test link",
                image: "../images/icon-nginx-proxy-manager.png"
            }]
        }]
    }] 
}];

// HTML functions
function create_bookmark(
    title:string,
    description:string,
    link:string,
    image:string
    ) {
        //HTMl goes here
}

let bookmarks_file= fs.readFile('./data/tabs.json', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	data
})

let bookmarks = JSON.parse(bookmarks_file);

// Parse out data
// loop over root children
for ( let location_string in bookmarks.children ) {
	let location = JSON.parse(location_string);

	if ( location.title = 'toolbar') {
        // loop over toolbar children
		for ( let entity_string in location ) {
			let entity = JSON.parse(entity_string);

            // Check if this is a folder or a bookmark
			if ( entity.children != undefined ) {
                // loop over folders/top level bookmarks
				for ( let bookmark_first_string in entity.children ) {
                    let bookmark_first = JSON.parse(bookmark_first_string);

                    if ( bookmark_first.children != undefined ) {
                        // loop over folders/first level bookmarks
                        for ( let bookmark_second_string in bookmark_first.children ) {
                            let bookmark_second = JSON.parse(bookmark_second_string);

                            if ( bookmark_second.children != undefined ) {
                                //loop over folders/second level bookmarks
                                for ( let bookmark_third_string in bookmark_second.children ) {
                                    let bookmark_third = JSON.parse(bookmark_third_string);

                                    if ( bookmark_third.children != undefined ) {
                                        //loop over third level bookmarks
                                        for ( let bookmark_fourth_string in bookmark_third.children){
                                           // this is as deep as we go for now
                                           // parse the bookmark
                                           
                                        }
                                    } else {
                                        // This is a bookmark and we can create a link
                                    }
                                }
                            } else {
                                // This is a bookmark and we can create a link
                            }
                        }
                    } else {
                        // This is a bookmark and we can create a link
                    }
				}
			} else {
                // This is a bookmark and we can create a link
			}
		}
	}
}



fs.writeFile('../output/index.html', index_page, err => {
	if (err) {
		console.error(err)
		return
	}
})
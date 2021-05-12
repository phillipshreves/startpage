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
};
// Collection wrapper
interface EntityCollection {
    [name: string]: Entity[];
};
// Structure for navigation tabs 
interface NavigationTab {
    icon: string;
    entity_collections: EntityCollection;
};
// Navigation wrapper
interface NavigationTabs {
    [name: string]: NavigationTab;
};


// Navigation tabs data
let navigation_tabs: NavigationTabs = { 
    "Home":{
        "icon":"home",
        "entity_collections":{
            "Administration":[
                {
                    title: "Nginx Proxy Manager",
                    description: "Reverse proxy manager",
                    link: "http://reverse-proxy.phillips.work/login",
                    image: "../images/icon-nginx-proxy-manager.png",
                }
            ]
        }
    }
};

let bookmarks_file= fs.readFile('./data/tabs.json', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	data
})

let bookmarks = JSON.parse(bookmarks_file);

// Parse out data
for ( let location_string in bookmarks.children ) {
	let location = JSON.parse(location_string);

	if ( location.title = 'toolbar') {

		for ( let entity_string in location ) {
			let entity = JSON.parse(entity_string);

			if ( entity.children != undefined ) {
				for ( let bookmark_string in entity.children ) {

				}
			} else {

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
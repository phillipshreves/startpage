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


// Navigation tabs examples
let navigation_tabs: NavigationTabs =
{ 
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


//
// Assemble HTML
//

// Navigation header
let nav_element =
    "<div class=\"nav-wrapper\">\r\
        <a href=\"#\" class=\"brand-logo center\">Life is Good</a>\r\
        <ul id=\"nav-mobile\" class=\"right hide-on-small-only\">\r\
            <li><a href=\"#\">To God be the glory.</a></li>\r\
        </ul>\r\
    </div>";

// Navigation tabs
let nav_tabs = "";
for ( let navigation_tabs_key in navigation_tabs){
    let icon = navigation_tabs[navigation_tabs_key].icon;
    nav_tabs = nav_tabs +
        "<li class=\"tab\"><a href=\"#" + navigation_tabs_key + "\"><i class=\"material-icons left\">" + icon + "</i>" + navigation_tabs_key + "</a></li>"
};
nav_element = nav_element +
    "<nav class=\"nav-extended\">\r\
    	<div class=\"nav-content\">\r\
			<ul class=\"tabs tabs-transparent\">\r\
                " + nav_tabs + "\r\
			</ul>\r\
		</div>\r\
	</nav>";


// Tab element
let tab_element: string = "";
for ( let navigation_tabs_key in navigation_tabs){
    let navigation_tab_object = navigation_tabs[navigation_tabs_key];

    let entity_collection_element = "";
    for ( let entity_collection in navigation_tab_object.entity_collections ) {
        let entity_collection_object = navigation_tab_object.entity_collections[entity_collection];

        let entity_element = "";
        for ( let entity_object of entity_collection_object ){
            let { title, description, link, image } = entity_object;
            entity_element = entity_element +
                "<li class=\"collection-item avatar\" id=\"" + title + "\">\r\
                    <a href=\"" + link + "\">\r\
                        <img src=\"" + image + "\" alt=\"" + title + "\" class=\"circle\">\r\
                        <span class=\"title\">" + title + "</span>\r\
                        <span class=\"description\">" + description + "</span>\r\
                    </a>\r\
                </li>"
        }


        // Template for links
        entity_collection_element = entity_collection_element + 
            "<ul class=\"collection with-header\" id=\"" + entity_collection + "\">\r\
                <li class=\"collection-header\"><h4>" + entity_collection + "</h4></li>\r\
                " + entity_element + "\r\
            </ul>";
    };

    tab_element = tab_element +  
		"<div id=\"" + navigation_tabs_key + "\" class=\"col s12\">\r\
			<div class=\"row\">\r\
				<div class=\"col s12 m6 l4\">\r\
                    " + entity_collection_element + "\r\
				</div>\r\
			</div>\r\
		</div>"
};


let body_element = 
	nav_element + 
	"<div class=\"container\">\r\
		<div id=\"work\" class=\"col s12\">\r\
			<div class = \"row\">\r\
				<form class=\"col s12\" id=\"input_text_form\">\r\
					<div class=\"row valign-wrapper\">\r\
						<div class=\"col s2\">\r\
							<a class=\"waves-effect waves-light btn\" onclick=\"formatter(document.getElementById('input_text').value)\">Format</a>\r\
						</div>\r\
						<div class=\"input-field col s10\">\r\
							<input placeholder=\"Input\" id=\"input_text\" type=\"text\">\r\
						</div>\r\
					</div>\r\
					<div class=\"row\">\r\
						<div class=\"input-field col s13\">\r\
							<textarea placeholder=\"Output\" id=\"output_text\" class=\"materialize-textarea\"></textarea>\r\
						</div>\r\
					</div>\r\
				</form>\r\
			</div>\r\
		</div>\r\
		" + tab_element + "\r\
		<div id=\"hustle\" class=\"col s12\">\r\
			<div class=\"row\">\r\
				<div class=\"col s12 m6 l4\">\r\
					<ul class=\"collection with-header\">\r\
						<li class=\"collection-header\"><h4>Online Courses</h4></li>\r\
						<li class=\"collection-item\">\r\
							<i class=\"material-icons\">book</i>\r\
							<span class=\"title\">Entire CS Curriculum on Youtube</span>\r\
						</li>\r\
					</ul>\r\
				</div>\r\
			</div>\r\
		</div>\r\
	</div>"


let index_page: String = 
"<!DOCTYPE html>\r\
<html>\r\
<head>\r\
	<meta charset=\"UTF-8\">\r\
	<title>Startpage</title>\r\
\r\
	<!-- materialize -->\r\
	<script type=\"text/javascript\" src=\"../node_modules/hammerjs/hammer.min.js\"></script>\r\
	<script type=\"text/javascript\" src=\"../node_modules/jquery/dist/jquery.min.js\"></script>\r\
	<script type=\"text/javascript\" src=\"../node_modules/materialize-css/dist/js/materialize.min.js\"></script>\r\
	<link rel=\"stylesheet\" href=\"../src/index.css\">\r\
	<link rel=\"stylesheet\" href=\"../src/materialize.css\">\r\
\r\
	<!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->\r\
	<meta http-equiv=\"Content-Security-Policy\" content=\"script-src 'self' 'unsafe-inline';\" />\r\
\r\
	<!-- mobile device-->\r\
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\r\
</head>\r\
\r\
<body>\r\
    " + body_element + "\r\
	<script>M.AutoInit();</script>\r\
</body>\r\
</html>"


fs.writeFile('./index.html', index_page, err => {
	if (err) {
		console.error(err)
		return
	}
})
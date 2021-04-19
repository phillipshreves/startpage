// Link Generator
//
//

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
    "<div class=\"nav-wrapper\">\
        <a href=\"#\" class=\"brand-logo center\">Life is Good</a>\
        <ul id=\"nav-mobile\" class=\"right hide-on-small-only\">\
            <li><a href=\"#\">To God be the glory.</a></li>\
        </ul>\
    </div>";

for ( let navigation_tabs_key in navigation_tabs){
    let icon = navigation_tabs[navigation_tabs_key].icon;
    nav_element = nav_element +
        "<li class=\"tab\"><a href=\"#" + navigation_tabs_key + "\"><i class=\"material-icons left\">" + icon + "</i>" + navigation_tabs_key + "</a></li>"
};


// Navigation tabs
nav_element = 
    "<nav class=\"nav-extended\">\
    	<div class=\"nav-content\">\
			<ul class=\"tabs tabs-transparent\">\
                " + nav_element + "\
			</ul>\
		</div>\
	</nav>";


// Tab element
let tab_element;
for ( let navigation_tabs_key in navigation_tabs){
    let navigation_tab_object = navigation_tabs[navigation_tabs_key];

    let entity_collection_element = "";
    for ( let entity_collection in navigation_tab_object.entity_collections ) {
        let entity_collection_object = navigation_tab_object.entity_collections[entity_collection];

        let entity_element = "";
        for ( let entity_object of entity_collection_object ){
            let { title, description, link, image } = entity_object;
            entity_element = entity_element +
                "<li class=\"collection-item avatar\" id=\"" + title + "\">\
                    <a href=\"" + link + "\">\
                        <img src=\"" + image + "\" alt=\"" + title + "\" class=\"circle\">\
                        <span class=\"title\">" + title + "</span>\
                        <span class=\"description\">" + description + "</span>\
                    </a>\
                </li>"
        }


        // Template for links
        entity_collection_element = entity_collection_element + 
            "<ul class=\"collection with-header\" id=\"" + entity_collection + "\">\
                <li class=\"collection-header\"><h4>" + entity_collection + "</h4></li>\
                " + entity_element + "\
            </ul>";
    };

    tab_element = tab_element +  
		"<div id=\"" + navigation_tabs_key + "\" class=\"col s12\">\
			<div class=\"row\">\
				<div class=\"col s12 m6 l4\">\
                    " + entity_collection_element + "\
				</div>\
			</div>\
		</div>"
};


let body_element = 
	nav_element + 
	"<div class=\"container\">\
		<div id=\"work\" class=\"col s12\">\
			<div class = \"row\">\
				<form class=\"col s12\" id=\"input_text_form\">\
					<div class=\"row valign-wrapper\">\
						<div class=\"col s2\">\
							<a class=\"waves-effect waves-light btn\" onclick=\"formatter(document.getElementById('input_text').value)\">Format</a>\
						</div>\
						<div class=\"input-field col s10\">\
							<input placeholder=\"Input\" id=\"input_text\" type=\"text\">\
						</div>\
					</div>\
					<div class=\"row\">\
						<div class=\"input-field col s13\">\
							<textarea placeholder=\"Output\" id=\"output_text\" class=\"materialize-textarea\"></textarea>\
						</div>\
					</div>\
				</form>\
			</div>\
		</div>\
		" + tab_element + "\
		<div id=\"hustle\" class=\"col s12\">\
			<div class=\"row\">\
				<div class=\"col s12 m6 l4\">\
					<ul class=\"collection with-header\">\
						<li class=\"collection-header\"><h4>Online Courses</h4></li>\
						<li class=\"collection-item\">\
							<i class=\"material-icons\">book</i>\
							<span class=\"title\">Entire CS Curriculum on Youtube</span>\
						</li>\
					</ul>\
				</div>\
			</div>\
		</div>\
	</div>"


let index_page: String = 
"<!DOCTYPE html>\
<html>\
<head>\
	<meta charset=\"UTF-8\">\
	<title>Startpage</title>\
\
	<!-- materialize -->\
	<script type=\"text/javascript\" src=\"../node_modules/hammerjs/hammer.min.js\"></script>\
	<script type=\"text/javascript\" src=\"../node_modules/jquery/dist/jquery.min.js\"></script>\
	<script type=\"text/javascript\" src=\"../node_modules/materialize-css/dist/js/materialize.min.js\"></script>\
	<link rel=\"stylesheet\" href=\"../src/index.css\">\
	<link rel=\"stylesheet\" href=\"../src/materialize.css\">\
\
	<!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->\
	<meta http-equiv=\"Content-Security-Policy\" content=\"script-src 'self' 'unsafe-inline';\" />\
\
	<!-- mobile device-->\
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\
</head>\
\
<body>\
    " + body_element + "\
	<script>M.AutoInit();</script>\
</body>\
</html>"
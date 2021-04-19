// Link Generator
//
//
var fs = require('fs');
;
;
;
;
// Navigation tabs examples
var navigation_tabs = {
    "Home": {
        "icon": "home",
        "entity_collections": {
            "Administration": [
                {
                    title: "Nginx Proxy Manager",
                    description: "Reverse proxy manager",
                    link: "http://reverse-proxy.phillips.work/login",
                    image: "../images/icon-nginx-proxy-manager.png"
                }
            ]
        }
    }
};
//
// Assemble HTML
//
// Navigation header
var nav_element = "<div class=\"nav-wrapper\">\r\
        <a href=\"#\" class=\"brand-logo center\">Life is Good</a>\r\
        <ul id=\"nav-mobile\" class=\"right hide-on-small-only\">\r\
            <li><a href=\"#\">To God be the glory.</a></li>\r\
        </ul>\r\
    </div>";
// Navigation tabs
var nav_tabs = "";
for (var navigation_tabs_key in navigation_tabs) {
    var icon = navigation_tabs[navigation_tabs_key].icon;
    nav_tabs = nav_tabs +
        "<li class=\"tab\"><a href=\"#" + navigation_tabs_key + "\"><i class=\"material-icons left\">" + icon + "</i>" + navigation_tabs_key + "</a></li>";
}
;
nav_element = nav_element +
    "<nav class=\"nav-extended\">\r\
    	<div class=\"nav-content\">\r\
			<ul class=\"tabs tabs-transparent\">\r\
                " + nav_tabs + "\r\
			</ul>\r\
		</div>\r\
	</nav>";
// Tab element
var tab_element = "";
for (var navigation_tabs_key in navigation_tabs) {
    var navigation_tab_object = navigation_tabs[navigation_tabs_key];
    var entity_collection_element = "";
    for (var entity_collection in navigation_tab_object.entity_collections) {
        var entity_collection_object = navigation_tab_object.entity_collections[entity_collection];
        var entity_element = "";
        for (var _i = 0, entity_collection_object_1 = entity_collection_object; _i < entity_collection_object_1.length; _i++) {
            var entity_object = entity_collection_object_1[_i];
            var title = entity_object.title, description = entity_object.description, link = entity_object.link, image = entity_object.image;
            entity_element = entity_element +
                "<li class=\"collection-item avatar\" id=\"" + title + "\">\r\
                    <a href=\"" + link + "\">\r\
                        <img src=\"" + image + "\" alt=\"" + title + "\" class=\"circle\">\r\
                        <span class=\"title\">" + title + "</span>\r\
                        <span class=\"description\">" + description + "</span>\r\
                    </a>\r\
                </li>";
        }
        // Template for links
        entity_collection_element = entity_collection_element +
            "<ul class=\"collection with-header\" id=\"" + entity_collection + "\">\r\
                <li class=\"collection-header\"><h4>" + entity_collection + "</h4></li>\r\
                " + entity_element + "\r\
            </ul>";
    }
    ;
    tab_element = tab_element +
        "<div id=\"" + navigation_tabs_key + "\" class=\"col s12\">\r\
			<div class=\"row\">\r\
				<div class=\"col s12 m6 l4\">\r\
                    " + entity_collection_element + "\r\
				</div>\r\
			</div>\r\
		</div>";
}
;
var body_element = nav_element +
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
	</div>";
var index_page = "<!DOCTYPE html>\r\
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
</html>";
fs.writeFile('./index.html', index_page, function (err) {
    if (err) {
        console.error(err);
        return;
    }
});

// Structure for links
interface Entity {
    title: string;
    description: string;
    breadcrumb: string;
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

export { NavigationTab, EntityCollection, Entity };


// Navigation tabs data
//let navigation_tabs: NavigationTab[] = [{
//    name: "Home",
//    icon: "home",
//    entity_collections: [{
//        name: "test",
//        entity: [{
//            title: "Nginx Proxy Manager",
//            description: "Reverse proxy manager",
//            link: "http://reverse-proxy.phillips.work/login",
//            image: "../images/icon-nginx-proxy-manager.png"
//        }]
//    },
//    {
//        name: "testwo",
//        entity: [{
//            title: "test",
//            description: "test description",
//            link: "test link",
//            image: "../images/icon-nginx-proxy-manager.png"
//        }]
//    }]
//}];
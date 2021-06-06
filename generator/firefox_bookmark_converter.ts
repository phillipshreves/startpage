// Link Generator
//
//
const fs = require('fs');
import { NavigationTab, EntityCollection, Entity } from './interfaces';


function push_to_collection(
    collection: EntityCollection[],
    collection_index: number, 
    breadcrumb: string,
    { 
        title,
        uri: description,
        uri: link,
        iconuri: image
    }
){
    collection[collection_index].entity.push({
        title, 
        description,
        breadcrumb,
        link,
        image
    })
    return collection;
};

function create_collection(name){
    let collection: EntityCollection = {
        name,
        entity: []
    };

    return collection
};


function parse_file(file){
    let bookmarks = JSON.parse(file);
    let entity_collections: EntityCollection[] = [];
    let breadcrumb: string;

    // Parse out data
    // loop over root children
    for ( let location of bookmarks.children ) {
        if ( location.title == 'toolbar') {
            let entity_index = entity_collections.length;


            // loop over toolbar children
            for ( let entity of location.children ) {
                // Check if this is a folder or a bookmark
                if ( entity.children != undefined ) {
                    let folder_first_index = entity_collections.length;
                    

                    // loop over folders/top level bookmarks
                    for ( let bookmark_first of entity.children ) {
                        if ( bookmark_first.children != undefined ) {
                            let folder_second_index = entity_collections.length;


                            // loop over folders/first level bookmarks
                            for ( let bookmark_second of bookmark_first.children ) {
                                if ( bookmark_second.children != undefined ) {
                                    let folder_third_index = entity_collections.length;


                                    //loop over folders/second level bookmarks
                                    for ( let bookmark_third of bookmark_second.children ) {
                                        if ( bookmark_third.children != undefined ) {
                                            let folder_fourth_index = entity_collections.length;


                                            //loop over third level bookmarks
                                            for ( let bookmark_fourth of bookmark_third.children){
                                                // this is as deep as we go for now

                                                // initialize if this is the first bookmark
                                                if(entity_collections[folder_second_index] == undefined){
                                                    entity_collections[folder_fourth_index] = create_collection(bookmark_third.title);
                                                }

                                                // parse the bookmark
                                                breadcrumb = `${entity.title}.${bookmark_first.title}.${bookmark_second.title}.${bookmark_third.title}`;
                                                entity_collections = push_to_collection(entity_collections,folder_fourth_index,breadcrumb,bookmark_fourth)
                                            }

                                        } else {
                                            // initialize if this is the first bookmark
                                            if(entity_collections[folder_second_index] == undefined){
                                                entity_collections[folder_third_index] = create_collection(bookmark_second.title);
                                            }

                                            // This is a bookmark and we can create a link
                                            breadcrumb = `${entity.title}.${bookmark_first.title}.${bookmark_second.title}`;
                                            entity_collections = push_to_collection(entity_collections,folder_third_index,breadcrumb,bookmark_third)
                                        }
                                    }


                                } else {
                                    // initialize if this is the first bookmark
                                    if(entity_collections[folder_second_index] == undefined){
                                        entity_collections[folder_second_index] = create_collection(bookmark_first.title);
                                    }

                                    // This is a bookmark and we can create a link
                                    breadcrumb = `${entity.title}.${bookmark_first.title}`;
                                    entity_collections = push_to_collection(entity_collections,folder_second_index,breadcrumb,bookmark_second)
                                }
                            }
                        } else {
                            // initialize if this is the first bookmark
                            if(entity_collections[folder_first_index] == undefined){
                                entity_collections[folder_first_index] = create_collection(entity.title);
                            }

                            // This is a bookmark and we can create a link
                            breadcrumb = `${entity.title}`;
                            entity_collections = push_to_collection(entity_collections,folder_first_index,breadcrumb,bookmark_first)
                        }
                    }
                } else {
                    // initialize if this is the first bookmark
                    if(entity_collections[entity_index] == undefined){
                        entity_collections[entity_index] = create_collection(location.title);
                    }

                    // This is a bookmark and we can create a link
                    breadcrumb = `` ;
                    entity_collections = push_to_collection(entity_collections,entity_index,breadcrumb,location)
                }
            }
        }
    }

    return entity_collections
}



fs.readFile('./data/firefox_bookmarks_export.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    let navigation_tabs: NavigationTab[] = [{
        name: 'home',
        icon: 'Home',
        entity_collections: parse_file(data)
    }];

    fs.writeFile('./data/tabs.json', JSON.stringify(navigation_tabs), err => {
        if (err) {
            console.error(err)
            return
        }
    })
})



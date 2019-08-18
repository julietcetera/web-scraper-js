const request = require('request-promise');

const jsdom = require('jsdom');

const {
    JSDOM
} = jsdom;

exports.scrape = async (params) => {

    let body = await request(params.url);

    if (body === null || body === undefined)
        return;
    
    const vdom = new JSDOM(body);
    let $ = require('jquery')(vdom.window);

    let sample = {};

    /* set of items where a quantity of one is expected */
    const singletonTags = params.tags.singleton; 

    Object.keys(singletonTags.text).forEach(tag => {

        sample[tag] = $(singletonTags.text[tag]).text();
    });

    Object.keys(singletonTags.attribute).forEach(tag => {

        let query = singletonTags.attribute[tag];
        sample[tag] = $(query[0]).attr(query[1]);
    });


    /* set of items where a quantity of >1 is possible */
    const collectionTags = params.tags.collection;

    Object.keys(collectionTags.text).forEach(tag => {

        sample[tag] = [];

        $(collectionTags.text[tag]).each((index, item) => {
            sample[tag].push(item.text);
        });
    });

    Object.keys(collectionTags.attribute).forEach(tag => {

        sample[tag] = [];

        let query = collectionTags.attribute[tag];
        $(query[0]).each(function () { // no syntactic sugar here (won't work)!
            sample[tag].push($(this).attr(query[1]));
        });
    });

    return sample;
}

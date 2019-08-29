const request = require('request-promise');

const jsdom = require('jsdom');

const {
    JSDOM
} = jsdom;

/*
 * TODO: if names are the same merge?
 */
exports.scrape = async (params) => {

    if (!params) {
       throw new Error('Parameters missing!');
    }

    if (!params.url || !params.tags) {
       throw new Error('Parameters missing!');
    }

    const {
        url,
        tags
    } = params;

    let body = await request(params.url);

    if (body === null || body === undefined)
        return;
    
    const vdom = new JSDOM(body);
    let $ = require('jquery')(vdom.window);

    let sample = {};

    /* set of items where a quantity of one is expected */
    if (tags.singleton) {

        Object.keys(tags.singleton.text).forEach(tag => {

            sample[tag] = $(tags.singleton.text[tag]).text();
        });

        Object.keys(tags.singleton.attribute).forEach(tag => {

            let query = tags.singleton.attribute[tag];
            sample[tag] = $(query[0]).attr(query[1]);
        });
    }


    /* set of items where a quantity of >1 is possible */
    if (tags.collection) {

        Object.keys(tags.collection.text).forEach(tag => {

            sample[tag] = [];
            $(tags.collection.text[tag]).each(function(index, item) {
                sample[tag].push(item.textContent);
            });
        });

        Object.keys(tags.collection.attribute).forEach(tag => {

            sample[tag] = [];
            let query = tags.collection.attribute[tag];
            $(query[0]).each(function() { // no syntactic sugar here (won't work)!
                sample[tag].push($(this).attr(query[1]));
            });
        });
    }

    /* every item specified is simply put into an array */
    if (tags.text) { 

        Object.keys(tags.text).forEach(tag => {

            sample[tag] = [];
            $(tags.text[tag]).each(function(index, item) {

                sample[tag].push(item.textContent);
            });
        });
    }

    if (tags.attribute) {

        Object.keys(tags.attribute).forEach(tag => {

            sample[tag] = [];

            let query = tags.attribute[tag];
            $(query[0]).each(function() { // no syntactic sugar here (won't work)!
                sample[tag].push($(this).attr(query[1]));
            });
        });
    }

    return sample;
}

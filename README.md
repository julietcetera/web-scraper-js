# web-scraper-js

A lightweight, no BS, simple to use web scraping library written in node, which simply does its
job, nothing more, nothing less.

# Disclaimer

Please make sure to use this package within legal and ethical boundaries.

# Install

`npm install --save web-scraper-js`

# Usage

You'll have to specifiy if the data you want to scrape is (rendered) text or attribute values.

## scrape([params])

This is the only functionality this package provides.

|parameter        |type    |description                                           |required |
|:----------------|:------:|:-----------------------------------------------------|:-------:|
|`url            `|`string`|The url from which to scrape from                     |`true   `|
|`tags           `|`object`|An object, yielding the information on what to scrape |`true   `|
|`tags.text      `|`object`|Text elements to be scraped                           |`false  `|
|`tags.attribute `|`object`|Attributes of elements to be scraped                  |`false  `|
|`tags.singleton `|`object`|Category of content that only occurs once             |`false  `|
|`tags.collection`|`object`|Category of content that can occur multiple times     |`false  `|

In order to successfully scrape something you'll have to provide selectors.
Since you're reading this I assume you know what that is and just go on.

The `tags.text` and `tags.attribute` objects take different key value pairs.

### tags.text

This object takes key value pairs of the form: `{'name': 'selector'}`, where the key is a name of
your choice.
However, it should have a meaningful name, since you will be accessing it later in the response.
Also as of now you should not declare the same names in `tags.text` and `tags.attribute` since
one will overwrite the other.

The selector part should be obvious, typically browsers allow you to just copy them using their
dev tools.

### tags.attribute

This object takes key value pairs of the form: `{'name': ['selector', 'attribute']}`.

This time the value is a tuple containing the selector and the attribute from which to collect
data.
Since an element can have multiple values you'll have to declare which one to use, simple as that
.

### tags.collection and tags.singleton

These are objects to provide more meaning to the search, where singleton tells the code that
these items should only occur once, whereas collection means there might be multiple entries of
the same structure.

Both contain objects structured like the previous `tags.text` and `tags.attribute` objects, as
you can see in the examples.

### Examples

The following examples scrape a couple of details about the movie Pulp Fiction from IMDb.

```js
(async () => {
    
    let result = await webscraper.scrape({
        url: 'https://www.imdb.com/title/tt0110912/',
        tags: {
            text: {
                "movie-rating-value": 'span[itemprop="ratingValue"]',
                "movie-character": ".character a"
            },
            attribute: {
                "movie-title": ["meta[property='og:title']", "content"],
                "movie-actor": [".primary_photo > a > img", "alt"]
            }
        }
    });

    console.log(result);
})();
```

The code above will print the follwing output:

```json
{
  "movie-rating-value": [ "8.9" ],
  "movie-character": [
     "Pumpkin", "Honey Bunny", "Waitress", //...
   ],
  "movie-title": [ "Pulp Fiction (1994) - IMDb" ],
  "movie-actor": [
     "Tim Roth", "Amanda Plummer", "Laura Lovelace", //...
   ]
}
```

As you can see it's a simple object, using your declared names as keys and, respectively, the
results of their selectors inside an array since there can be multiple results for one selector.

There also is a more semantically sensitive way to declare the contents you want to have scraped.
With this method you declare if the respective elements should occure just once (singleton) or if
there might be more than one elements containing the same sort of type.

```js
let webscraper = require('web-scraper-js');

(async () => {
    
    let result = await webscraper.scrape({
        url: 'https://www.imdb.com/title/tt0110912/',
        tags: {
            singleton: {
                text: {
                    "movie-rating-value": 'span[itemprop="ratingValue"]'
                },
                attribute: {
                    "movie-title": ["meta[property='og:title']", "content"]
                }
            },
            collection: {
                text: {
                    "movie-character": ".character a"
                },
                attribute: {
                    "movie-actor": [".primary_photo > a > img", "alt"]
                }
            }
        }
    });

    console.log(result);

})();
```

For the elements declared as singleton, an object will be returned, an array for collection type
elements, respectively.

```json
{
  "movie-rating-value": "8.9",
  "movie-character": [
     "Pumpkin", "Honey Bunny", "Waitress", //...
   ],
  "movie-title": "Pulp Fiction (1994) - IMDb",
  "movie-actor": [
     "Tim Roth", "Amanda Plummer", "Laura Lovelace", //...
   ]
}
```

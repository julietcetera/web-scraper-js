# web-scraper-js

A lightweight and simple to use web scraping library written in node.

# Disclaimer

Please make sure to use this package within legal and ethical boundaries.

# Install

npm install --save web-scraper-js

# Example

This scrapes a couple of details about the movie Pulp Fiction from IMDb.

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

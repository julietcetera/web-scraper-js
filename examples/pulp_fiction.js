let webscraper = require('../index.js');

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

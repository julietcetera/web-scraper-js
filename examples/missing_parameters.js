let webscraper = require('../index.js');

(async () => {
    
    try {
        let result = await webscraper.scrape({ url: 'url' });
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

(async () => {
    
    try {
        let result = await webscraper.scrape({ tags: {} });
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

(async () => {
    
    try {
        let result = await webscraper.scrape();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();

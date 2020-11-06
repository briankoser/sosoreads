const sosoreads = require('./sosoreads');



// getBooks returns 1 (example test)
const options = { 
    "goodreads_developer_key": 'YOUR_GOODREADS_DEVELOPER_KEY',
    "oauth_token": "YOUR_OAUTH_TOKEN"
};
const api = sosoreads(options);
const getBooksOptions = {
    "searchQuery": "iliad"
};

test('getBooks returns 1', () => {
    return api.getBooks(getBooksOptions).then(data => {
        expect(data).toBe(1);
    });
});
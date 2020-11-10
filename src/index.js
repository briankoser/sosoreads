const sosoreads = require('./sosoreads');



// test
const options = {
    "goodreads_developer_key": 'YOUR_GOODREADS_DEVELOPER_KEY',
    "oauth_token": "YOUR_OAUTH_TOKEN"
};
const api = sosoreads(options);

const booksByUserOptions = {
    "userId": "4812558",
    "paging": {
        "count": 3,
        "number": 1
    },
    "shelf": "read"
};

api.getBooksByUser(booksByUserOptions);



module.exports = sosoreads;
const sosoreads = require('./sosoreads');



// test
const options = {
    "goodreads_developer_key": 'YOUR_GOODREADS_DEVELOPER_KEY',
    "oauth_token": "YOUR_OAUTH_TOKEN"
};
const api = sosoreads(options);

const getAuthorOptions = {
    "authorId": "2687"
};

api.getAuthor(getAuthorOptions).then();



module.exports = sosoreads;
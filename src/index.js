const sosoreads = require('./sosoreads');



// test
const options = {
    "goodreads_developer_key": "YOUR_GOODREADS_DEVELOPER_KEY",
    "oauth_token": "YOUR_OAUTH_TOKEN"
};
const api = sosoreads(options);

const reviewsOptions = {
    "userId": "4812558",
    "paging": {
        "count": 3,
        "number": 1
    },
    "shelf": "read"
};

api.getReviews(reviewsOptions).then(function(reviews) { console.log(JSON.stringify(reviews))});



module.exports = sosoreads;
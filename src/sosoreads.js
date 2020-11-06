const config = require('./config.json');
// TODO jsdoc comments
// TODO axios for http requests
// TODO xml2js for xml parsing

const Sosoreads = function(options) {
    if (!options || !options.goodreads_developer_key) throw new Error('Goodreads API developer key is required.');
  
    let getAuthor = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getBook = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getBooks = function(options) {
        console.log('Not implemented')
        return Promise.resolve(1);
    }

    let getNotifications = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getReviews = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getSeries = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getShelves = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getUser = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }
  
    return {
        getAuthor,
        getBook,
        getBooks,
        getNotifications,
        getReviews,
        getSeries,
        getShelves,
        getUser,
    };
};

module.exports = Sosoreads;
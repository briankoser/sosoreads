const config = require('./config.json');

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
    
    /**
     * Retrieves a collection of Books from Goodreads.
     * @param {Object} options - Options for retrieving Books
     * @param {string} [options.authorId] - Goodreads Author ID. If the consumer provides authorId, userId and searchQuery will be ignored.
     * @param {string} [options.searchQuery] - Query text to match against the user's books. Consumer must provide either userId or searchQuery (or both).
     * @param {string} [options.shelf] - Goodreads shelf from which to retrieve books. Only used if userId is provided.
     * @param {string} [options.userId] - Goodreads User ID. Consumer must provide either userId or searchQuery (or both).
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of books to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of books to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is asc)
     */
    let getBooks = function(options) {
        // reviews.list
        // author.books
        // search.books

        // create goodreads request from options
        // request goodreads (axios)
        // transform xml to json (xml2js)
        // transform json to response
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
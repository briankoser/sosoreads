const axios = require('axios');

const config = require('./config.json');
const booksByUser = require('./resources/booksByUser')();

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
     * @param {string} options.searchQuery - Query text with which to search books.
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of books to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of books to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is asc)
     * @returns {Promise} Promise object representing an array of Sosoreads Book objects
     */
    let getBooks = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    /**
     * Retrieves a collection of Books from Goodreads by Author.
     * @param {Object} options - Options for retrieving Books
     * @param {string} options.authorId - Goodreads Author ID
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of books to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of books to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is asc)
     * @returns {Promise} Promise object representing an array of Sosoreads Book objects
     */
    let getBooksByAuthor = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    /**
     * Retrieves a collection of Books from Goodreads by User.
     * @param {Object} options - Options for retrieving Books
     * @param {string} options.userId - Goodreads User ID
     * @param {string} [options.searchQuery] - Query text with which to search user's books.
     * @param {string} [options.shelf] - Shelf from which to retrieve books.
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of books to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of books to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is asc)
     * @returns {Promise} Promise object representing an array of Sosoreads Book objects
     */
    let getBooksByUser = function(options) {
        booksByUser.validateOptions(options);
        
        let requestParams = booksByUser.getRequestParams(options);
        requestParams.key = options.goodreads_developer_key;

        let url = `${config.goodreadsUrl}/${config.booksByUser.url}`;
        axios.get(url, {
            params: requestParams
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
          });
        
        // transform xml to json (xml2js)
        // transform json to response
        // error handling
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
        getBooksByAuthor,
        getBooksByUser,
        getBooks,
        getNotifications,
        getReviews,
        getSeries,
        getShelves,
        getUser,
    };
};

module.exports = Sosoreads;
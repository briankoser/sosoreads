const axios = require('axios');
const xml2js = require('xml2js');

const objectUtilities = require('./utilities/ObjectUtilities')();
const reviews = require('./resources/reviews')();

const Sosoreads = function(options) {
    let globalOptions = options;
    if (!globalOptions || !globalOptions.goodreads_developer_key) throw new Error('Goodreads API developer key is required.');
    
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

    let getNotifications = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    let getReview = function(options) {
        console.log('Not implemented')
        return Promise.resolve();
    }

    /**
     * Retrieves a collection of Reviews from Goodreads by User.
     * @param {Object} options - Options for retrieving Reviews
     * @param {string} options.userId - Goodreads User ID
     * @param {string} [options.searchQuery] - Query text with which to search user's reviews.
     * @param {string} [options.shelf] - Shelf from which to retrieve reviews.
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of reviews to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of reviews to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is asc)
     * @returns {Promise} Promise object representing an array of Sosoreads Review objects
     */
    let getReviews = function(options) {
        return get(reviews, options);
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

    /**
     * Retrieves a resource from Goodreads.
     * @param {Object} resource - The code for handling the Sosoreads resource
     * @param {Object} options - Options for retrieving the resource
     * @returns {Promise} Promise object representing one or many Sosoreads resource objects
     */
    let get = function(resource, options) {
        resource.validateOptions(options);
        
        let requestParams = resource.getRequestParams(options);
        requestParams.key = globalOptions.goodreads_developer_key;
        let url = resource.getUrl(options);
        
        return axios.get(url, {
            params: requestParams
        })
        .then(response => xml2js.parseStringPromise(response.data))
        .then(result => resource.goodreadsToResponse(result))
        .then(result => objectUtilities.removeFalsyProperties(result))
        .catch(error => {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
                if (response.status === 401) 
                    throw new Error('Goodreads developer key is invalid');
                else
                    throw new Error('Goodreads processing error');
            } else if (error.request) {
                console.log(error.request);
                throw new Error('Goodreads did not respond')
            } else {
                console.log('Sosoreads Error', error.message);
            }
            console.log(error.config);
        });
    }

    return {
        getAuthor,
        getBook,
        getBooksByAuthor,
        getBooks,
        getNotifications,
        getReview,
        getReviews,
        getSeries,
        getShelves,
        getUser,
    };
};

module.exports = Sosoreads;
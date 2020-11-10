const config = require('../config.json');

const BooksByUser = function() {
    let validSortFields = ['title', 'author', 'cover', 'rating', 'year_pub', 'date_pub', 'date_pub_edition', 'date_started', 'date_read', 'date_updated', 'date_added', 'recommender', 'avg_rating', 'num_ratings', 'review', 'read_count', 'votes', 'random', 'comments', 'notes', 'isbn', 'isbn13', 'asin', 'num_pages', 'format', 'position', 'shelves', 'owned', 'date_purchased', 'purchase_location', 'condition'];
    let validSortOrders = [config.ascending, config.descending];

    /**
     * Creates Goodreads request parameters for retrieving a collection of Books from Goodreads by User.
     * @param {Object} options - Options for retrieving Books
     * @param {string} options.userId - Goodreads User ID
     * @param {string} [options.searchQuery] - Query text with which to search user's books.
     * @param {string} [options.shelf] - Shelf from which to retrieve books.
     * @param {string} [options.paging] - Options for paging results
     * @param {int} [options.paging.count] - Number of books to retrieve. Supported options: 1-200
     * @param {int} [options.paging.number] - Page of books to retrieve.
     * @param {string} [options.sort] - Options for sorting results
     * @param {string} [options.sort.field] - Field to sort by. Supported options: title, author, cover, rating, year_pub, date_pub, date_pub_edition, date_started, date_read, date_updated, date_added, recommender, avg_rating, num_ratings, review, read_count, votes, random, comments, notes, isbn, isbn13, asin, num_pages, format, position, shelves, owned, date_purchased, purchase_location, condition (default is date_updated)
     * @param {string} [options.sort.order] - Direction to sort. Supported options: asc, desc (default is desc)
     * @returns {Object} Goodreads request for retrieving a collection of Books from Goodreads by User.
     */
    let getRequestParams = function(options) {
        let params = {
            "v": 2,
            "id": options.userId,
            "shelf": options.shelf,
            "sort": options.sort?.field ?? config.booksByUser.defaultSortField,
            "search[query]": options.searchQuery,
            "order": options.sort?.order == config.ascending ? config.ascendingGoodreads : config.descendingGoodreads,
            "page": options.paging?.number,
            "per_page": options.paging?.count
        };

        return params;
    };

    /**
     * Validate consumer-provided options for retrieving a collection of Books from Goodreads by User.
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
     * @returns {boolean} True if options are valid.
     */
    let validateOptions = function(options) {
        if (!options || !options.userId) 
            throw new Error('GetBooksByAuthor: User ID is required.');

        if (options.sort && options.sort.field && !validSortFields.includes(options.sort.field)) 
            throw new Error('GetBooksByAuthor: sort.field is invalid.');

        if (options.sort && options.sort.order && !validSortOrders.includes(options.sort.order)) 
            throw new Error('GetBooksByAuthor: sort.order is invalid.');

        if (options.paging && options.paging.count != undefined && (options.paging.count < 1 || options.paging.count > config.booksByUser.pagingCountLimit))
            throw new Error(`GetBooksByAuthor: paging.count must be between 1-${config.booksByUser.pagingCountLimit}`);

        return true;
    };
  
    return {
        getRequestParams,
        validateOptions,
    };
};

module.exports = BooksByUser;
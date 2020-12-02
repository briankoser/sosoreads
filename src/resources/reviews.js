const config = require('../config.json');
const dateUtilities = require('../utilities/DateUtilities')();
const stringUtilities = require('../utilities/StringUtilities')();

const Reviews = function() {
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
            "sort": options.sort?.field ?? config.reviews.defaultSortField,
            "search[query]": options.searchQuery,
            "order": options.sort?.order == config.ascending ? config.ascendingGoodreads : config.descendingGoodreads,
            "page": options.paging?.number,
            "per_page": options.paging?.count
        };

        return params;
    };

    let goodreadsToResponse = function(goodreadsResponse) {
        let reviews = goodreadsResponse.GoodreadsResponse.reviews[0].review.map(review => {
            return {
                "body": review.body[0]?.trim(),
                "book": {
                    "authors": review.book[0].authors[0].author.map(author => {
                        return {
                            "id": author.id[0],
                            "images": {
                                "large": author.image_url[0]['_']?.trim(),
                                "small": author.small_image_url[0]['_']?.trim()
                            },
                            "name": author.name[0],
                            "ratings": {
                                "average": parseFloat(author.average_rating[0]),
                                "count": parseInt(author.ratings_count[0])
                            },
                            "role": author.role[0] || "author",
                            "url": author.link[0]
                        }
                    }),
                    "descriptions": {
                        "short": stringUtilities.firstSentence(review.book[0].description[0]),
                        "full": review.book[0].description[0]
                    },
                    "edition": {
                        "format": review.book[0].format[0],
                        "pageCount": review.book[0].num_pages[0],
                        "publisher": review.book[0].publisher[0],
                        "year": review.book[0].publication_year[0],
                    },
                    "id": review.book[0].id[0]['_'],
                    "images": {
                        "large": review.book[0].image_url[0],
                        "small": review.book[0].small_image_url[0]
                    },
                    "isbn": typeof(review.book[0].isbn[0]) === 'string' ? review.book[0].isbn[0] : '',
                    "isbn13": typeof(review.book[0].isbn13[0]) === 'string' ? review.book[0].isbn13[0] : '',
                    "owned": !!review.owned[0],
                    "ratings": {
                        "average": parseFloat(review.book[0].average_rating[0]),
                        "count": parseInt(review.book[0].ratings_count[0])
                    },
                    "reviewCount": parseInt(review.book[0].text_reviews_count[0]['_']),
                    "shelves": review.shelves[0].shelf.map(shelf => {
                        return {
                            "exclusive": shelf['$'].exclusive == 'true',
                            "id": shelf['$'].id,
                            "name": shelf['$'].name
                        }
                    }),
                    "title": review.book[0].title_without_series[0],
                    "url": review.book[0].link[0]
                },
                "commentsCount": parseInt(review.comments_count[0]),
                "dates": {
                    "add": dateUtilities.formatDate(review.date_added[0]),
                    "end": dateUtilities.formatDate(review.read_at[0]),
                    "start": dateUtilities.formatDate(review.started_at[0]),
                    "update": dateUtilities.formatDate(review.date_updated[0])
                },
                "id": review.id[0],
                "isSpoiler": review.spoiler_flag[0] == 'true',
                "rating": parseInt(review.rating[0]),
                "readCount": parseInt(review.read_count[0]),
                "recommendedBy": review.recommended_by[0],
                "recommendedFor": review.recommended_for[0],
                "url": review.url[0],
                "votesCount": parseInt(review.votes[0]),
            };
        });

        return {
            "reviews": reviews
        };
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

        if (options.paging && options.paging.count != undefined && (options.paging.count < 1 || options.paging.count > config.reviews.pagingCountLimit))
            throw new Error(`GetBooksByAuthor: paging.count must be between 1-${config.reviews.pagingCountLimit}`);

        return true;
    };
  
    return {
        getRequestParams,
        goodreadsToResponse,
        validateOptions,
    };
};

module.exports = Reviews;
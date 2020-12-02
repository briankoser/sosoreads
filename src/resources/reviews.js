const config = require('../config.json');
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
        // {
        //     "reviews": [{
        //         "body": "I'm a fan of the bad book club podcast 372 Pages We'll Never Get Back, and a fan of many of the books they've covered. I built a fan-fiction Choose Your Own Adventure game (372adventure.com). I wrote a 3,212 word review of Trucking through Time, the highest-rated review of Trucking through Time on Goodreads. We've invited friends over for an Eye of Argon reading party.<br /><br />I don't say any of this to brag. I say it so that you can fully understand the following statement: Moon People is the greatest of them all. I didn't think I could love a 1-star book more than Trucking through Time, but I was wrong. So very wrong.",
        //         "book": {
        //             "authors": [{
        //                 "id": "2975072",
        //                 "images": {
        //                     "large": "https://s.gr-assets.com/assets/nophoto/user/u_200x266-e183445fd1a1b5cc7075bb1cf7043306.png",
        //                     "small": "https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png"
        //                 },
        //                 "name": "Dale M. Courtney",
        //                 "ratings": {
        //                     "average": 2.77,
        //                     "count": 135
        //                 },
        //                 "role": "author",
        //                 "url": "https://www.goodreads.com/author/show/2975072.Dale_M_Courtney"
        //             }],
        //             "descriptions": {
        //                 "short": "This Book is based on the turning point for Earth into a new era of space travel and the beginning of the Age of Aquarius.",
        //                 "full": "This Book is based on the turning point for Earth into a new era of space travel and the beginning of the Age of Aquarius. The story focuses on one Man by the Name of David Braymer and his adventures from High school teacher to 1st Science Officer on board the Lunar Base 1 Mobile Base Station and his encounters with Alien Life forms through out our universe and the space Battle of all battles David experiences. I hope you enjoy the many adventures of David Braymer and his conquest in space and our journey into the Age of Aquarius"
        //             },
        //             "edition": {
        //                 "format": "Mass Market Paperback",
        //                 "publisher": "Penguin Classics",
        //                 "year": "2008"
        //             },
        //             "id": "6584471",
        //             "images": {
        //                 "large": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
        //                 "small": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
        //             },
        //             "isbn": "1436372135",
        //             "isbn13": "9781436372138",
        //             "owned": false,
        //             "pageCount": 123,
        //             "publicationYear": "1991",
        //             "ratings": {
        //                 "average": 2.63,
        //                 "count": 120
        //             },
        //             "reviewCount": 49,
        //             "shelves": [
        //                 {
        //                     "exclusive": true,
        //                     "id": "15377251",
        //                     "name": "read"
        //                 }, {
        //                     "exclusive": false,
        //                     "id": "302308344",
        //                     "name": "372-pages"
        //                 }
        //             ],
        //             "title": "Moon People",
        //             "url": "https://www.goodreads.com/book/show/6584471-moon-people"
        //         },
        //         "commentsCount": 0,
        //         "dates": {
        //             "add": "2020-02-16T11:33:07-08:00",
        //             "end": "2020-03-04",
        //             "start": "2020-02-16",
        //             "update": "2020-03-04T19:54:53-08:00"
        //         },
        //         "id": "3193280293",
        //         "isSpoiler": false,
        //         "rating": 1,
        //         "readCount": 1,
        //         "recommendedBy": "372 Pages We'll Never Get Back Podcast",
        //         "recommendedFor": "Fans of bad books",
        //         "url": "https://www.goodreads.com/review/show/3193280293",
        //         "votes": "0"
        //     }
        // }

        let reviews = goodreadsResponse.GoodreadsResponse.reviews[0].review.map(review => {
            return {
                "body": review.body[0],
                "book": {
                    "authors": review.book[0].authors[0].author.map(author => {
                        return {
                            "id": author.id[0],
                            "images": {
                                "large": author.image_url[0]['_'].trim(),
                                "small": author.small_image_url[0]['_'].trim()
                            },
                            "name": author.name[0],
                            "ratings": {
                                "average": author.average_rating[0],
                                "count": author.ratingsCount
                            },
                            "role": author.role[0] || "author",
                            "url": author.link[0]
                        }
                    }),
                    "descriptions": {
                        "short": stringUtilities.firstSentence(review.book[0].description[0]), // todo
                        "full": review.book[0].description[0]
                    },
                    "images": {
                        "large": review.book[0].image_url[0],
                        "small": review.book[0].small_image_url[0]
                    }
                },
                "id": review.id[0],
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
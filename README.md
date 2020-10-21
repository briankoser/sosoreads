# Sosoreads
*Another Node Goodreads wrapper*

Apparently when Amazon acquired Goodreads they decided to ship their [half-built API](https://www.goodreads.com/api) and never finish it. Thanks, Amazon.

So there are lots of wrappers: 
- [Goodreads](https://github.com/sosedoff/goodreads) (Ruby) looks like the most popular.
- [BetterReads](https://github.com/thejessleigh/betterreads) (Python) was my first name idea and looks great. It was built on goodreads2, another Python wrapper.
- I haven't looked at them in-depth yet, but there are a bunch of Node versions: [fff-graphql-goodreads](https://github.com/mpj/fff-graphql-goodreads), [goodreads-api-node](https://github.com/baahrens/goodreads-api-node), [goodreads.js](https://github.com/AnalogJ/goodreads.js), [goodreads-json](https://github.com/rosnovsky/goodreads-json), [goodreads-json-api](https://github.com/myke11j/goodreads-json-api), [Goodreads review JSON export](https://github.com/remy/goodreads), and [node-goodreads](https://github.com/bdickason/node-goodreads). 

## General Notes
My goal with Sosoreads is to provide a clean interface to the book-related resources. However, I will prioritize performance over "purity". For example, if I were building an API from scratch, I would only return authorIds and role with a book; but Sosoreads will also return the additional author information provided by Goodreads. 

I will not implement the social resources (friends, notifications, etc.). 

- v1 - read-only resources
- v2 - write resources (Comments, Reviews (reviews, owned_books), Shelves)
- v3 - resources requiring OAuth (Notifications, Reviews (owned_books), UserUpdates)

Null or empty fields will not be returned.

All dates follow the [ISO_8601](https://en.m.wikipedia.org/wiki/ISO_8601) standard.

The Goodreads API's default page size for paged collections is 30 (the exception is shelves are paged by 100). This page size is not configurable in the Goodreads API (the exception is when searching Books by UserId). However, for simplicity, sosoreads allows a custom page size for all paged collections. Be aware that custom page sizes that overlap the Goodreads page size may require multiple Goodreads API calls behind the scenes, affecting performance.



## Done



## To Do
- [ ] Request/response contracts
- [ ] Basic structure
- [ ] Unit tests
- [ ] Author
- [ ] Book
- [ ] Books
- [ ] Review
- [ ] Series
- [ ] Shelves
- [ ] User
- [ ] Add to npm
- [ ] v2 write resources (Comments, Shelves, UserBook)
- [ ] v3 resources requiring OAuth (Notifications, UserBook, UserUpdates)

### Installation
```
npm install --save sosoreads
const sosoreads = require('sosoreads');
```



### Initialization
```js
const options = {
    "developer_key": 'YOUR_GOODREADS_DEVELOPER_KEY',
    "oauth_token": "YOUR_OAUTH_TOKEN"
};

const api = sosoreads(options);
```



### Author

#### Example Requests
```js
const options = {
    "authorId": "2687"
};

api.getAuthor(options).then(author => {});
```

```js
const options = {
    "authorName": "Simmons"
};

api.getAuthor(options).then(author => {});
```

#### Example Response
```json
{
    "about": "<b>Dan Simmons</b> grew up in various cities and small towns in the Midwest, including Brimfield, Illinois, which was the source of his fictional \"Elm Haven\" in 1991's SUMMER OF NIGHT and 2002's A WINTER HAUNTING.",
    "averageRating": "4.08",
    "booksCount": 188,
    "dates": {
        "born": "1948-04-04",
        "died": "2024-07-09"
    },
    "followerCount": 8641,
    "gender": "male",
    "id": "2687",
    "hometown": "Peoria, Illinois",
    "images": {
        "large": "https://images.gr-assets.com/authors/1427999015p7/2687.jpg",
        "medium": "https://images.gr-assets.com/authors/1427999015p5/2687.jpg",
        "small": "https://images.gr-assets.com/authors/1427999015p2/2687.jpg"
    },
    "influences": [{
            "id": "7415",
            "name": "Harlan Ellison",
            "url": "https://www.goodreads.com/author/show/7415.Harlan_Ellison"
        }, {
            "id": "3389",
            "name": "Stephen King",
            "url": "https://www.goodreads.com/author/show/3389.Stephen_King"
        }],
    "name": "Dan Simmons",
    "ratingsCount": 4184744,
    "url": "https://www.goodreads.com/author/show/2687.Dan_Simmons"
}
```

#### Comments
- For requests, if `authorId` is provided, `authorName` is ignored.
- Calls Goodreads endpoint `book.show` to get `averageRating` and `ratingsCount`.

#### Goodreads API endpoints
- author.show
- book.show
- search.author



### Book

#### Example Requests
```js
const options = {
    "bookId": "117929"
}

api.getBook(options).then(book => {});
```

```js
const options = {
    "isbn": "0140445927"
}

api.getBook(options).then(book => {});
```

#### Example Response
```json
{
    "authors": [{
        "averageRating": "3.81",
        "id": "903",
        "images": {
            "large": "https://images.gr-assets.com/authors/1390672749p7/903.jpg",
            "small": "https://images.gr-assets.com/authors/1390672749p2/903.jpg"
        },
        "name": "Homer",
        "ratingsCount": 1282996,
        "role": "author",
        "url": "https://www.goodreads.com/author/show/903.Homer"
    }, {
        "averageRating": "3.89",
        "id": "1005",
        "images": {
            "large": "https://images.gr-assets.com/authors/1279895687p5/1005.jpg",
            "small": "https://images.gr-assets.com/authors/1279895687p2/1005.jpg"
        },
        "name": "Robert Fagles",
        "ratingsCount": 407366,
        "role": "translator",
        "url": "https://www.goodreads.com/author/show/1005.Robert_Fagles"
    }],
    "descriptions": {
        "short": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem.",
        "full": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem. The verse translation has been hailed by scholars as the new standard, providing an Iliad that delights modern sensibility and aesthetic without sacrificing the grandeur and particular genius of Homer's own style and language. The Iliad is one of the two great epics of Homer, and is typically described as one of the greatest war stories of all time, but to say the Iliad is a war story does not begin to describe the emotional sweep of its action and characters: Achilles, Helen, Hector, and other heroes of Greek myth and history in the tenth and final year of the Greek siege of Troy."
    },
    "id": "117929",
    "images": {
        "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SX98_.jpg",
        "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SY75_.jpg"
    },
    "isbn": "0140445927",
    "isbn13": "9780140445923",
    "originalPublicationYear": "-750",
    "pageCount": 683,
    "popularShelves": [{
        "count": 215075,
        "name": "to-read"        
    }, {
        "count": 15438,
        "name": "currently-reading"        
    }],
    "publisher": "Penguin Classics",
    "ratings": {
        "average": "3.87",
        "count": 346167,
        "distribution": {
            "five": 115210,
            "four": 113155,
            "three": 83415,
            "two": 24967,
            "one": 9420
        }
    },
    "series": [{
        "count": 8,
        "name": "Epic Cycle",
        "positionInSeries": 2
    }],
    "similarBooks": [{
        "author": {
            "id": "919",
            "name": "Virgil",
            "url": "https://www.goodreads.com/author/show/919.Virgil"
        },
        "id": "12914",
        "images": {
            "large": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
            "small": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
        },
        "isbn": "0679729526",
        "isbn13": "9780679729525",
        "pageCount": 442,
        "ratings": {
            "average": "3.87",
            "count": 346167
        },
        "title": "The Aeneid",
        "url": "https://www.goodreads.com/book/show/117929.The_Iliad"
    }, {
        "author": {
            "id": "4699102",
            "name": "Unknown",
            "url": "https://www.goodreads.com/author/show/4699102.Unknown"
        },
        "id": "52357",
        "images": {
            "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327878125l/52357._SX98_.jpg",
            "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327878125l/52357._SY75_.jpg"
        },
        "isbn": "0393320979",
        "isbn13": "9780393320978",
        "pageCount": 245,
        "ratings": {
            "average": "3.87",
            "count": 346167
        },
        "title": "Beowulf",
        "url": "https://www.goodreads.com/book/show/52357.Beowulf"
    }],
    "title": "The Iliad",
    "url": "https://www.goodreads.com/book/show/117929.The_Iliad"
}
```

#### Comments
- For requests, if `bookId` is provided, `isbn` is ignored.
- The possible values for `authors.role`:
  - "author"
  - "translator"
- `description.long` is provided by Goodreads. `description.short` will be the first sentence from the long description.
- `pageCount` and `publisher` are obviously dependent on edition; I don't know how Goodreads determines which edition to provide.
- `popularShelves` will return at most 100 shelves.
- `publicationYear` will be a negative number for books published BC.

#### Goodreads API endpoints
- book.show
- book.show_by_isbn



### Books

#### Example Requests
```js
const options = {
    "authorId": "903",
    "paging": { // optional
        "count": 30,
        "number": 1
    }
}

api.getBooks(options).then(books => {});
```

```js
const options = {
    "searchQuery": "iliad",
    "paging": { // optional
        "count": 30,
        "number": 1
    }
}

api.getBooks(options).then(books => {});
```

```js
const options = {
    "userId": "4812558",
    "paging": {
        "count": 30,
        "number": 1
    },
    "searchQuery": "iliad", // optional
    "shelf": "to-read", // optional
    "sort": { // optional
        "field": "title",
        "order": "desc"
    }
}

api.getBooks(options).then(books => {});
```



#### Example Response
```json
{
    "books": [{
        "authors": [{
            "averageRating": "3.81",
            "id": "903",
            "images": {
                "large": "https://images.gr-assets.com/authors/1390672749p7/903.jpg",
                "small": "https://images.gr-assets.com/authors/1390672749p2/903.jpg"
            },
            "name": "Homer",
            "ratingsCount": 1282996,
            "role": "author",
            "url": "https://www.goodreads.com/author/show/903.Homer"
        }, {
            "averageRating": "3.89",
            "id": "1005",
            "images": {
                "large": "https://images.gr-assets.com/authors/1279895687p5/1005.jpg",
                "small": "https://images.gr-assets.com/authors/1279895687p2/1005.jpg"
            },
            "name": "Robert Fagles",
            "ratingsCount": 407366,
            "role": "translator",
            "url": "https://www.goodreads.com/author/show/1005.Robert_Fagles"
        }],
        "descriptions": {
            "short": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem.",
            "full": "This groundbreaking English version by Robert Fagles is the most important recent translation of Homer's great epic poem. The verse translation has been hailed by scholars as the new standard, providing an Iliad that delights modern sensibility and aesthetic without sacrificing the grandeur and particular genius of Homer's own style and language. The Iliad is one of the two great epics of Homer, and is typically described as one of the greatest war stories of all time, but to say the Iliad is a war story does not begin to describe the emotional sweep of its action and characters: Achilles, Helen, Hector, and other heroes of Greek myth and history in the tenth and final year of the Greek siege of Troy."
        },
        "id": "117929",
        "images": {
            "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SX98_.jpg",
            "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482528464l/117929._SY75_.jpg"
        },
        "isbn": "0140445927",
        "isbn13": "9780140445923",
        "originalPublicationYear": "-750",
        "pageCount": 683,
        "popularShelves": [{
            "count": 215075,
            "name": "to-read"        
        }, {
            "count": 15438,
            "name": "currently-reading"        
        }],
        "publisher": "Penguin Classics",
        "ratings": {
            "average": "3.87",
            "count": 346167,
            "distribution": {
                "five": 115210,
                "four": 113155,
                "three": 83415,
                "two": 24967,
                "one": 9420
            }
        },
        "series": [{
            "count": 8,
            "name": "Epic Cycle",
            "positionInSeries": 2
        }],
        "similarBooks": [{
            "author": {
                "id": "919",
                "name": "Virgil",
                "url": "https://www.goodreads.com/author/show/919.Virgil"
            },
            "id": "12914",
            "images": {
                "large": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
                "small": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
            },
            "isbn": "0679729526",
            "isbn13": "9780679729525",
            "pageCount": 442,
            "ratings": {
                "average": "3.87",
                "count": 346167
            },
            "title": "The Aeneid",
            "url": "https://www.goodreads.com/book/show/117929.The_Iliad"
        }, {
            "author": {
                "id": "4699102",
                "name": "Unknown",
                "url": "https://www.goodreads.com/author/show/4699102.Unknown"
            },
            "id": "52357",
            "images": {
                "large": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327878125l/52357._SX98_.jpg",
                "small": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327878125l/52357._SY75_.jpg"
            },
            "isbn": "0393320979",
            "isbn13": "9780393320978",
            "pageCount": 245,
            "ratings": {
                "average": "3.87",
                "count": 346167
            },
            "title": "Beowulf",
            "url": "https://www.goodreads.com/book/show/52357.Beowulf"
        }],
        "title": "The Iliad",
        "url": "https://www.goodreads.com/book/show/117929.The_Iliad"
    }]
}
```

#### Comments
- For requests, if `authorId` is provided, `searchQuery` and `userId` are ignored.
- When searching by `userId`, you can specify a page size of up to 200 without requiring multiple Goodreads API calls behind the scenes.
- `searchQuery` search matches against title and author fields.
- The possible values for `authors.role` are 
  - "author"
  - "translator"
- `description.long` is provided by Goodreads. `description.short` will be the first sentence on the long description.
- `pageCount` and `publisher` are obviously dependent on edition; I don't know how Goodreads determines which edition to provide.
- `popularShelves` will return at most 100 shelves.
- `publicationYear` will be a negative number for books published BC.
- Adding books to shelves will be part of v2.

#### Goodreads API endpoints
- author.books
- search.books
- reviews.list
- shelves.add_to_shelf
- shelves.add_books_to_shelves



### Notifications
#### Example Requests
```js
const options = {
    "paging": {
        "count": 30,
        "number": 1
    }
}

api.getNotifications(options).then(notifications => {});
```

#### Example Response
```json
{
    "notifications": [
        {
            "actors": [
                {
                    "id": "119659909",
                    "images": {
                        "large": "https://s.gr-assets.com/assets/nophoto/user/u_111x148-9394ebedbb3c6c218f64be9549657029.png",
                        "small": "https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png"
                    },
                    "location": "Hoboken, NJ",
                    "names": {
                        "display": "Castlearrgh",
                        "full": "Castlearrgh"
                    },
                    "url": "https://www.goodreads.com/user/show/119659909-castlearrgh"
                }
            ],
            "body": {
               "html": "<a href=\"/user/show/119659909-castlearrgh\">Castlearrgh<\/a> liked <a href=\"https://www.goodreads.com/review/show/3193280293?type=review#rating_316913376\">your review of Moon People<\/a>",
               "text": "Castlearrgh liked your review of Moon People"
            },
            "resource": {
                "id": "3193280293",
                "type": "Review"
            },
            "timestamp": "2020-10-15T21:38:47-07:00",
            "type": "Rating",
            "url": "https://www.goodreads.com/review/show/3193280293?type=review#rating_316913376"
        }
    ]
}
```

#### Comments
- Requires OAuth
- Viewing notifications marks them as "viewed".
- `type` is the type of action the actor(s) made. Known values: 
    - Comment
    - Rating
    - ReadingNotesCollectionData
    - UserFollowing
- `resource.type` is the type of action the original user made. Known values: 
    - ReadingNotesCollectionData
    - ReadStatus
    - Review
    - UserFollowing

#### Goodreads API endpoints
- notifications



### Series
#### Example Requests
```js
const options = {
    "authorId": "7963"
}

api.getSeries(options).then(series => {});
```

#### Example Response
```json
{
    "author": {
        "id": "7963",
        "name": "P.G. Wodehouse"
    },
    "series": [{
        "bestBook": {
            "id": "1094403",
            "title": "The Man With Two Left Feet and Other Stories",
            "image": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348936569l/1094403._SX98_.jpg",
            "published": "1917"
        },
        "bookCount": "16",
        "description": "P.G. Wodehouse's series of comic novels featuring young British dilettante Bertram \"Bertie\" Wooster, and his wry valet Jeeves, who is often the cause of his salvation from increasingly entangled social situations.",
        "id": "52643",
        "title": "Jeeves"
    }, {
        "bestBook": {
            "id": "13707720",
            "title": "Leave it to Psmith",
            "image": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1342025763l/13707720._SX98_.jpg",
            "published": "1923"
        },
        "bookCount": "12",
        "description": "P.G. Wodehouse's stories set at Blandings Castle.",
        "id": "60684",
        "title": "Blandings Castle"
    }]
}
```

#### Comments
- Goodreads makes you retrieve a single series by some weird combination of an ID (not the series ID provided in the book resource) and slug; I don't see the point in implementing that since I'm not sure how to get that combination ID. To get a single series by `bookId` or `isbn`, use `getBook()`.
- I believe `bestBook` is the highest rated on Goodreads in that series.

#### Goodreads API endpoints
- series.list



### Shelves
#### Example Requests
```js
const options = {
    "userId": "4812558",
    "paging": { // optional
        "count": 100,
        "number": 1
    }
}

api.getShelves(options).then(shelves => {});
```

#### Example Response
```json
{
    "start": 1,
    "end": 100,
    "total": 183,
    "shelves": [
        {
            "count": 1220,
            "featured": true,
            "exclusive": true,
            "id": "15377251",
            "name": "read"
        }, {
            "count": 93,
            "featured": false,
            "exclusive": false,
            "id": "350589097",
            "name": "100-books-2020"
        }
    ]
}
```

#### Comments
- Creating and editing shelves will be added in v2

#### Goodreads API endpoints
- shelves.list
- user_shelves



### User

#### Example Requests
```js
const options = {
    "userId": "4812558"
}

api.getUser(options).then(user => {});
```

#### Example Response
```json
{
    "bookCount": 2228,
    "dates": {
        "lastActive": "2020-07",
        "join": "2011-01"
    },
    "favoriteAuthors": [{
        "id": "8842",
        "name": "Susanna Clarke"
    }],
    "favorites": "Science-fiction, fantasy, Christian, the classics, quirky non-fiction, history, mystery...",
    "id": "4812558",
    "images": {
        "large": "https://images.gr-assets.com/users/1529893704p3/4812558.jpg",
        "small": "https://images.gr-assets.com/users/1529893704p2/4812558.jpg"
    },
    "interests": "Reading, web programming, modern board games",
    "location": "Mobile, AL",
    "name": "Brian Koser",
    "recentUpdates": [{
        "action": "wants to read",
        "bookId": "200138",
        "timestamp": "2020-07-22T18:13:24-07:00",
        "type": "readstatus",
        "url": "https://www.goodreads.com/read_statuses/3763771994"
    }, {
        "excerpt": "Emoji Bible > LolCats Bible <a target=\"_blank\" href=\"https://en.m.wikipedia.org/wiki/LOLCat_Bible_Translation_Project\" rel=\"nofollow\">https://en.m.wikipedia.org/wiki/LOLCa...</a>",
        "location": "Melissa's review",
        "timestamp": "2020-07-22T18:13:24-07:00",
        "type": "comment",
        "url": "https://www.goodreads.com/review/show/3443441422"
    }, {
        "book": {
            "authors": [{
                "id": "4788285",
                "name": "Tara Gilesbie",
                "ratings": {
                    "average": "3.88",
                    "count": 1275
                },
                "role": "author",
                "images": {
                     "large": "https://s.gr-assets.com/assets/nophoto/user/f_200x266-3061b784cc8e7f021c6430c9aba94587.png",
                     "small": "https://s.gr-assets.com/assets/nophoto/user/f_50x66-6a03a5c12233c941481992b82eea8d23.png"
                },
                "url": "https://www.goodreads.com/author/show/4788285.Tara_Gilesbie"
            }],
            "id": "11099295",
            "title": "My Immortal",
            "url": "https://www.goodreads.com/book/show/11099295-my-immortal"
        },
        "excerpt": "The newest \"worst thing I've ever read\". I mostly enjoyed reading it for the podcast, but eventually it got tiresome.<br/><br/>Some of the mistakes seem too good for it not to be a hoax:<br/><br/>- Tom Bombodil<br/>- We hugged each udder happily.<br/>- “Yah, siriusly [...]” Serious said deviantly.<br/><br/>If it's not a hoax, I guess some<a href=\"https://www.goodreads.com/review/show/3411248043\">more...</a>",
        "rating": 1,
        "timestamp": "2020-07-19T20:51:24-07:00",
        "type": "review",
        "url": "https://www.goodreads.com/review/show/3411248043"
    }],
    "rss": {
        "reviews": "https://www.goodreads.com/review/list_rss/4812558?key=39eMNtqSb_HWJQpihlEiCX178ZHpyQDxjiWtnFFtNeWZMUSK&shelf=%23ALL%23",
        "updates": "https://www.goodreads.com/user/updates_rss/4812558?key=39eMNtqSb_HWJQpihlEiCX178ZHpyQDxjiWtnFFtNeWZMUSK"
    },
    "shelves": [{
        "count": 1197,
        "featured": true,
        "exclusive": true,
        "id": "15377251",
        "name": "read"
    }, {
        "count": 12,
        "featured": false,
        "exclusive": false,
        "id": "302308344",
        "name": "372-pages"
    }],
    "urls": {
        "goodreads": "https://www.goodreads.com/user/show/4812558-brian-koser",
        "personal": "http://koser.us"
    }
}
```

#### Comments
- `bookCount` is the number of books shelved
- `shelves.exclusive` allows you to have one set of 
- `recentUpdates.type` possible values:
  - comment
    - `location`
  - review
    - `book`
    - `rating` field with value 1-5
  - readstatus
    - `action`
    - `bookId` - lots of book information is provided (some not available from any other endpoint), but also much is missing, so we will just return `bookId`

#### Goodreads API endpoints
- user.show



### Reviews
#### Example Requests
```js
const options = {
    "reviewId": "2kYIBVxcqaN4mdfclzwVQ"
}

api.getReviews(options).then(review => {});
```

```js
const options = {
    "userId": "4812558",
    "bookId": "50"
}

api.getReviews(options).then(review => {});
```

#### Example Response
```json
{
    "book": {
        "authors": [{
            "averageRating": "2.77",
            "id": "2975072",
            "images": {
                "large": "https://s.gr-assets.com/assets/nophoto/user/u_200x266-e183445fd1a1b5cc7075bb1cf7043306.png",
                "small": "https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png"
            },
            "name": "Dale M. Courtney",
            "ratingsCount": 135,
            "role": "author",
            "url": "https://www.goodreads.com/author/show/2975072.Dale_M_Courtney"
        }],
        "descriptions": {
            "short": "This Book is based on the turning point for Earth into a new era of space travel and the beginning of the Age of Aquarius.",
            "full": "This Book is based on the turning point for Earth into a new era of space travel and the beginning of the Age of Aquarius. The story focuses on one Man by the Name of David Braymer and his adventures from High school teacher to 1st Science Officer on board the Lunar Base 1 Mobile Base Station and his encounters with Alien Life forms through out our universe and the space Battle of all battles David experiences. I hope you enjoy the many adventures of David Braymer and his conquest in space and our journey into the Age of Aquarius"
        },
        "id": "6584471",
        "images": {
            "large": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
            "small": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
        },
        "isbn": "1436372135",
        "isbn13": "9781436372138",
        "originalPublicationYear": "2008",
        "pageCount": 123,
        "publisher": "Penguin Classics",
        "ratings": {
            "average": "2.63",
            "count": 120
        },
        "reviewCount": 49,
        "title": "Moon People",
        "url": "https://www.goodreads.com/book/show/6584471-moon-people"
    },
    "owned": false,
    "review": {
        "body": "I'm a fan of the bad book club podcast 372 Pages We'll Never Get Back, and a fan of many of the books they've covered. I built a fan-fiction Choose Your Own Adventure game (372adventure.com). I wrote a 3,212 word review of Trucking through Time, the highest-rated review of Trucking through Time on Goodreads. We've invited friends over for an Eye of Argon reading party.<br /><br />I don't say any of this to brag. I say it so that you can fully understand the following statement: Moon People is the greatest of them all. I didn't think I could love a 1-star book more than Trucking through Time, but I was wrong. So very wrong.<br /><br />It's like Dale M. Courtney studied me secretly for years, learning all about me, and then wrote Moon People solely to make me happy.<br /><br />The main quirk is that DMC must have written the book with text to speech software. That's the only explanation for the lack of commas and quotation marks, and all the homophones. But it would take me far more than 80 pages to catalog everything I like about Moon People, because every sentence is bad in an amazing new way. You really have to read it yourself. Here's just a taste:<br /><br />The main character David talking to the spaceship admiral: <br /><br /> By the way did you realize that Monday was Halloween. Yes sir, I know, it does bother me a little bit. You have until then to change your mind. You are going to have to be here a good 24 hours earlier for launch preparations and a quick health check up. Then after that the only thing you are going to see is the stars. Don't worry I'll be there right along side of you? That's my flight too. Great. The truth about it is I am a little scared of that shuttle launch to the base station especially on Halloween. But I think I will be all right after that. Good Captain Braymer because you and I are going on one hell of a ride Monday morning, trick or treat. I will show you wonders you always dreamed about. That's pretty cool sir. I can't wait.<br /><br />Romance:<br /><br /> She leaned in toward David and they kissed passionately for about a minute and then stopped.<br /><br />First contact with alien life:<br /><br /> If you like asparagus then I bet you'll like to try some of these. We call this a baked potato. We stir it up into a soft pudding and then we add butter and salt. Potatoes also grow well in space. I hope you will like it. Captain Tudmoke replied, I believe I will try it. MMM that's good. We have something like this on our planet its called stemage.<br /><br />The Burj Khalifa, the Mona Lisa, the crack cocaine of bad books.",
        "commentsCount": 0,
        "dates": {
            "add": "2020-02-16T11:33:07-08:00",
            "end": "2020-03-04",
            "start": "2020-02-16",
            "update": "2020-03-04T19:54:53-08:00"
        },
        "id": "3193280293",
        "isSpoiler": false,
        "rating": 1,
        "readCount": 1,
        "recommendedBy": "372 Pages We'll Never Get Back Podcast",
        "recommendedFor": "Fans of bad books",
        "url": "https://www.goodreads.com/review/show/3193280293",
        "votes": "0"
    },
    "shelves": [
        {
            "exclusive": true,
            "id": "15377251",
            "name": "read"
        }, {
            "exclusive": false,
            "id": "302308344",
            "name": "372-pages"
        }
    ],
    "statuses": [
        {
            "commentsCount": 0,
            "id": "3444255000",
            "statuses": {
                "current": "read",
                "previous": "currently-reading"
            },
            "ratingsCount": 0,
            "timestamp": "2020-03-04T19:26:52-08:00"
        },
        {
            "commentsCount": 0,
            "id": "3410671962",
            "statuses": {
                "current": "currently-reading"
            },
            "ratingsCount": 0,
            "timestamp": "2020-02-16T11:33:08-08:00"
        }
    ],
    "user": {
        "id": "4812558",
        "images": {
            "large": "https://images.gr-assets.com/users/1529893704p3/4812558.jpg",
            "small": "https://images.gr-assets.com/users/1529893704p2/4812558.jpg"
        },
        "location": "Mobile, AL",
        "names": {
            "display": "Brian",
            "full": "Brian Koser"
        },
        "url": "https://www.goodreads.com/user/show/4812558-brian-koser"
    }
}
```

#### Comments
- Reviews is a many-to-many link between users and books. The entity contains reviews, ratings, shelves, and book and user data.
- For requests, if `reviewId` is provided, `userId` and `bookId` are ignored.
- Will require registered app and OAuth after adding `owned_books` data.

#### Goodreads API endpoints
- owned_books - will add in v3
- review.show
- review.show_by_user_and_book



### UserUpdates
#### Example Requests

#### Example Response

#### Comments

#### Goodreads API endpoints
- read_statuses (single)
- user.show (multiple)



## Not planning to implement
- auth
- author_following
- events
- fanship
- followers
- friend
- friends
- group
- list (not sure what Listopia is, and this resource requires "extra permission" to use)
- quotes (only functionality is creating quotes)
- recommendations (user-to-user recommendations, only functionality is retrieving individual recommendation)
- review.recent_reviews  (reviews from all users)
- topic
- user_status
    - user_status.show takes a user_status ID that I can't find in any other resource
    - user_status.index is a stream of all updates of every site user
- work

# Sosoreads
*Another Node Goodreads wrapper*

Apparently when Amazon acquired Goodreads they decided to ship their [half-built API](https://www.goodreads.com/api) and never finish it. Thanks, Amazon.

So there are lots of wrappers: 
- [Goodreads](https://github.com/sosedoff/goodreads) (Ruby) looks like the most popular.
- [BetterReads](https://github.com/thejessleigh/betterreads) (Python) was my first name idea and looks great. It was built on goodreads2, another Python wrapper.
- I haven't looked at them in-depth yet, but there are a bunch of Node versions: [fff-graphql-goodreads](https://github.com/mpj/fff-graphql-goodreads), [goodreads-api-node](https://github.com/baahrens/goodreads-api-node), [goodreads.js](https://github.com/AnalogJ/goodreads.js), [goodreads-json](https://github.com/rosnovsky/goodreads-json), [goodreads-json-api](https://github.com/myke11j/goodreads-json-api), [Goodreads review JSON export](https://github.com/remy/goodreads), and [node-goodreads](https://github.com/bdickason/node-goodreads). 

## General Notes
My goal with Sosoreads is to provide a clean interface to the book-related resources. However, I will prioritize performance over "purity". For example, if I were building an API from scratch, I would only return authorIds and role with a book; but Sosoreads will also return the additional author information provided by Goodreads. 

I will not implement the social resources (friends, notifications, etc.). v1 will be read-only. v2 will provide writing.

Null or empty fields will not be returned.


## To Do
- [ ] Request/response contracts
- [ ] Basic structure
- [ ] Author
- [ ] Book, Books
- [ ] User
- [ ] Tests
- [ ] Add to npm

### Installation
```
npm install --save sosoreads
const sosoreads = require('sosoreads');
```



### Initialization
```js
const options = {
  developer_key: 'YOUR_GOODREADS_DEVELOPER_KEY'
};

const api = sosoreads(options);
```



### Author

#### Example Requests
```js
const options = {
    authorId: "2687"
};

api.getAuthor(options).then(author => {});
```

```js
const options = {
    authorName: "Simmons"
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
    "image": {
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
    bookId: "853510"
}

api.getBook(options).then(book => {});
```

```js
const options = {
    isbn: "0007119313"
}

api.getBook(options).then(book => {});
```

#### Example Response
```json
{
    "authors": [{
        "averageRating": "3.81",
        "id": "903",
        "image": {
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
        "image": {
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
    "image": {
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
        "image": {
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
        "image": {
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
- The possible values for `authors.role` are "author" and "translator".
- `description.long` is provided by Goodreads. `description.short` will be the first sentence on the long description.
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
    authorId: "1654",
    retrieveAllBooks: false
}

api.getBooks(options).then(books => {});
```

```js
const options = {
    searchQuery: "going postal",
    retrieveAllBooks: false
}

api.getBooks(options).then(books => {});
```

#### Example Response
```json
[{
    "authors": [{
        "averageRating": "3.81",
        "id": "903",
        "image": {
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
        "image": {
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
    "image": {
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
        "image": {
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
        "image": {
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
```

#### Comments
- For requests, if `authorId` is provided, `searchQuery` is ignored.
- Goodreads only returns 30 books at a time when retrieving by author. To return all books, set `retrieveAllBooks` to `true` and sosoreads will make multiple Goodreads API calls. Default is false.
- `searchQuery` search matches against title and author fields
- The possible values for `authors.role` are "author" and "translator".
- `description.long` is provided by Goodreads. `description.short` will be the first sentence on the long description.
- `pageCount` and `publisher` are obviously dependent on edition; I don't know how Goodreads determines which edition to provide.
- `popularShelves` will return at most 100 shelves.
- `publicationYear` will be a negative number for books published BC.

#### Goodreads API endpoints
- author.books
- search.books



### User

#### Example Requests
```js
const options = {
    userId: "4812558"
}

api.getUser(options).then(user => {});
```

#### Example Response
```json
[{
    "bookCount": 2228,
    "date": {
        "lastActive": "2020-07",
        "join": "2011-01"
    },
    "favoriteAuthors": [{
        "8842"
    }],
    "favorites": "Science-fiction, fantasy, Christian, the classics, quirky non-fiction, history, mystery...",
    "id": "4812558",
    "image": {
        "large": "https://images.gr-assets.com/users/1529893704p3/4812558.jpg",
        "small": "https://images.gr-assets.com/users/1529893704p2/4812558.jpg"
    },
    "interests": "Reading, web programming, modern board games",
    "location": "Mobile, AL",
    "name": "Brian Koser",
    "rss": {
        "reviews": "https://www.goodreads.com/review/list_rss/4812558?key=39eMNtqSb_HWJQpihlEiCX178ZHpyQDxjiWtnFFtNeWZMUSK&shelf=%23ALL%23",
        "updates": "https://www.goodreads.com/user/updates_rss/4812558?key=39eMNtqSb_HWJQpihlEiCX178ZHpyQDxjiWtnFFtNeWZMUSK"
    },
    "url": {
        "goodreads": "https://www.goodreads.com/user/show/4812558-brian-koser",
        "personal": "http://koser.us"
    }
}]
```

#### Comments
- `bookCount` is the number of books shelved

#### Goodreads API endpoints
- user.show

- read_statuses
- user_shelves
- user_status



### UserBook
Goodreads API endpoints: 
- owned_books
- review



### UserShelves
Goodreads API endpoints: 
- shelves



### UserUpdates
Goodreads API endpoints: 
- user.show



## Done



## Not planning to implement
- auth
- author_following
- comment
- events
- fanship
- followers
- friend
- friends
- group
- list (not sure what Listopia is, and this resource requires "extra permission" to use)
- notifications
- quotes (only functionality is creating quotes)
- recommendations (user-to-user recommendations, only functionality is retrieving individual recommendation)
- series (included in Book and Books; no interesting information that isn't there)
- topic
- updates
- work

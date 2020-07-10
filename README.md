# SoSoReads
*Another Node Goodreads wrapper*

Apparently when Amazon acquired Goodreads they decided to ship their [half-built API](https://www.goodreads.com/api) and never finish it. Thanks, Amazon.

So there are lots of wrappers: 
- [Goodreads](https://github.com/sosedoff/goodreads) (Ruby) looks like the most popular.
- [BetterReads](https://github.com/thejessleigh/betterreads) (Python) was my first name idea and looks great. It was built on goodreads2, another Python wrapper.
- I haven't looked at them in-depth yet, but there are a bunch of Node versions: [fff-graphql-goodreads](https://github.com/mpj/fff-graphql-goodreads), [goodreads-api-node](https://github.com/baahrens/goodreads-api-node), [goodreads.js](https://github.com/AnalogJ/goodreads.js), [goodreads-json](https://github.com/rosnovsky/goodreads-json), [goodreads-json-api](https://github.com/myke11j/goodreads-json-api), [Goodreads review JSON export](https://github.com/remy/goodreads), and [node-goodreads](https://github.com/bdickason/node-goodreads). 

My goal with sosoreads is to provide a clean interface to the book-related resources. I will not implement the social resources (friends, notifications, etc.).


## To Do

### Installation

- [ ] Add to npm

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

#### Example Request

```js
const options = {
    id: 2687,
    name: "Simmons"
};

api.getAuthor(options).then(author => {});
```

#### Example Response
```json
{
    "about": "<b>Dan Simmons</b> grew up in various cities and small towns in the Midwest, including Brimfield, Illinois, which was the source of his fictional \"Elm Haven\" in 1991's SUMMER OF NIGHT and 2002's A WINTER HAUNTING.",
    "booksCount": 188,
    "dates": {
        "born": "1948-04-04",
        "died": "2024-07-09"
    },
    "followerCount": 8641,
    "gender": "male",
    "id": 2687,
    "hometown": "Peoria, Illinois",
    "image": {
        "large": "https://images.gr-assets.com/authors/1427999015p7/2687.jpg",
        "medium": "https://images.gr-assets.com/authors/1427999015p5/2687.jpg",
        "small": "https://images.gr-assets.com/authors/1427999015p2/2687.jpg"
    },
    "influences": [{
            "id": 7415,
            "name": "Harlan Ellison",
            "url": "https://www.goodreads.com/author/show/7415.Harlan_Ellison"
        }, {
            "id": 3389,
            "name": "Stephen King",
            "url": "https://www.goodreads.com/author/show/3389.Stephen_King"
        }],
    "name": "Dan Simmons",
    "url": "https://www.goodreads.com/author/show/2687.Dan_Simmons"
}
```


#### Comments

If `goodreadsAuthorId` is provided, `authorName` is ignored.

#### Goodreads API endpoints
- author.show
- search.author



### Books
Goodreads API endpoints: 
- author.books
- book
- comment
- owned_books
- rating
- search

```js
const options = {
    goodreadsAuthorId: 2687,
    maxBooks: 30 // paginate the number of books returned; defaults to 30
}
```



### Reviews
Goodreads API endpoints: 
- review



### Series
Goodreads API endpoints: 
- series



### Shelves
Goodreads API endpoints: 
- shelves


### User
Goodreads API endpoints: 
- read_statuses
- user
- user_shelves
- user_status



## Done



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
- notifications
- quotes (only functionality is creating quotes)
- recommendations (user-to-user recommendations, only functionality is retrieving individual recommendation)
- topic
- updates
- work

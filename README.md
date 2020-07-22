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
    authorId: 2687,
    authorName: "Simmons"
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

If `authorId` is provided, `authorName` is ignored.

#### Goodreads API endpoints
- author.show
- search.author



### Books

#### Example Request

```js
const options = {
    authorId: 1654,
    retrieveAllBooks: true // Goodreads only returns 30 books at a time when searching by author; to return all books, sosoreads makes multiple Goodreads API calls. Default is false.
}

api.getBooks(options).then(books => {});
```

#### Example Response
```json
[{
    "authorIds": [
        "1654"
    ],
    "averageRating": "4.39",
    "descriptions": {
      "short": "Arch-swindler Moist Van Lipwig never believed his confidence crimes were hanging offenses - until he found himself with a noose tightly around his neck, dropping through a trapdoor, and falling into...a government job?",
      "full": "Arch-swindler Moist Van Lipwig never believed his confidence crimes were hanging offenses - until he found himself with a noose tightly around his neck, dropping through a trapdoor, and falling into...a government job?\nBy all rights, Moist should have met his maker. Instead, it's Lord Vetinari, supreme ruler of Ankh-Morpork, who promptly offers him a job as Postmaster. Since his only other option is a nonliving one, Moist accepts the position - and the hulking golem watchdog who comes along with it, just in case Moist was considering abandoning his responsibilities prematurely.\nGetting the moribund Postal Service up and running again, however, may be a near-impossible task, what with literally mountains of decades-old undelivered mail clogging every nook and cranny of the broken-down post office building; and with only a few creaky old postmen and one rather unstable, pin-obsessed youth available to deliver it. Worse still, Moist could swear the mail is talking to him. Worst of all, it means taking on the gargantuan, money-hungry Grand Trunk clacks communication monopoly and its bloodthirsty piratical head, Mr. Reacher Gilt.\nBut it says on the building Neither Rain Nor Snow Nor Glom of Nit...Inspiring words (admittedly, some of the bronze letters have been stolen), and for once in his wretched life Moist is going to fight. And if the bold and impossible are what's called for, he'll do it - in order to move the mail, continue breathing, get the girl, and specially deliver that invaluable commodity that every human being (not to mention troll, dwarf, and, yes, even golem) requires: hope."
    },
    "id": 64222,
    "image": {
        "large": "https://images.gr-assets.com/authors/1427999015p7/2687.jpg",
        "medium": "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
        "small": "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png"
    },
    "isbn": "0060502932",
    "isbn13": "9780060502935",
    "pageCount": "394",
    "publicationYear": "2005",
    
    "ratingsCount": "99904",
    "series": [{
        "name": "Discworld",
        "number": 33
    }, {
        "name": "Moist von Lipwig",
        "number": 1
    }],
    "title": "Going Postal",
    "url": "https://www.goodreads.com/book/show/64222.Going_Postal"
}]
```


#### Comments



#### Goodreads API endpoints
- author.books

- book
- comment
- owned_books
- rating
- search



### Book



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

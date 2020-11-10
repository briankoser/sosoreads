const booksByUser = require('../resources/booksByUser')();
const config = require('../config.json');



// test options
let ascendingOptions = {
    "userId": "4812558",
    "sort": {
        "field": "title",
        "order": "asc"
    }
};

let badSortFieldOptions = {
    "userId": "4812558",
    "sort": {
        "field": "asdf"
    }
};

let badSortOrderOptions = {
    "userId": "4812558",
    "sort": {
        "field": "title",
        "order": "asdf"
    }
};

let descendingOptions = {
    "userId": "4812558",
    "sort": {
        "field": "title",
        "order": "desc"
    }
};

let fullOptions = {
    "userId": "4812558",
    "paging": {
        "count": 30,
        "number": 1
    },
    "searchQuery": "iliad",
    "shelf": "to-read",
    "sort": {
        "field": "title",
        "order": "asc"
    }
};

let highPagingCountOptions = {
    "userId": "4812558",
    "paging": {
        "count": 201,
        "number": 1
    }
};

let lowPagingCountOptions = {
    "userId": "4812558",
    "paging": {
        "count": 0,
        "number": 1
    }
};

let minimumOptions = { 
    "userId": "4812558"
};

let noUserIdOptions = {
    "paging": {
        "count": 30,
        "number": 1
    },
    "searchQuery": "iliad",
    "shelf": "to-read",
    "sort": {
        "field": "title",
        "order": "desc"
    }
};



// test results
let fullParams = {
    "v": 2,
    "id": "4812558",
    "shelf": "to-read",
    "sort": "title",
    "search[query]": "iliad",
    "order": config.ascendingGoodreads,
    "page": 1,
    "per_page": 30
}

let minimumParams = {
    "v": 2,
    "id": "4812558",
    "sort": config.booksByUser.defaultSortField,
    "order": config.descendingGoodreads
};



// tests
test('booksByUser validates required fields', () => {
    expect(booksByUser.validateOptions(minimumOptions)).toBe(true);
});

test('booksByUser validates all possible fields', () => {
    expect(booksByUser.validateOptions(fullOptions)).toBe(true);
});

test('booksByUser fails without options', () => {
    expect(() => booksByUser.validateOptions()).toThrow(Error);
});

test('booksByUser fails without User ID', () => {
    expect(() => booksByUser.validateOptions(noUserIdOptions)).toThrow(Error);
});

test('booksByUser fails with invalid sort.field', () => {
    expect(() => booksByUser.validateOptions(badSortFieldOptions)).toThrow(Error);
});

test('booksByUser fails with invalid sort.order', () => {
    expect(() => booksByUser.validateOptions(badSortOrderOptions)).toThrow(Error);
});

test('booksByUser fails with paging.count under 1', () => {
    expect(() => booksByUser.validateOptions(lowPagingCountOptions)).toThrow(Error);
});

test('booksByUser fails with paging.count over limit', () => {
    expect(() => booksByUser.validateOptions(highPagingCountOptions)).toThrow(Error);
});

test('booksByUser uses default sort field', () => {
    expect(booksByUser.getRequestParams(minimumOptions).sort).toBe(config.booksByUser.defaultSortField);
});

test('booksByUser uses default sort order', () => {
    expect(booksByUser.getRequestParams(minimumOptions).order).toBe(config.descendingGoodreads);
});

test('booksByUser ascending order uses Goodreads ascending order', () => {
    expect(booksByUser.getRequestParams(ascendingOptions).order).toBe(config.ascendingGoodreads);
});

test('booksByUser descending order uses Goodreads descending order', () => {
    expect(booksByUser.getRequestParams(descendingOptions).order).toBe(config.descendingGoodreads);
});

test('booksByUser creates minimum params', () => {
    expect(booksByUser.getRequestParams(minimumOptions)).toEqual(minimumParams);
});

test('booksByUser creates full params', () => {
    expect(booksByUser.getRequestParams(fullOptions)).toEqual(fullParams);
});
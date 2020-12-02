const reviews = require('../resources/reviews')();
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
    "sort": config.reviews.defaultSortField,
    "order": config.descendingGoodreads
};



// tests
test('reviews validates required fields', () => {
    expect(reviews.validateOptions(minimumOptions)).toBe(true);
});

test('reviews validates all possible fields', () => {
    expect(reviews.validateOptions(fullOptions)).toBe(true);
});

test('reviews fails without options', () => {
    expect(() => reviews.validateOptions()).toThrow(Error);
});

test('reviews fails without User ID', () => {
    expect(() => reviews.validateOptions(noUserIdOptions)).toThrow(Error);
});

test('reviews fails with invalid sort.field', () => {
    expect(() => reviews.validateOptions(badSortFieldOptions)).toThrow(Error);
});

test('reviews fails with invalid sort.order', () => {
    expect(() => reviews.validateOptions(badSortOrderOptions)).toThrow(Error);
});

test('reviews fails with paging.count under 1', () => {
    expect(() => reviews.validateOptions(lowPagingCountOptions)).toThrow(Error);
});

test('reviews fails with paging.count over limit', () => {
    expect(() => reviews.validateOptions(highPagingCountOptions)).toThrow(Error);
});

test('reviews uses default sort field', () => {
    expect(reviews.getRequestParams(minimumOptions).sort).toBe(config.reviews.defaultSortField);
});

test('reviews uses default sort order', () => {
    expect(reviews.getRequestParams(minimumOptions).order).toBe(config.descendingGoodreads);
});

test('reviews ascending order uses Goodreads ascending order', () => {
    expect(reviews.getRequestParams(ascendingOptions).order).toBe(config.ascendingGoodreads);
});

test('reviews descending order uses Goodreads descending order', () => {
    expect(reviews.getRequestParams(descendingOptions).order).toBe(config.descendingGoodreads);
});

test('reviews creates minimum params', () => {
    expect(reviews.getRequestParams(minimumOptions)).toEqual(minimumParams);
});

test('reviews creates full params', () => {
    expect(reviews.getRequestParams(fullOptions)).toEqual(fullParams);
});
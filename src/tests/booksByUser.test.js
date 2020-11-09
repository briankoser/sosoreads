const booksByUser = require('../resources/booksByUser')();



let userIdOptions = { 
    "userId": "4812558" 
};
test('booksByUser validates required fields', () => {
    expect(booksByUser.validateOptions(userIdOptions)).toBe(true);
});



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
        "order": "desc"
    }
};
test('booksByUser validates all possible fields', () => {
    expect(booksByUser.validateOptions(fullOptions)).toBe(true);
});



test('booksByUser fails without options', () => {
    expect(() => booksByUser.validateOptions()).toThrow(Error);
});



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
test('booksByUser fails without User ID', () => {
    expect(() => booksByUser.validateOptions(noUserIdOptions)).toThrow(Error);
});



let badSortFieldOptions = {
    "userId": "4812558",
    "sort": {
        "field": "asdf"
    }
};
test('booksByUser fails with invalid sort.field', () => {
    expect(() => booksByUser.validateOptions(badSortFieldOptions)).toThrow(Error);
});



let badSortOrderOptions = {
    "userId": "4812558",
    "sort": {
        "field": "title",
        "order": "asdf"
    }
};
test('booksByUser fails with invalid sort.order', () => {
    expect(() => booksByUser.validateOptions(badSortOrderOptions)).toThrow(Error);
});



let lowPagingCountOptions = {
    "userId": "4812558",
    "paging": {
        "count": 0,
        "number": 1
    }
};
test('booksByUser fails with paging.count under 1', () => {
    expect(() => booksByUser.validateOptions(lowPagingCountOptions)).toThrow(Error);
});



let highPagingCountOptions = {
    "userId": "4812558",
    "paging": {
        "count": 201,
        "number": 1
    }
};
test('booksByUser fails with paging.count over limit', () => {
    expect(() => booksByUser.validateOptions(highPagingCountOptions)).toThrow(Error);
});
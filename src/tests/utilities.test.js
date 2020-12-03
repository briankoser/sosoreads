const objectUtilities = require('../utilities/ObjectUtilities')();
const stringUtilities = require('../utilities/StringUtilities')();



// test options
const testObject = {
    'p1': 'a',
    'p2': '',
    'p3': 1,
    'p4': 0,
    'p5': true,
    'p6': false,
    'p7': null,
    'p8': undefined,
    'p9': {
        'p10': 'b'
    },
    'p11': {
        'p12': ''
    }
};
const truthyObject = {
    'p1': 'a',
    'p3': 1,
    'p5': true,
    'p9': {
        'p10': 'b'
    },
    'p11': {}
};
const fragment = 'This is a fragment';
const singleSentence = 'This is a test sentence.';
const declarativeSentences = 'This is the first sentence. This is the second sentence.';
const interrogativeSentences = 'This is the first sentence? This is the second sentence?';
const exclamatorySentences = 'This is the first sentence! This is the second sentence!';
const urlSentences = 'This is the first sentence with a goodreads.com url. This is the second sentence.';
const ellipsisSentences = 'This is the first sentence...still the first sentence. This is the second sentence.';



// tests
test('removeFalsyProperties should only remove falsy properties', () => {
    expect(objectUtilities.removeFalsyProperties(testObject)).toEqual(truthyObject);
});

test('firstSentence returns empty string for empty string', () => {
    expect(stringUtilities.firstSentence('')).toBe('');
});

test('firstSentence handles only sentence fragment', () => {
    expect(stringUtilities.firstSentence(fragment)).toBe(fragment);
});

test('firstSentence returns only sentence in string', () => {
    expect(stringUtilities.firstSentence(singleSentence)).toBe(singleSentence);
});

test('firstSentence returns first declarative sentence', () => {
    expect(stringUtilities.firstSentence(declarativeSentences)).toBe('This is the first sentence.');
});

test('firstSentence returns first interrogative sentence', () => {
    expect(stringUtilities.firstSentence(interrogativeSentences)).toBe('This is the first sentence?');
});

test('firstSentence returns first exclamatory sentence', () => {
    expect(stringUtilities.firstSentence(exclamatorySentences)).toBe('This is the first sentence!');
});

test('firstSentence handles URLs', () => {
    expect(stringUtilities.firstSentence(urlSentences)).toBe('This is the first sentence with a goodreads.com url.');
});

test('firstSentence handles ellipses', () => {
    expect(stringUtilities.firstSentence(ellipsisSentences)).toBe('This is the first sentence...still the first sentence.');
});
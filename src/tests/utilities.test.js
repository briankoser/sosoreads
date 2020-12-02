const stringUtilities = require('../utilities/StringUtilities')();



// test options
const fragment = 'This is a fragment';
const singleSentence = 'This is a test sentence.';
const declarativeSentences = 'This is the first sentence. This is the second sentence.';
const interrogativeSentences = 'This is the first sentence? This is the second sentence?';
const exclamatorySentences = 'This is the first sentence! This is the second sentence!';
const urlSentences = 'This is the first sentence with a goodreads.com url. This is the second sentence.';
const ellipsisSentences = 'This is the first sentence...still the first sentence. This is the second sentence.';



// tests
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
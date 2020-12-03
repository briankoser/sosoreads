const StringUtilities = function() {
    let firstSentence = function(paragraph) {
        const regex = /.+[\.!\?]+(?:[\s])/;
        let results = paragraph.match(regex);
        if (results == null || results.length < 1) {
            return paragraph;
        }
        else {
            return results[0].trim();
        }
    }
  
    return {
        firstSentence,
    };
};

module.exports = StringUtilities;
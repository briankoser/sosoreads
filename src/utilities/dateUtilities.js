const { formatISO } = require('date-fns');

const DateUtilities = function() {
    let formatDate = dateString => formatISO(new Date(dateString));
  
    return {
        formatDate,
    };
};

module.exports = DateUtilities;
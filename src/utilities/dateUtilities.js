const { formatISO } = require('date-fns');

const DateUtilities = function() {
    let formatDate = dateString => {
        if (dateString == undefined) {
            return '';
        }

        if (dateString == '') {
            return '';
        }

        return formatISO(new Date(dateString));
    };
  
    return {
        formatDate,
    };
};

module.exports = DateUtilities;
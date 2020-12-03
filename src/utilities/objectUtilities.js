const ObjectUtilities = function() {
    let removeFalsyProperties = function(obj) {
        // https://stackoverflow.com/a/38340730/178225
        Object.entries(obj).forEach(([key, val]) => {
            if (val && typeof val === 'object') removeFalsyProperties(val)
            else if (!val) delete obj[key]
        });

        return obj;
    };
  
    return {
        removeFalsyProperties,
    };
};

module.exports = ObjectUtilities;
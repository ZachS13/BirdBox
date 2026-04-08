const formatDateToLocale = (timestamp, locale) => {
    return new Date(timestamp).toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
    });
};

module.exports = {
    formatDateToLocale,
};

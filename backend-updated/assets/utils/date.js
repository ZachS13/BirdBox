const formatDateToLocale = (timestamp, locale, isDayNeeded) => {
    const options = { month: "short" };

    if (isDayNeeded) options.day = "numeric";

    return new Date(timestamp).toLocaleDateString(locale, options);
};

module.exports = {
    formatDateToLocale,
};

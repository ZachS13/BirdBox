export const formatDateTimeForDb = (date, time) => {
    const [month, day, year] = date.split("/");
    const [timePart, meridiemPart] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    hours = meridiemPart.toLowerCase() === "am" && hours === "12" ? "00" : meridiemPart.toLowerCase() === "pm" && hours !== "12" && String(+hours + 12).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};

export const formatDateTimeForUser = (datetime) => {
    const dateObj = new Date(datetime);

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const dateObjHours = dateObj.getHours();
    const hours = String(dateObjHours === 0 ? 12 : dateObjHours > 12 ? dateObjHours - 12 : dateObjHours).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const meridiem = dateObjHours >= 12 ? "PM" : "AM";

    return {
        date: `${month}/${day}/${year}`,
        time: `${hours}:${minutes} ${meridiem}`,
    };
};

export const calculateTimeAgo = (datetime) => {
    const todaysDate = new Date();
    const lastActiveDate = new Date(datetime);

    const differenceInTime = todaysDate.getTime() - lastActiveDate.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return "Today";

    if (differenceInDays === 1) return "Yesterday";

    if (differenceInDays < 7) return `${differenceInDays} Days Ago`;

    if (differenceInDays < 30) return `${Math.floor(differenceInDays / 7)} Weeks Ago`;

    if (differenceInDays < 365) return `${Math.floor(differenceInDays / 30)} Months Ago`;

    return `${Math.floor(differenceInDays / 365)} Years Ago`;
};

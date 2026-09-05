import NepaliDate from "nepali-date-converter";

export const formatNepaliDate = (date: Date) => {
    const nepaliDate = new NepaliDate(date);

    return nepaliDate.format(
        "MMMM D, YYYY",
        "np"
    );
};
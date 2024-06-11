export const convertUrlsToFiles = async (urls: string[]) => {
    const files = [];
    for (let index = 0; index < urls.length; index++) {
        const file = await convertUrlToFile(urls[index]);
        files.push(file);
    }
    return files;
};

export const convertUrlToFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const extd = url.split(".").pop();
    const fileName = url.split("/").pop();
    const meta = { type: `image/${extd}` };

    return new File([data], fileName as string, meta);
};

export const changeText = (text: string) => {
    return text.replace(/<br\s*\/?>/g, " ").replace(/\n/g, "");
};

export const numberCommas = (number: Number) => {
    return number.toLocaleString();
};

export const YYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

export const emptySchedule = [
    {
        scheduleDate: YYYYMMDD(new Date()),
        scheduleContent: "",
        scheduleStartTime: "",
        scheduleEndTime: "",
    },
];

export const emptyExpenditure = {
    travelScheduleExpenditureDetail: "",
    travelScheduleExpenditure: 0,
};

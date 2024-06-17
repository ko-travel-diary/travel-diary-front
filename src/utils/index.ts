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

export const emptySchedule = {
    scheduleDate: YYYYMMDD(new Date()),
    scheduleContent: "",
    scheduleStartTime: "",
    scheduleEndTime: "",
};

export const emptyExpenditure = {
    travelScheduleExpenditureDetail: "",
    travelScheduleExpenditure: 0,
};

export const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 10) {
            const formattedHour = String(hour).padStart(2, "0");
            const formattedMinute = String(minute).padStart(2, "0");
            times.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return times;
};

export const timeOptions = generateTimeOptions();

export const listItem = [
    { name: "전국", value: "all" },
    { name: "서울", value: "서울" },
    { name: "경기도", value: "경기도" },
    { name: "강원도", value: "강원도" },
    { name: "부산", value: "부산" },
    { name: "대구", value: "대구" },
    { name: "인천", value: "인천" },
    { name: "광주", value: "광주" },
    { name: "대전", value: "대전" },
    { name: "울산", value: "울산" },
    { name: "충청남도", value: "충청남도" },
    { name: "충청북도", value: "충청북도" },
    { name: "경상남도", value: "경상남도" },
    { name: "경상북도", value: "경상북도" },
    { name: "전라남도", value: "전라남도" },
    { name: "전라북도", value: "전라북도" },
    { name: "제주", value: "제주" },
];

export const getYesterdayDate = () =>  {
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    return `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDay()}`;
}

export function daysInMonth (month, year) {
    return new Date(year, month+1, 0).getDate();
}


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

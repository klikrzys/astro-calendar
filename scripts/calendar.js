import {daysInMonth} from './helpers.js';
import { getModel } from './model.js';
import { api_key } from '../config.js'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let display_date = new Date(); // get current year and month to display calendar
display_date.setDate(1); // only month and year is relevant, so we set date to 1 

let display_month = display_date.getMonth()+1;
let month = display_month-1; // js new Date indexes months from 0
let display_year = display_date.getFullYear();

function getDayNameTag(day) {
    let date = new Date(display_date);
    date.setDate(day);
    const opt = { weekday: "short" };
    const dayName = new Intl.DateTimeFormat("en-US", opt).format(date);
    return `<div class="weekname">${dayName}</div>`;
}

function generateCalendar() {
    // refresh all the dates inside calendar
    // by removing 
    let calendar = document.querySelector("#calendar");
    let old_dates = calendar.querySelector("#calendarDays");
    old_dates.remove()
    
    // and creating div from the start
    let new_calendar_dates = document.createElement('div');
    new_calendar_dates.id = "calendarDays";
    calendar.appendChild(new_calendar_dates);

    // now let's generate the dates
    calendar = document.querySelector("#calendarDays");
    
    let last_month_ite = display_date.getDay()-1; // how many days from prev month should be displayed 
    
    if(display_date.getDay() != 1) {
        
        //we need to know, what where the last dates at the end of the 
        // previous month
        let days_in_last_month;
        if (month == 0) { // if it's janurary  
            days_in_last_month = 31; // then the prev month was december
        }else{
            days_in_last_month = daysInMonth(month-1, display_year); // else check prev month
        }
        
        // first date of last month that will be displayed
        let date_ite = days_in_last_month-last_month_ite+1;
        
        // iterate thru last month dates
        for(let prev_dates = 0; prev_dates < last_month_ite; prev_dates++){
            const temp_date = date_ite+prev_dates; 
            
            calendar.insertAdjacentHTML("beforeend",
                `<div class="day prevMonthDay">${getDayNameTag(temp_date)}${temp_date}</div>`
            )
        }
        
    }

    const dis_month_days_num = daysInMonth(month, display_year);
    
    // itarate thru each day of the month to generate calendar
    for(let date = 1; date <= dis_month_days_num; date++){    
        
        let name_tag = "";
        if(date <= 7-last_month_ite) { // we want to mark only first 7 days
            name_tag = getDayNameTag(date);
        }

        calendar.insertAdjacentHTML("beforeend", 
            `<div class="day" id="day${date}">${name_tag}${date}</div>`
        )
    }
}

function setBirthdays() {
    let people = getModel();
    let indexes_for_month = [] // indexes of birthdays which should be displayed on calendar 
    people.forEach((person, index)=>{
        let his_month = new Date(person.birthdate).getMonth();
        if(his_month === month) {
            // we found a person that has birthdate in this month
            // we keep where he is in the array, so we can have fun later <3
            indexes_for_month.push(index);        
        }
    });
    
    const birthdays_num = indexes_for_month.length; 
    
    // iterate thru elem indexes which have birthday (in this month)
    for(let i=0; i<birthdays_num; i++){
        const brthday_indx = indexes_for_month[i];    
        const aperson = people[brthday_indx];
        
        const brthday_num = new Date(aperson.birthdate).getDate().toString();
        
        const calendarElem = document.getElementById("day"+brthday_num);
        calendarElem.classList.add("birthday"); // change style of this day
        calendarElem.setAttribute("onclick",`openModal(${aperson.id})`);
        
        // now we fetch cool background photo from APOD API
        const getBackgroundImg = async (date) => {
            const api_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;
            const response = await fetch(api_url);
            const myJson = await response.json(); //extract JSON from the http response
            calendarElem.style.backgroundImage = `url('${myJson.url}')`;
        }
        getBackgroundImg(aperson.birthdate);
    }
}

// Calendar controls
export function next_month() {
    let temp = new Date(display_date)
    
    const current_month = temp.getMonth(); // +1, index from 0
    if(current_month === 11) {
        display_date = new Date(display_year+1, 0, 1); // we start at february of next year
    }else{
        temp.setMonth( current_month+1 );
        display_date = temp;
    }
    renderCalendar();
}

export function prev_month() {
    let temp = new Date(display_date)
    
    const current_month = temp.getMonth(); // +1, index from 0
    if(current_month === 0) {
        display_date = new Date(display_year-1, 11, 1); // we start at december of prev year
    }else{
        temp.setMonth( current_month-1 );
        display_date = temp;
    }
    renderCalendar();
}

export function renderCalendar() {
    // on calendar 
    display_month = display_date.getMonth()+1;
    month = display_month-1; // js new Date indexes months from 0
    display_year = display_date.getFullYear();

    // set year and month display
    let date_tag = document.getElementById("date");
    date_tag.querySelector("h1").innerHTML = months[display_month-1];
    date_tag.querySelector("p").innerHTML = display_date.getFullYear();

    generateCalendar();
    setBirthdays();
} 
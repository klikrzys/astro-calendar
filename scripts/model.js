import {renderTable} from './table.js';
import {renderCalendar} from './calendar.js';

export var proto = {
    id: -1,
    name: "", 
    photo: "", // base64 
    fileName: "", // name 
    birthdate: "", 
    email: "", 
    phone: ""
};

var birthdays = [];

export function updateModel(new_birthdays) {
    birthdays = new_birthdays;

    // Display collected data :)
    renderTable();
    renderCalendar();

    // Model changed, so save to localstorage :3
    localStorage.setItem('nasa_calendar_data', JSON.stringify(birthdays));
}

export function getModel() {
    return birthdays;
}

export function findById(id, callback){
    let data = getModel();
    let result, i;
    for(i=0; i<data.length; i++){
        if(data[i].id == id){
            result = data[i];
            break;
        }
    }
    callback(result, i);
}
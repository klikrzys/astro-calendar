import {renderTable} from './table.js';
import {renderCalendar} from './calendar.js';

/* name, photo (BASE64), birth date, e-mail, phone */
export var proto = {
    id: -1,
    name: "", 
    photo: "", 
    birthdate: "", 
    email: "", 
    phone: ""
};

var birthdays = [
    { id:"0", name: "Hania", photo: "", birthdate: "2001-05-01", email: "hania@gmail.com", phone: "+483132112" }, 
    { id:"1", name: "Kasia", photo: "", birthdate: "2001-07-22", email: "kasia@gmail.com", phone: "+483132112" },
    { id:"2", name: "Kasia2", photo: "", birthdate: "2001-07-23", email: "kasia@gmail.com", phone: "+483132112" }
];

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
import { getYesterdayDate } from './scripts/helpers.js';
import {renderTable, actionUpdate, actionDel} from './scripts/table.js';
import {submitAddForm, submitUpdateForm, hideUpdateForm} from './scripts/form.js';
import { updateModel  } from './scripts/model.js';
import { renderCalendar, prev_month, next_month } from './scripts/calendar.js';
import { openModal, closeModal } from './scripts/modal_window.js';

// onclick table actions
window.actionUpdate = actionUpdate;
window.actionDel = actionDel;
window.submitAddForm = submitAddForm;
window.submitUpdateForm = submitUpdateForm;
window.hideUpdateForm = hideUpdateForm;

// calendar controls
window.prev_month = prev_month;
window.next_month = next_month;
window.openModal = openModal;
window.closeModal = closeModal;

// check if there is something in localstorage and load it
const whatsInStorage = JSON.parse(localStorage.getItem('nasa_calendar_data'));
if (whatsInStorage !== null && whatsInStorage !== undefined) {
    updateModel(whatsInStorage);
}

// set max day to yesterday on datepicker
let datepickers = document.querySelectorAll('[name="birthdate"]');
let yesterdayDate = getYesterdayDate();
datepickers[0].max = yesterdayDate; 
datepickers[1].max = yesterdayDate;

// Display collected data :)
renderTable();
renderCalendar();
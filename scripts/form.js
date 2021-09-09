import {renderTable} from './table.js';
import { getModel, updateModel, proto as person, findById } from './model.js';
import { toBase64 } from './helpers.js';

function validateForm(form_selector, success) {
    const parentElement = document.querySelector(form_selector);
    let name = parentElement.querySelectorAll('[name="first_name"]')[0].value;
    let birthdate = parentElement.querySelectorAll('[name="birthdate"]')[0].value;
    let photo = parentElement.querySelectorAll('[name="fileElem"]')[0].value
    let email = parentElement.querySelectorAll('[name="email"]')[0].value;
    let phone = parentElement.querySelectorAll('[name="phone"]')[0].value; // a path to file
    
    let re = /(?:\.([^.]+))?$/;
    const ext = re.exec(photo)[1]; // get photo extension from path
    if( ext === "png" || ext === "jpg" ) {
        if (name == "" || birthdate == "" || email == "" || phone == "" || photo == ""){
            parentElement.querySelector(".alert").classList.add("active");
        }else{
            success();
        }
    }else{
        alert("File extension can be only .jpg and .png ");
    }
}


async function loadFile(form_selector, resolve) {
    const parentElement = document.querySelector(form_selector);
    const file = parentElement.querySelector('[name="fileElem"]').files[0];
    const result = await toBase64(file)
    
    resolve(result);
}

// ADD FORM
export function submitAddForm() { 
    validateForm("#addForm", () => { 
        loadFile("#addForm", (base64) => {
            const parentElement = document.querySelector('#addForm');
            parentElement.querySelector(".alert").classList.remove("active"); // hide alerts
            
            var new_elem = Object.create(person);
            new_elem.id = Date.now(); // unique timestamp
            new_elem.name = parentElement.querySelectorAll('[name="first_name"]')[0].value;
            new_elem.birthdate = parentElement.querySelectorAll('[name="birthdate"]')[0].value;
            new_elem.email = parentElement.querySelectorAll('[name="email"]')[0].value;
            new_elem.phone = parentElement.querySelectorAll('[name="phone"]')[0].value;
            new_elem.photo = base64;

            const birthdays = getModel();
            birthdays.push(new_elem);
            updateModel(birthdays); // update data model
            
            renderTable(); // re-render the page
            
        }); 
    }); 
}

export function submitUpdateForm() {
    validateForm("#updateForm", ()=>{
        loadFile("#addForm", (base64) => {
            const parentElement = document.querySelector('#updateForm');
            parentElement.querySelector(`.alert`).classList.remove("active"); // hide alerts
            
            const updated_elem_id = parentElement.querySelectorAll('[name="edited_id"]')[0].value
            
            let updated_elem = Object.create(person);
            
            updated_elem.id = updated_elem_id;
            updated_elem.name = parentElement.querySelectorAll('[name="first_name"]')[0].value;
            updated_elem.birthdate = parentElement.querySelectorAll('[name="birthdate"]')[0].value;
            updated_elem.email = parentElement.querySelectorAll('[name="email"]')[0].value;
            updated_elem.phone = parentElement.querySelectorAll('[name="phone"]')[0].value;
            updated_elem.photo = base64;

            // update element
            const birthdays = getModel();
            findById(updated_elem_id, (old_elem, index)=>{
                birthdays[index] = updated_elem;
            });
            updateModel(birthdays); // update data model
            
            renderTable(); // re-render the page
            hideUpdateForm();
        });
    });
}

export function hideUpdateForm(){
    document.querySelector('#updateForm').style.display = "none";
    document.querySelector('#addForm').style.display = "block";
}
import { getModel, updateModel, findById } from './model.js';

/** TABLE DISPLAY FUNCTIONS */

function generate_row(person_data) {
    // we create new row
    var table_row = document.createElement("tr");
    
    // and than fill row content
    var template = `<td>${person_data.name}</td>`+
        `<td><button class="btn" onclick="openModal(${person_data.id});">show</button></td>`+
         `<td><button class="btn" onclick="actionUpdate(${person_data.id});">update</button></td>`+
         `<td><button class="btn" onclick="actionDel(${person_data.id});">delete</button></td>`;
    
    table_row.insertAdjacentHTML('beforeend', template);

    return table_row;
}

// get element and generate option table
function renderTable(){
    let birthdays = getModel();
    
    // clear table == delete old table body and create new
    var table = document.getElementById("birthdayRecords");
    
    var old_tbody = table.getElementsByTagName("tbody")[0];
    old_tbody.remove();
    
    // generate from new
    var rows_num = birthdays.length;
    var new_tbody = document.createElement('tbody');
    
    if(rows_num > 0){   
        var new_row = "";
        for(var i=0; i<rows_num; i++){
            new_row = generate_row(birthdays[i], new_tbody);
            new_tbody.appendChild(new_row);
        }
        table.appendChild( new_tbody );
    }else{
        var nodata_row = '<tr><td colspan="4">input birthdates of your friends and loved ones &#127752;</td></tr>';
        table.insertAdjacentHTML( 'beforeend', nodata_row );
    }

}

// TABLE ACTIONS! :D

// prepare and show update form
function actionUpdate(id){
    const parentElement = document.querySelector('#updateForm');
    findById(id, (updated_elem)=>{
        parentElement.querySelectorAll('[name="edited_id"]')[0].value = updated_elem.id;
        parentElement.querySelectorAll('[name="first_name"]')[0].value = updated_elem.name;
        parentElement.querySelectorAll('[name="birthdate"]')[0].value = updated_elem.birthdate;
        parentElement.querySelectorAll('[name="email"]')[0].value= updated_elem.email;
        parentElement.querySelectorAll('[name="phone"]')[0].value = updated_elem.phone;
        parentElement.style.display = "block" // show form
        
        document.querySelector('#addForm').style.display = "none"; // hide second form
    });
}

function actionDel(id){
    let birthdays = getModel();

    findById(id, (old_elem, index)=>{
        // throw element out of array at index
        birthdays.splice(index, 1);
        updateModel(birthdays);
    });
}

export {renderTable, actionUpdate, actionDel}
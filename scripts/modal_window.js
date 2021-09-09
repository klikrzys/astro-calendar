import { findById } from './model.js';
import { api_key } from '../config.js';

export function openModal(elem_id) {
    findById(elem_id, (person) => {
        const parentElement = document.querySelector('#modal');
        
        // setup modal data
        parentElement.querySelector('.birthdate').innerHTML = `<h3>${person.birthdate}</h3>`;
        parentElement.querySelector('.image').src = person.photo;
        parentElement.querySelector('.name').innerHTML = person.name;
        parentElement.querySelector('.email').innerHTML = person.email;
        parentElement.querySelector('.phone').innerHTML = person.phone;
        
        // set cool foto on modal banner
        const getBackgroundImg = async (date) => {
            const api_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`;
            const response = await fetch(api_url);
            const myJson = await response.json(); //extract JSON from the http response
            parentElement.querySelector('.banner').style.backgroundImage = `url('${myJson.url}')`;
        }
        getBackgroundImg(person.birthdate);
        
        document.querySelector(".modal-bg").classList.add("active");
    });
}

export function closeModal() {
    document.querySelector(".modal-bg").classList.remove("active");
}

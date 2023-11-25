
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputs = form.querySelectorAll('input, textarea');
let saveStateThrottled = null;

function saveState() {
 const formData = {
    email: inputs[0].value,
    message: inputs[1].value,
 };
 localStorage.setItem('feedback-form-state', JSON.stringify(formData));
 console.log(formData);
}

function throttledSaveState() {
 if (!saveStateThrottled) {
    saveStateThrottled = setTimeout(() => {
      saveState();
      saveStateThrottled = null;
    }, 500);
 }
}

form.addEventListener('input', throttledSaveState);

form.addEventListener('submit', (event) => {
 event.preventDefault();
 saveState();
 localStorage.removeItem('feedback-form-state');
 inputs[0].value = '';
 inputs[1].value = '';
});

const storedData = localStorage.getItem('feedback-form-state');
if (storedData) {
 const formData = JSON.parse(storedData);
 inputs[0].value = formData.email;
 inputs[1].value = formData.message;
import throttle from 'lodash.throttle';

const formSubmit = document.querySelector('.feedback-form');
const value = localStorage.getItem('feedback-form-state');
if (value !== null) {
  const parseValue = JSON.parse(value);
  const { email, message } = formSubmit;
  email.value = parseValue.email;
  message.value = parseValue.message;
}

const formHandler = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
};
const inputHandler = event => {
  const { email, message } = event.currentTarget;
  const formItems = { email: email.value, message: message.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(formItems));
};

formSubmit.addEventListener('input', inputHandler);
formSubmit.addEventListener('submit', formHandler);

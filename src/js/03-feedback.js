import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('[name="email"]');
const messageTextarea = feedbackForm.querySelector('[name="message"]');

feedbackForm.addEventListener(
  'input',
  _.throttle(() => {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

document.addEventListener('DOMContentLoaded', () => {
  const storedFormData = localStorage.getItem('feedback-form-state');

  if (storedFormData) {
    const parsedData = JSON.parse(storedFormData);
    emailInput.value = parsedData.email;
    messageTextarea.value = parsedData.message;
  } else {
    emailInput.value = '';
    messageTextarea.value = '';
  }
});

// Submit event listener
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';

  console.log('Form submitted with data:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });
});

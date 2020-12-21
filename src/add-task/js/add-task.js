import flatpickr from 'flatpickr';
import '../css/add-task.css';
import validator from './validator.js';
require("flatpickr/dist/themes/material_blue.css");
const Russian = require("flatpickr/dist/l10n/ru.js").default.ru;

let form = document.forms.form;
let name = form.name,
    description = form.description,
    date = form.date,
    addBtn = form['add-btn'],
    participants = form.participants,
    submit = form.submit,
    successMsg = document.querySelector('.success-message');
    
flatpickr(date, {
  locale: Russian,
  position: "above center",
  minDate: "today",
  monthSelectorType: "static"
});

const validationRules = {
  nameRules: {
    elem: name,
    minLength: 5,
    maxLength: 50,
    errorMessage: name.nextElementSibling, 
  },
  descriptionRules: {
    elem: description,
    minLength: 5,
    maxLength: 500,
    errorMessage: description.nextElementSibling, 
  },
  participantsRules: {
    elem: participants,
    minLength: 5,
    maxLength: 500,
    errorMessage: participants.nextElementSibling, 
  },
  dateRules: {
    elem: date,
    minLength: 10,
    maxLength: 10,
    type: 'date',
    errorMessage: date.nextElementSibling,
  }
};



name.addEventListener("keypress", validator.checkLength.bind(validator, validationRules.nameRules));

description.addEventListener("keypress", validator.checkLength.bind(validator, validationRules.descriptionRules));

participants.addEventListener("keypress", validator.checkLength.bind(validator, validationRules.participantsRules));

addBtn.addEventListener("click", () => {
  participants.classList.toggle('participants-disabled');
});

form.addEventListener("submit", takeForm.bind(validator, validator.checkForm, validationRules));


function takeForm(validateForm, rules, event) {
  event.preventDefault();

  let exception = null;
  if (participants.classList.contains('participants-disabled')) {
    exception = 'participantsRules';
    participants.value = ""
  }
  if(!validateForm.call(this, rules, exception)) return;

  let task = {
    name: name.value.trim(),
    description: description.value.trim(),
    participants: participants.value.split(',').map(n => n.trim()).join(', '),
    date: date.value
  };

  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks ? tasks : [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  successMsg.classList.add('show');
  successMsg.addEventListener('animationend', () => successMsg.classList.remove('show'));

  event.target.reset();
}
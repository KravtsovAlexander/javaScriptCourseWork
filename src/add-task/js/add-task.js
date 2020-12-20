import flatpickr from 'flatpickr';
import '../css/add-task.css';
require("flatpickr/dist/themes/material_blue.css");
const Russian = require("flatpickr/dist/l10n/ru.js").default.ru;

let form = document.forms.form;
let date = form.date;
console.log(date);
flatpickr(date, {
  locale: Russian,
  position: "above center",
  minDate: "today",
  monthSelectorType: "static"
});


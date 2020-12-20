import '../css/tasks-list.css';

let container = document.querySelector('.tasks');
let tasks = JSON.parse(localStorage.getItem('tasks'));
if (!tasks) {
  console.log('NET ZADACH');
} else {
  let i = 0;
  for (let task of tasks) {
    let card = document.createElement('div');
    card.classList.add("task-item");
    card.classList.add("flex-column");
    card.innerHTML = `
      <div class="name-wrapper">
        <span class="name">${task.name}</span>
        <input type="checkbox" class="checkbox" id="checkbox${i}" hidden>
        <label for="checkbox${i}" class="checkmark"></label>
      </div>
      <div class="flex-row task-head">
        <p class="col-3">Список участников:</p>
        <p class="col-7">Описание:</p>
        <p class="col-2">Выполнить до:</p>
      </div>
      <div class="flex-row task-body">
        <div class="participants-wrapper col-3">
          <span class="participants">${task.participant}</span>
        </div>
        <div class="description-wrapper col-7">
          <span class="description">${task.description}</span>
        </div>
        <p class="date-wrapper col-2"><span class="date">${task.date}</span></p>
      </div>
    `;
    container.appendChild(card);
    i++;
  }
}

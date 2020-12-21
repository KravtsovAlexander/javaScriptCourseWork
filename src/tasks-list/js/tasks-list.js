import '../css/tasks-list.css';

let container = document.querySelector('.tasks');
let emptyMessage = document.querySelector('.tasks h2');
let tasks = JSON.parse(localStorage.getItem('tasks'));
if (!tasks || !tasks.length) {
  emptyMessage.classList.add('show');
} else {
  for (let i = 0; i < tasks.length; i++) {
    let card = document.createElement('div');
    card.classList.add("task-item");
    card.classList.add("flex-column");
    card.innerHTML = `
      <div class="name-wrapper">
        <span class="name">${tasks[i].name}</span>
        <input type="checkbox" class="checkbox" id="${i}" hidden>
        <label for="${i}" class="checkmark"></label>
      </div>
      <div class="flex-row task-head">
        <p class="col-3">Список участников:</p>
        <p class="col-7"></p>
        <p class="col-2">Выполнить до:</p>
      </div>
      <div class="flex-row task-body">
        <div class="participants-wrapper col-3">
          <span class="participants">${tasks[i].participants}</span>
        </div>
        <div class="description-wrapper col-7">
          <span class="description">${tasks[i].description}</span>
        </div>
        <p class="date-wrapper col-2"><span class="date">${tasks[i].date}</span></p>
      </div>
    `;
    container.appendChild(card);
  }
}

let taskCards = document.querySelectorAll(".task-item"),
    deleteBtn = document.querySelector('.delete-btn'),
    allCheckboxes = Object.values(document.querySelectorAll('.checkbox')),
    sortOptions = document.querySelectorAll('option');


for (let card of taskCards) {
  card.addEventListener('click', toggleDeleteBtn.bind(card));
  card.querySelector('.description').addEventListener('click', expandHidden);
  card.querySelector('.participants').addEventListener('click', expandHidden);
}
deleteBtn.addEventListener('click', removeTasks);
sortOptions.forEach(opt => opt.addEventListener('click', sortTasks.bind(null, opt.value)));

// ---------------------------------------------------------------------------------------
function toggleDeleteBtn(event) {
  if (event.target === this.querySelector('.checkbox')) {
    if (allCheckboxes.some(checkbox => checkbox.checked &&
        !checkbox.parentElement.parentElement.classList.contains('delete'))) {
      deleteBtn.classList.remove('disabled');
    } else {
      deleteBtn.classList.add('disabled');
    }
  }
}

function removeTasks(event) {
  event.preventDefault();
  for (let i = allCheckboxes.length - 1; i >= 0; i--) {
    if (allCheckboxes[i].checked) {
      let card = allCheckboxes[i].parentElement.parentElement;
      card.classList.add('left-fade-out');
      card.addEventListener('transitionend', () => card.classList.add('delete'));
      tasks.splice(i, 1);
    }
  }
  deleteBtn.classList.add('disabled');
  if (!tasks.length) {
    setTimeout(() => {
      emptyMessage.classList.add('show'); 
    }, 500);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function sortTasks(direction) {
  if (!direction) return;
  let tempArr = [];
  tasks.forEach(task => tempArr.push(task.date));
  tempArr.sort((a, b) => new Date(a) - new Date(b));
  if (direction === 'newer') tempArr.reverse();
  for (let elem of tempArr) {
    for (let card of taskCards) {
      if(card.querySelector('.date').innerText === elem) {
        container.append(card);
      }
    }
  }
}

function expandHidden(event) {
  event.target.parentElement.classList.add('show-hidden');
  event.target.classList.add('show-itself');
  event.target.addEventListener('mouseout', () => {
    event.target.parentElement.classList.remove('show-hidden');
    event.target.classList.remove('show-itself');
  });
}
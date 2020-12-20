import '../css/tasks-list.css';

let container = document.querySelector('.tasks');

for (let i = 0; i < 10; i++) {
  let card = document.createElement('div');
  card.classList.add("task-item");
  card.classList.add("flex-column");
  card.innerHTML = `
    <div class="name-wrapper">
      <span class="name">30 символов</span>
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
        <span class="participants">asdlf, sldkfjlasdjf, lsdkjflaskdj, lskjadflj, laskdjflj, lkasdjfl, lkasjdfl, lkajsdflj, laksdjflj, asdflasjdflsajd, laskdjflasdjf, lajsdf, kljasdf, lkasjdfl</span>
      </div>
      <div class="description-wrapper col-7">
        <span class="description">Краткое описание Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus provident eligendi, dolore consectetur, ipsum voluptatum vero voluptate eveniet obcaecati ratione iusto temporibus! Reiciendis porro minima eaque expedita, at labore nemo.Lorem Краткое описание Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus provident eligendi, dolore consectetur, ipsum voluptatum vero voluptate eveniet obcaecati ratione iusto temporibus! Reiciendis porro minima eaque expedita, at labore nemo.Lorem</span>
      </div>
      <p class="date-wrapper col-2"><span class="date">12.12.2020</span></p>
    </div>
  `;
  container.appendChild(card);
}
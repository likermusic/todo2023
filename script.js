const cross = document.querySelector('.cross');
const addInput = document.querySelector('.add input');

function renderItem(markup, outputClass) {

  document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);

}

function removeActiveCrossClass() {
  cross.classList.remove('cross-active');
}

function clearInput(input) {
  input.value = '';

  removeActiveCrossClass();
}

function showCross() {
  addInput.value.trim() ? cross.classList.add('cross-active') : removeActiveCrossClass();
}

function addItemToLS(name, source, params = null) {
  let items = getItemsFromLS(source);

  let newItem;
  let id;

  if (items.length == 0) {
    id = 1;
    newItem = { id, name, ...params };
  } else {
    id = items[items.length - 1].id + 1;
    newItem = { id, name, ...params };
  }

  items.push(newItem);

  localStorage.setItem(source, JSON.stringify(items));
  return id;
}

function getItemsFromLS(key) {

  return JSON.parse(localStorage.getItem(key)) || [];

}

function actionAfterClickBtnAdd(event) {
  const input = event.target.parentElement.querySelector('.add input');

  const tasks = getItemsFromLS('tasks');
  const id = tasks[tasks.length - 1].id + 1;

  const li = `<li class="rounded" data-id = "${id}">
    <span>${input.value}</span>
    <div class="btn-actions">
      <a href="" class="text-white btn-important me-1 d-inline-block">
        <i class="bi bi-patch-exclamation fs-5"></i>
      </a>
      <a href="" class="text-white btn-delete">
        <i class="bi bi-x fs-3"></i>
      </a>
    </div>
  </li>`;

  if (addInput.value.trim()) {
    // let id = addItemToLS(input.value, 'tasks', { important: false, done: false });
    addItemToLS(input.value, 'tasks', { important: false, done: false });

    renderItem(li, '.list');

    clearInput(input);
  }
}

document.querySelector('.btn-add').addEventListener('click', actionAfterClickBtnAdd);

document.addEventListener('keydown', (event) => {
  const input = event.target.parentElement.querySelector('.add input');

  const tasks = getItemsFromLS('tasks');
  const id = tasks[tasks.length - 1].id + 1;

  const li = `<li class="rounded">
    <span>${input.value}</span>
    <div class="btn-actions">
      <a href="" class="text-white btn-important me-1 d-inline-block">
        <i class="bi bi-patch-exclamation fs-5"></i>
      </a>
      <a href="" class="text-white btn-delete">
        <i class="bi bi-x fs-3"></i>
      </a>
    </div>
  </li>`;

  if ((event.keyCode == 13 || event.keyCode == 9) && addInput.value.trim()) {
    addItemToLS(input.value, 'tasks', { important: false, done: false });

    renderItem(li, '.list');

    clearInput(input);
  }
});

addInput.addEventListener('input', showCross);

cross.addEventListener("click", (event) => {
  const input = addInput;

  clearInput(input);
});

document.addEventListener('DOMContentLoaded', () => {
  const tasks = getItemsFromLS('tasks');

  tasks.forEach((item) => {

    const li = `<li class="rounded" data-id = ${item.id}>
    <span class="${item.done == true ? 'done' : ''}">${item.name}</span>
    <div class="btn-actions">
      <a href="" class="text-white btn-important me-1 d-inline-block">
        <i class="bi bi-patch-exclamation fs-5"></i>
      </a>
      <a href="" class="text-white btn-delete">
        <i class="bi bi-x fs-3"></i>
      </a>
    </div>
  </li>`;

  renderItem(li, '.list');
  });
});

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.matches('span')) {
    const tasks = getItemsFromLS('tasks');

    tasks.forEach((item, ind) => {
      if (e.target.parentElement.dataset.id == item.id) {
        item.done = !item.done;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    e.target.classList.toggle('done');
  }
});
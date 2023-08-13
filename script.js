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
  let items = JSON.parse(localStorage.getItem(source)) || [];

  let newItem;

  if (items.length == 0) {
    newItem = { id: 1, name, ...params };
  } else {
    const id = items[items.length - 1].id + 1;
    newItem = { id, name, ...params };
  }

  items.push(newItem);

  localStorage.setItem(source, JSON.stringify(items));
}

document.querySelector('.btn-add').addEventListener('click', function(event) {
  const input = event.target.parentElement.querySelector('.add input');
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

  if (addInput.value.trim()) { 
    addItemToLS(input.value, 'tasks', { important: false, done: false });

    renderItem(li, '.list');

    clearInput(input);
  }

});

document.addEventListener('keydown', function(event) {
  const input = event.target.parentElement.querySelector('.add input');
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

document.querySelector('.cross').
addEventListener("click", clearInput);




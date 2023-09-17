const addInput = document.querySelector('.add input');
const filterSearch = document.querySelector('.filter input');
let filterParams = {
  search: '',
  state: 'all'
}

function renderItem(markup, outputClass) {
  document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
}

function addActiveClass(markup) {
  markup.classList.add('cross-active');
}

function removeActiveClass(markup) {
  markup.classList.remove('cross-active');
}

function clearInput(input) {
  input.value = '';
}

function showCross() {
  const addCross = document.querySelector('.add-cross');
  const filterCross = document.querySelector('.filter-cross');

  addInput.value.trim() ? addActiveClass(addCross) : removeActiveClass(addCross);

  filterSearch.value.trim() ? addActiveClass(filterCross) : removeActiveClass(filterCross);
}

function addItemToLS(name, source, params = null) {

  try {

    let items = getItemsFromLS(source);

    let newItem;
    let id = setId();

    if (items.length == 0) {
      newItem = { id, name, ...params };
    } else {
      newItem = { id, name, ...params };
    }

    items.push(newItem);

    localStorage.setItem(source, JSON.stringify(items));
    return id;

  } catch (error) {
    return false;
  }

}

function removeItemFromLS(id, source) {

  const tasks = getItemsFromLS(source);

  (tasks.length > 0) && tasks.forEach((item, ind) => {
    if (item.id == id) {
      tasks.splice(ind, 1);
      return;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getItemsFromLS(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function getId() {
  return localStorage.getItem('idCounter') || 0;
}

function setId() {
  let idCounter = +getId();
  idCounter++;

  localStorage.setItem('idCounter', idCounter);

  return idCounter;
}

function addItemToScreen() {
  ['click', 'keydown'].forEach(eventName => {
    document.addEventListener(eventName, (event) => {
      const input = addInput;

      const tasks = getItemsFromLS('tasks');

      let id;

      if (tasks.length == 0) {
        id = 1;
      } else {
        id = tasks[tasks.length - 1].id + 1;
      }

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

      if ((event.target.matches('.btn-add') && (addInput.value.trim())) || ((event.key === 'Enter' || event.key === 'Tab') && addInput.value.trim())) {

        addItemToLS(input.value, 'tasks', { important: false, done: false });

        renderItem(li, '.list');

        const count = countParams('tasks');
        renderParams(count);

        clearInput(input);
      }

    });
  });
}

function countParams(source, arr = null) {
  const tasks = arr || getItemsFromLS(source);

  if (tasks.length > 0) {
    const countDone = tasks.reduce((acc, item) => {
      return item.done ? ++acc : acc;
    }, 0);

    const countActive = tasks.length - countDone;

    return { countDone, countActive };
  } else {
    return { countDone: 0, countActive: 0 };
  }
}

function renderParams(count) {
  document.querySelector('#done').textContent = count.countDone;

  document.querySelector('#active').textContent = count.countActive;
}

function filterItems(items) {
  switch (filterParams.state) {
    case 'all':
      return items.filter(function (item) {
        return item.name.toLowerCase().search(filterParams.search.toLowerCase()) != -1
      })
      break;
    case 'active':
      return items.filter(function (item) {
        return item.name.toLowerCase().search(filterParams.search.toLowerCase()) != -1 && item.done !== true;
      })
      break;
    case 'done':
      return items.filter(function (item) {
        return item.name.toLowerCase().search(filterParams.search.toLowerCase()) != -1 && item.done == true;
      })
      break;
  }
}

document.querySelector('.wrapper').addEventListener('input', (event) => {
  if (event.target.matches('.add input, .filter input')) {
    showCross();
  }
});

document.querySelectorAll('.cross').forEach(elem => {
  elem.addEventListener('click', (event) => {
    const items = document.querySelectorAll('.list li');

    if (event.target.matches('.cross')) {

      clearInput(event.target.nextElementSibling);
      removeActiveClass(event.target);

    } else if (event.target.matches('.cross i')) {

      clearInput(event.target.parentElement.nextElementSibling);
      removeActiveClass(event.target.parentElement);

    }

    const value = filterParams.search = '';
  const tasks = getItemsFromLS('tasks');
  const filtered = filterItems(tasks);

  const outputClass = '.list';
  document.querySelector(outputClass).innerHTML = '';

  filtered.forEach(function (item) {
    const li = `<li class="rounded" data-id = "${item.id}">
      <span class="${item.done == true ? 'done' : ''} ${item.important == true ? 'important' : ''}">${item.name}</span>
      <div class="btn-actions">
        <a href="" class="text-white btn-important me-1 d-inline-block">
          <i class="bi bi-patch-exclamation fs-5"></i>
        </a>
        <a href="" class="text-white btn-delete">
          <i class="bi bi-x fs-3"></i>
        </a>
      </div>
    </li>`
    renderItem(li, outputClass);
  });

  const obj = countParams(null, filtered);
  renderParams(obj);

    // if (event.target.matches('.filter-cross, .filter-cross i')) {

    //   items.forEach(elem => {
    //     elem.hidden = false;
    //   });

    // }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tasks = getItemsFromLS('tasks');

  (tasks.length > 0) && tasks.forEach((item) => {
    const li = `<li class="rounded" data-id = ${item.id}>
    <span class="${item.done == true ? 'done' : ''} ${item.important == true ? 'important' : ''}">${item.name}</span>
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

  addItemToScreen();

  const count = countParams('tasks'); // обьект
  renderParams(count);
});

document.querySelector('.list').addEventListener('click', (e) => {
  e.preventDefault();

  function modifyItemData(param) {

    const tasks = getItemsFromLS('tasks');

    tasks.forEach((item, ind) => {
      if (e.target.closest('li').dataset.id == item.id) {
        item[param] = !item[param];
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  if (e.target.matches('span')) {
    e.target.classList.toggle('done');

    modifyItemData('done');

    const count = countParams('tasks'); // обьект
    renderParams(count);
  }

  if (e.target.matches('.btn-important, .btn-important > i')) {
    e.target.closest('li').querySelector('span').classList.toggle('important');

    modifyItemData('important');
  }

  if (e.target.matches('.btn-delete, .btn-delete i')) {
    const id = e.target.closest('li').dataset.id;

    const isError = removeItemFromLS(id, 'tasks');

    if (!isError) {
      e.target.closest('li').remove();

      const count = countParams('tasks'); // обьект
      renderParams(count);
    } else {
      alert('Sorry, error');
    }

  }
});


document.querySelector('.filter-input').addEventListener('input', function (e) {
  const value = filterParams.search = e.target.value;
  const tasks = getItemsFromLS('tasks');
  const filtered = filterItems(tasks);

  const outputClass = '.list';
  document.querySelector(outputClass).innerHTML = '';

  filtered.forEach(function (item) {
    const li = `<li class="rounded" data-id = "${item.id}">
      <span class="${item.done == true ? 'done' : ''} ${item.important == true ? 'important' : ''}">${item.name}</span>
      <div class="btn-actions">
        <a href="" class="text-white btn-important me-1 d-inline-block">
          <i class="bi bi-patch-exclamation fs-5"></i>
        </a>
        <a href="" class="text-white btn-delete">
          <i class="bi bi-x fs-3"></i>
        </a>
      </div>
    </li>`
    renderItem(li, outputClass);
  });

  const obj = countParams(null, filtered);
  renderParams(obj);

})

document.querySelector('.filter .btn-group').addEventListener('click', function (e) {
  if (e.target.matches('.btn')) {
    this.querySelector('.btn-light.text-dark.fw-bold').classList.remove('btn-light', 'text-dark', 'fw-bold');
    e.target.classList.add('btn-light', 'text-dark', 'fw-bold');

    let filtered;
    const tasks = getItemsFromLS('tasks');
    if (e.target.classList.contains('filter-all')) {
      filterParams.state = 'all';
      filtered = filterItems(tasks);
    } else if (e.target.classList.contains('filter-active')) {
      filterParams.state = 'active';
      filtered = filterItems(tasks);
    } else if (e.target.classList.contains('filter-done')) {
      filterParams.state = 'done';
      filtered = filterItems(tasks);
    }

    const outputClass = '.list';
    document.querySelector(outputClass).innerHTML = '';

    filtered.forEach(function (item) {
      const li = `<li class="rounded" data-id = "${item.id}">
      <span class="${item.done == true ? 'done' : ''} ${item.important == true ? 'important' : ''}">${item.name}</span>
      <div class="btn-actions">
        <a href="" class="text-white btn-important me-1 d-inline-block">
          <i class="bi bi-patch-exclamation fs-5"></i>
        </a>
        <a href="" class="text-white btn-delete">
          <i class="bi bi-x fs-3"></i>
        </a>
      </div>
    </li>`
      renderItem(li, outputClass);
    });

    const obj = countParams(null, filtered);
    renderParams(obj);
    //
  }
})

// btn-light text-dark fw-bold

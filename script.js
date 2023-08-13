const cross = document.querySelector('.cross');
const addInput = document.querySelector('.add input');

function addTask() {
  // let value = this.parentElement.querySelector('input').value;
  let value = addInput.value;

  let li = `<li class="rounded">
  <span>${value}</span>
  <div class="btn-actions">
    <a href="" class="text-white btn-important me-1 d-inline-block">
      <i class="bi bi-patch-exclamation fs-5"></i>
    </a>
    <a href="" class="text-white btn-delete">
      <i class="bi bi-x fs-3"></i>
    </a>
  </div>
</li>`;

  document.querySelector('.list').insertAdjacentHTML('beforeend', li);

  clearInput();

}

function removeActiveCrossClass() {
  cross.classList.remove('cross-active');
}

function clearInput() {
  addInput.value = '';

  removeActiveCrossClass();
}

function showCross() {
  addInput.value.trim() ? cross.classList.add('cross-active') : removeActiveCrossClass();
}

document.querySelector('.btn-add').addEventListener('click', function() {
  if (addInput.value.trim()) { 
    addTask();
  }
});
document.addEventListener('keydown', function(event) {
  if ((event.keyCode == 13 || event.keyCode == 9) && addInput.value.trim()) {
    addTask();
  }
});

addInput.addEventListener('input', showCross);
document.querySelector('.cross').addEventListener("click", clearInput);




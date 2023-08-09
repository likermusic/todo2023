
function addTask() {
  // let value = this.previousElementSibling.value;
  let value = this.parentElement.querySelector('input').value;

  let li = `<li class="list-group-item">
  <span>${value}</span>
  <div class="btn-actions">
    <a href="" class="text-white btn-important me-1">
      <i class="bi bi-exclamation-circle-fill fs-5"></i>
    </a>
    <a href="" class="text-white btn-delete">
      <i class="bi bi-x-circle-fill fs-5"></i>
    </a>
  </div>
  </li>`;

  document.querySelector('.list').insertAdjacentHTML('beforeend', li);

}

document.querySelector('.btn-add').addEventListener('click', addTask);




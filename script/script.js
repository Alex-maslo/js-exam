let addButton = document.getElementById("btn-add");
let sortByNameBtn = document.getElementById("btn-sort-by-name");
let sortByValueBtn = document.getElementById("btn-sort-by-value");
let deleteSelectedBtn = document.getElementById("btn-delete-selected");
const list = document.getElementById("pair-list");

// масив даних, введених користувачем
let dataArray = [];

// функція перевірки коректності даних та формування масиву
function addNameValuePair(input) {
  // видаляємо зайві пробіли
  input = input.split("=").map((element) => element.trim());

  // перевірка коректності введених даних
  if (
    input.length === 2 &&
    input[0].match(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐъЪ0-9]+$/) &&
    input[1].match(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐъЪ0-9]+$/)
  ) {
    dataArray.push({ name: input[0], value: input[1] });
  } else {
    alert(`Перевірте коректність введення даних <name> = <value>`);
  }

  return dataArray;
}

//  функція для генерування списку на сторінку
function renderList(objectArray) {
  // очищення списку елементів
  document.getElementById("pair-list").innerHTML = "";

  // додаємо список елементів з масиву об'єктів
  objectArray.forEach(({ name, value }, index) => {
    const listElement = document.createElement("li");
    listElement.id = index;
    listElement.classList.add("list-element");
    listElement.textContent = `${name} = ${value}`;
    list.appendChild(listElement);
  });
}

// обробник кнопки додати дані
addButton.addEventListener("click", function () {
  let inputValue = document.getElementById("input-pair").value;
  addNameValuePair(inputValue);
  renderList(dataArray);
});

// обробник кнопки сортувати за ім'ям
sortByNameBtn.addEventListener("click", function () {
  dataArray.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1;
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
    return 0;
  });

  renderList(dataArray);
});

// обробник кнопки сортувати за значенням
sortByValueBtn.addEventListener("click", function () {
  dataArray.sort((a, b) => {
    if (a.value.toLocaleLowerCase() < b.value.toLocaleLowerCase()) return -1;
    if (a.value.toLocaleLowerCase() > b.value.toLocaleLowerCase()) return 1;
    return 0;
  });

  renderList(dataArray);
});

// виділення елементів

// масив для виділених елементів
let delElement = [];

// обробник для виділених елементів, індекси яких додаються в масив
list.addEventListener("click", (e) => {
  const listItem = e.target.closest(".list-element");
  delElement = [];
  if (listItem) {
    listItem.classList.toggle("select");
    document.querySelectorAll(".select").forEach(({ id }) => {
      delElement.push(parseInt(id));
    });
  }
});

// обробник кнопки видалити виділені елементи
deleteSelectedBtn.addEventListener("click", () => {
  dataArray = dataArray.filter((value, index) => {
    return !delElement.includes(index);
  });

  renderList(dataArray);
  delElement = [];
});

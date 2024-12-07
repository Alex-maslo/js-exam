let addButton = document.getElementById("btn-add");
let sortByNameBtn = document.getElementById("btn-sort-by-name");
let sortByValueBtn = document.getElementById("btn-sort-by-value");
let deleteSelectedBtn = document.getElementById("btn-delete-selected");

let dataArray = [];
let testArray = [
  { name: "John", value: "John123" },
  { name: "city", value: "Kyiv" },
  { name: "product", value: "Laptop" },
  { name: "age", value: "30" },
  { name: "country", value: "Ukraine" },
];

dataArray = testArray;

function addNameValuePair(input) {
  // видаляємо зайві пробіли
  input = input.split("=").map((element) => element.trim());

  // перевірка коректності введених даних
  if (
    input.length === 2 &&
    input[0].match(/^[a-zA-Zа-яА-Я0-9]+$/) &&
    input[1].match(/^[a-zA-Zа-яА-Я0-9]+$/)
  ) {
    dataArray.push({ name: input[0], value: input[1] });
  } else {
    alert(`Перевірте коректність введення даних <name> = <value>`);
  }
  return dataArray;
}

function renderList(objectArray) {
  // очищення списку елементів
  document.getElementById("pair-list").innerHTML = "";

  // додаємо список елементів з масиву об'єктів
  objectArray.forEach(({ name, value }, index) => {
    const listElement = document.createElement("li");
    listElement.id = index + 1;
    listElement.textContent = `${name} = ${value}`;
    document.getElementById("pair-list").appendChild(listElement);
  });
}

addButton.addEventListener("click", function () {
  let inputValue = document.getElementById("input-pair").value;
  addNameValuePair(inputValue);
  renderList(dataArray);
});

sortByNameBtn.addEventListener("click", function () {
  dataArray.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1;
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
    return 0;
  });

  renderList(dataArray);
});

sortByValueBtn.addEventListener("click", function () {
  dataArray.sort((a, b) => {
    if (a.value.toLocaleLowerCase() < b.value.toLocaleLowerCase()) return -1;
    if (a.value.toLocaleLowerCase() > b.value.toLocaleLowerCase()) return 1;
    return 0;
  });

  renderList(dataArray);
});

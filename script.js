const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let data = []

loadDataFromLocalStorage();
function loadDataFromLocalStorage() {
  if (localStorage.getItem('data')) {
    let text = localStorage.getItem('data')
    data = JSON.parse(text)
    renderData();
  }
}

function addTask() {
  if (inputbox.value === '') {
    alert("You must write something!");
  }

  else {
    //add new item object to data
    let newItem = {
      id: getUniqueID(),
      name: inputbox.value
    }
    data.push(newItem)

    inputbox.value = "";
    saveData();
  }

}

function getUniqueID() {

  let usedIds = []
  for (let i of data) {
    usedIds.push(i.id)
  }
  usedIds.sort()
  //get putuntiel ID
  let tmpID = data.length + 1
  if (usedIds.includes(tmpID)) {
    for (let currentNumber = 0; currentNumber < usedIds.length; currentNumber++) {
      if (usedIds[currentNumber + 1] - usedIds[currentNumber] > 1) {
        tmpID = usedIds[currentNumber] + 1
      }
    }

  }
  //case 1 tmpID not used 

  return tmpID;
}


selectedItems = []


function saveData() {
  //to save data in localstorage
  localStorage.setItem("data", JSON.stringify(data));
  renderData();
}





function renderData() {
  listContainer.innerHTML = ""
  // to render every element in the data into <li>
  let i = 1
  for (let element of data) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input")
    let label = document.createElement("label")
    let deleteBtn = document.createElement("span")

    checkbox.type = "checkbox"
    checkbox.id = "cbox" + i
    checkbox.classList.add("mr-1")

    label.htmlFor = "cbox" + i
    label.innerHTML = element.name

    deleteBtn.classList.add("deleteBtn")
    deleteBtn.innerHTML = "❌"
    deleteBtn.dataset.itemId = element.id



    // Append the checkbox and label to the li element
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // Append the li element to the listContainer
    listContainer.appendChild(li);
    i++;

  }
}


document.getElementById("list-container").addEventListener("click", function (e) {
  let selectedId = e.target.dataset.itemId;
  data = data.filter(item => item.id != selectedId)
  saveData();
})


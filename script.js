const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let data=[]

loadDataFromLocalStorage();
function loadDataFromLocalStorage(){
  if(localStorage.getItem('data')){
  let text=localStorage.getItem('data')
  data=JSON.parse(text)
   renderData();
  }
}

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    }

    else {
      //add new item object to data
      let newItem={
        name:inputbox.value
            }
      data.push(newItem)

    inputbox.value = "";
    saveData();
}

selectedItems=[]
listContainer.addEventListener("click", function (e){
    console.log(e.target.classList)
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    } ,false);
  
function saveData(){
        //to save data in localstorage
      localStorage.setItem("data",JSON.stringify(data));
      renderData();
    }
  }

function renderData(){
        listContainer.innerHTML=""
        // to render every element in the data into <li>
        let i=1
      for (let element of data){
        let li = document.createElement("li");
        let checkbox=document.createElement("input")
        checkbox.type="checkbox"
        checkbox.id="cbox"+i
        checkbox.classList.add("mr-1")
        let label = document.createElement("label")
        label.htmlFor="cbox"+i
        label.innerHTML=element.name

         // Append the checkbox and label to the li element
        li.appendChild(checkbox);
        li.appendChild(label);
    
        // Append the li element to the listContainer
        listContainer.appendChild(li);
        i++;

      }

}


  
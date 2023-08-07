// c-create//Storing the task or saving the task
//empty array to store all the tasks
let TaskList = [];
//to retrive the data when the browser is loaded from localstrogae
document.addEventListener('DOMContentLoaded',()=>{
  DataPresent=localStorage.getItem('taskname')
  if(DataPresent !==null){
    TaskList=JSON.parse(DataPresent)
    DynamicRendering()
  }
})


//function to save the task
function SaveTask() {
//   debugger;
  let TaskName = document.getElementById("input_val").value;
  if(TaskName.trim()!==''){
  let TaskData = {
    //to generate new id eachtime the user enter the new task
    taskId: TaskList.length + 1,
    taskname: TaskName,
  };
  //pushing the new data into a empty array
  TaskList.push(TaskData);
  //adding data to ui
localStorage.setItem('taskname',JSON.stringify(TaskList))

  //rendering the ui
  DynamicRendering()
  //to clear the input field
  
  document.getElementById("input_val").value = "";
}}

//rendering the list items dynamically
function DynamicRendering() {
    // debugger;
    document.querySelector(".Task_list").innerHTML=''
  for (i = 0; i < TaskList.length; i++) {
    const dynamicLis = document.createElement("li");
    dynamicLis.classList.add("task");
    const myPara = document.createElement("p");
    myPara.innerHTML = TaskList[i].taskname;
    //appending the paragraph to li
    dynamicLis.appendChild(myPara);
    //appending the li to ul list
    document.querySelector(".Task_list").appendChild(dynamicLis);
    //creating the div element to add edit delete and list items
    const DivEle = document.createElement("div");
    DivEle.classList.add("crud");
    //to add icons like delete and retrive
    //1.Edit Icon
    const EditIcon = document.createElement("i");
    EditIcon.classList.add("bi");
    EditIcon.classList.add("bi-pencil-square");
    //adding the functionality to editicons
    EditIcon.addEventListener('click',EditTask)
    EditIcon.taskId=TaskList[i].taskId

    //1.Delete Icon
    const DeleteIcon = document.createElement("i");
    DeleteIcon.classList.add("bi");
    DeleteIcon.classList.add("bi-trash");
     //adding the functionality to Deleteicons
     DeleteIcon.addEventListener('click',DeleteTask)
     DeleteIcon.taskId=TaskList[i].taskId

    //appending the icons to the diveelemnt
    DivEle.appendChild(EditIcon);
    DivEle.appendChild(DeleteIcon);

    //appending the divelemnt to ul list
    dynamicLis.appendChild(DivEle);
  }
}

//editIcon functionality
function EditTask(e){
//  console.log(e)
//  console.log(e.target)
// debugger;
var edi=TaskList.find((d)=>d.taskId == e.target.taskId)
document.getElementById("input_val").value=edi.taskname;

}

//editIcon functionality
function DeleteTask(e){
//     console.log(e)
//  console.log(e.target)
//  debugger;
var index=TaskList.findIndex((d)=>d.taskId == e.target.taskId)
TaskList.splice(index,1)
localStorage.setItem('taskname',JSON.stringify(TaskList))
DynamicRendering()

}

//to remove all the data from the ui and local storage
 function removeAll(){
  TaskList.splice(0);
  localStorage.removeItem('taskname')
  DynamicRendering()
  
}

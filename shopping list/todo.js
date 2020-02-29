const button =document.querySelector("button")
const input=document.querySelector("input")
const ul=document.querySelector("ul")
if(localStorage.getItem("tasks")!=null)
{
const Task=localStorage.getItem("tasks")
const ParsedTask=JSON.parse(Task)

for(let i=0;i<ParsedTask.length;i++)
{
    createElement(ParsedTask[i]);
}
}
button.addEventListener("click",function(){
   const val=input.value;
  createElement(val)
  if(val!="")
  addElementTols(val);
})
function removeElement(e){
    e.currentTarget.parentElement.remove()
    const Task=localStorage.getItem("tasks")
    const ParsedTask=JSON.parse(Task)
    const value=e.currentTarget.previousSibling.textContent
    for(let i=0;i<ParsedTask.length;i++){
        if(value==ParsedTask[i])
        ParsedTask.splice(i,1)
    }
    localStorage.setItem("tasks",JSON.stringify(ParsedTask))
}
function addElementTols(value){
    if(localStorage.getItem("tasks")==null){
        const Tasks=[value]
        localStorage.setItem("tasks",JSON.stringify(Tasks))
    }
    else{
        const Tasks=localStorage.getItem("tasks")
        const ParsedTasks=JSON.parse(Tasks)
        ParsedTasks.push(value)
        localStorage.setItem("tasks",JSON.stringify(ParsedTasks))
    }
}
function createElement(val){
    if(val==""){
        alert("Please enter something")
        return;
        }
         const li=document.createElement("li");
         li.innerHTML=`<p>${val}</p>
         <img src="cross.jpg" alt="">`
         const img=li.children[1]
         img.addEventListener("click",removeElement)
         ul.appendChild(li);
         input.value=""
         
     
}
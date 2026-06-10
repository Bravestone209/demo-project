let taskName = document.querySelector('#taskName');
let taskDate = document.querySelector('#taskDate');
// let data = [];
let localStorageData = localStorage.getItem('data');
let data = JSON.parse(localStorageData) ?? [];

showData();


function addData(){
    tasks = taskName.value;
    date = taskDate.value;
    data.push({tasks:tasks,date:date});
    localStorage.setItem('data',JSON.stringify(data));
    console.log(data);
    taskName.value="";
    showData();
}


function showData(){

    let showList = document.querySelector('#taskList');
    let newElement = '';

    let getData = localStorage.getItem('data');
    let finalData = getData ? JSON.parse(getData) : [];

    for (let i = 0; i < finalData.length; i++) {
        const task = finalData[i];

        newElement += `
        <div class="card mb-2">
            <div class="card-body d-flex justify-content-between align-items-center">
            <div>
                <strong>${task.tasks}</strong>
                <small class="text-muted ms-2">${task.date}</small>
            </div>
            <button class="btn btn-sm btn-danger" data-taskId = ${i} onclick="deleteTask(${i})">Delete</button>
            </div>
        </div>`
        
    }

    showList.innerHTML=newElement;
    
}

function deleteTask(id){
    data.splice(id,1);
    localStorage.setItem('data', JSON.stringify(data));
    showData();
}
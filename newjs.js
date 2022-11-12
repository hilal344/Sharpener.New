const form = document.getElementById('my-form');

const userlist = document.getElementById('Expenses1');

form.addEventListener('submit', addUser);

function addUser (event){
    event.preventDefault();

    let usersData = {
        amount : event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
    }
    console.log(usersData.amount);
    let data_serial = JSON.stringify(usersData);
    let resp = checkifpresent(usersData.category);
    if(resp){
        
        localStorage.setItem(usersData.category,data_serial);
        displayData(usersData);
    }else{

        alert("Category of Expense already added!");
    }
}

function displayData(usersData){

    let li = document.createElement('li');
    li.setAttribute('category',usersData.category); // setting this att value for the new li item helps us to grab an html element and delete it
    li.innerHTML =`${usersData.amount}   ${usersData.description}  ${usersData.category}
     <button id="edit" onClick=editUser('${usersData.amount}','${usersData.description}','${usersData.category}')>edit</button> 
     <button id="delete" onClick=deleteUser('${usersData.category}')>delete</button>`;
     userlist.append(li);

}


function editUser(amount,description,category){

    //copyback to text fields
    deleteUser(category);
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
   
}
function deleteUser(category){

    const liToDelete = userlist.querySelector('[category="'+category+'"]');
    //localstorage delete
    localStorage.removeItem(category);
    liToDelete.remove();

}


function checkifpresent(category){

    if(localStorage.getItem(category) === null) return true;
    else return false;


}
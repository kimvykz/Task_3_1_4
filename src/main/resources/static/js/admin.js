const url_user = 'http://localhost:8080/api/user';

function testClick(){
    alert("testClick");
}



setTitle();

async function getAllUsers(){
    const res = await fetch(url_user);
    const users = await res.json();

    const userList = document.getElementById('allUsers');
    userList.innerHTML = '';
    users.forEach(user => userToHTML(user));
}

window.addEventListener('DOMContentLoaded', getAllUsers);

function setTitle(){
    const pageTitle = document.getElementById('mainPageTitle');
    pageTitle.insertAdjacentText('beforeend', `Admin panel`);
}

function userToHTML({id, firstName, lastName, age, email, roles}) {

    let userList= document.getElementById('allUsers');

    const rolesList = roles.map(role => role.name).join(', ');

    userList.insertAdjacentHTML('beforeend', `
    <tr>
        <th>${id}</th>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>[${rolesList}]</td>
        <td>
        <button id="btnEditUser${id}" class="btn btn-success my-1">Edit</button>
        <button type="button" class="btn btn-success my-1" data-bs-toggle="modal" data-bs-target="#editModalConfirm" onclick="fillEditModalById(${id})">
            Edit Modal
        </button>
        </td>
        <td>
        <button type="button" class="btn btn-danger my-1" data-bs-toggle="modal" data-bs-target="#deleteModalConfirm" onclick="fillDeleteModalById(${id})">
            Delete
        </button>
        </td>
        
    </tr>   
    `);
}



const tabLinks = document.querySelectorAll('.nav-link[href="#allUserTab"], .nav-link[href="#newUserTab"]');

const tabContents = document.querySelectorAll('.tab-content');
tabLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        // Hide all tab content
        tabLinks.forEach(link => {
            link.classList.remove('active');
        })

        this.classList.add('active');

        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        // Show the selected tab content
        const targetTabId = this.getAttribute('href');
        const targetTabContent = document.querySelector(targetTabId);

        if (targetTabContent) {
            if (targetTabId == '#allUserTab') {
                getAllUsers();
            }
            targetTabContent.style.display = 'block';
        }
    });
});

document.getElementById('btnSaveNewUser').addEventListener('click', async() => {
    const inpFirstName = document.getElementById('inputFirstName');
    const inpLastName = document.getElementById('inputLastName');
    const inpAge = document.getElementById('inputAge');
    const inpEmail = document.getElementById('inputEmail');
    const inpPassword = document.getElementById('inputPassword');
    const selectedRoles = Array.from(document.querySelectorAll('#inputRoles option:checked')).map(option => option.value);

    const firstName = inpFirstName.value;
    const lastName = inpLastName.value;
    const age = inpAge.value;
    const email = inpEmail.value;
    const password = inpPassword.value;



    if (email) {
        const res = await fetch(url_user, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName, age, email, password, roles: selectedRoles}) //
        });

        const user = await res.json();
        console.log(user);
        //todoToHTML(todo);

        inpFirstName.value = '';
        inpLastName.value = '';
        inpAge.value = '';
        inpEmail.value = '';
        inpPassword.value = '';

        simulateButtonClick('#allUserTab');
    }
})

function simulateButtonClick(tabId) {
    const tabLink = document.querySelector(`[href="${tabId}"]`);
    if (tabLink) {
        tabLink.click();
    }
}

async function deleteUser(id){
    const res = await fetch(url_user + `?id=${id}`, {
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

}

//filling delete modal form
async function fillDeleteModalById(id){
    const delModDelButton= document.getElementById('deleteModalDeleteButton');

    delModDelButton.innerHTML = '';

    delModDelButton.insertAdjacentHTML('beforeend', `
    <button type="button" class="btn btn-danger" onClick="deleteUser(${id})" data-bs-toggle="modal">Delete</button>
    `);

    const delModBody = document.getElementById('deleteModalConfirmBody');
    delModBody.innerHTML = '';


    const response = await  fetch(url_user + `/${id}`);

    const user = await response.json();


    delModBody.insertAdjacentHTML('beforeend', `
        <div class="container bg-white col-md-6 text-center fw-bold">
            <div class="mb-3">
                <label for="inputDelId" class="form-label">Id</label>
                <input type="text" class="form-control" id="inputDelId" placeholder="Id" value="${user.id}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputDelFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="inputDelFirstName" placeholder="John" value="${user.firstName}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputDelLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="inputDelLastName" placeholder="Smith" value="${user.lastName}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputDelAge" class="form-label">Age</label>
                <input type="text" class="form-control" id="inputDelAge" placeholder="18" value="${user.age}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputDelEmail" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="inputDelEmail" placeholder="example@gmail.com" value="${user.email}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputDelRoles" class="form-label">Roles</label>
                <select id="inputDelRoles" class="form-select" multiple aria-label="Multiple select example" disabled>
                    <option value="ADMIN" ${user.roles.some(role => role.name === 'ADMIN') ? 'selected' : ''}>ADMIN</option>
                    <option value="USER" ${user.roles.some(role => role.name === 'USER') ? 'selected' : ''}>USER</option>
                </select>
            </div>
    </div>
    `);
}

const deleteModalElement = document.getElementById('deleteModalConfirm');
deleteModalElement.addEventListener('hidden.bs.modal', function () {getAllUsers()});

const editModalElement = document.getElementById('editModalConfirm');
editModalElement.addEventListener('hidden.bs.modal', function () {getAllUsers()});


async function editUser(id){

}

//filling edit modal form
async function fillEditModalById(id){
    const editModEditButton= document.getElementById('editModalEditButton');

    editModEditButton.innerHTML = '';

    editModEditButton.insertAdjacentHTML('beforeend', `
    <button type="button" class="btn btn-primary" onClick="editUser(${id})" data-bs-toggle="modal">Edit</button>
    `);

    const editModBody = document.getElementById('editModalConfirmBody');
    editModBody.innerHTML = '';


    const response = await  fetch(url_user + `/${id}`);

    const user = await response.json();


    editModBody.insertAdjacentHTML('beforeend', `
        <div class="container bg-white col-md-6 text-center fw-bold">
            <div class="mb-3">
                <label for="inputEditId" class="form-label">Id</label>
                <input type="text" class="form-control" id="inputEditId" placeholder="Id" value="${user.id}" disabled>
            </div>
            <div class="mb-3">
                <label for="inputEditFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="inputEditFirstName" placeholder="John" value="${user.firstName}" >
            </div>
            <div class="mb-3">
                <label for="inputEditLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="inputEditLastName" placeholder="Smith" value="${user.lastName}" >
            </div>
            <div class="mb-3">
                <label for="inputEditAge" class="form-label">Age</label>
                <input type="text" class="form-control" id="inputEditAge" placeholder="18" value="${user.age}" >
            </div>
            <div class="mb-3">
                <label for="inputEditEmail" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="inputEditEmail" placeholder="example@gmail.com" value="${user.email}" >
            </div>
            <div class="mb-3">
                <label for="inputEditRoles" class="form-label">Roles</label>
                <select id="inputEditRoles" class="form-select" multiple aria-label="Multiple select example" >
                    <option value="ADMIN" ${user.roles.some(role => role.name === 'ADMIN') ? 'selected' : ''}>ADMIN</option>
                    <option value="USER" ${user.roles.some(role => role.name === 'USER') ? 'selected' : ''}>USER</option>
                </select>
            </div>
    </div>
    `);
}
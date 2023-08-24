const url_user = 'http://localhost:8080/api/user';

setTitle();
async function getAllUsers(){
    const res = await fetch(url_user);
    const users = await res.json();
    console.log(users);
    
    users.forEach(user => userToHTML(user));
}

window.addEventListener('DOMContentLoaded', getAllUsers);

function setTitle(){
    const pageTitle = document.getElementById('mainPageTitle');
    pageTitle.insertAdjacentText('beforeend', `User Information Page`);
}

function userToHTML({id, firstName, lastName, age, email, roles}) {

    const userList = document.getElementById('allUsers');

    const rolesList = roles.map(role => role.name).join(', ');

    userList.insertAdjacentHTML('beforeend', `
    <tr>
        <th>${id}</th>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${email}</td>
        <td>[${rolesList}]</td>
    </tr>   
    `);
}


// function userToHTML(users){
//     const usersList = document.get
// }

// async 
// fetch('http://localhost:8080/user')
//         .then(response => response.json())
//         .then(data => {
//             // Делайте что-то с полученными данными, например, вставьте их в DOM
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('Ошибка при получении данных:', error);
//         });
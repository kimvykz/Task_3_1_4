const url_user = 'http://localhost:8080/api/user';

setTitle();
async function getUserByEmail(){
    const userEmailElement = document.getElementById("userEmail");
    const userEmail = userEmailElement.textContent;

    const res = await fetch(url_user + `/email?email=${userEmail}`);

    const user = await res.json();
    userToHTML(user);
}

window.addEventListener('DOMContentLoaded', getUserByEmail);

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

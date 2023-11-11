const name = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const btn = document.getElementById('btn');
const form = document.getElementById('form');

function ValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
function validate() {
    if (!name.value) {
        name.style.outlineColor = 'red';
        name.focus();
        return;
    }

    if (!age.value) {
        age.style.outlineColor = 'red';
        age.focus();
        return;
    }

    if (!email.value) {
        email.style.outlineColor = 'red';
        email.focus();
        return;
    }
    
    if (!ValidateEmail(email.value)){
        alert("Emailni to'g'ri kiriting");
        email.value = '';
        email.focus();
        return;
    }    

};
function createRow(user, index) {
    let strRow = `
       <tr>
             <td>${index + 1}</td>
             <td>${user.name}</td>
             <td>${user.age}</td>
             <td>${user.email}</td>                  
             <td>
                  <span id="user-delete-${user.id}" class="delete">delete</span>
                  <span id="user-uptate-${user.id}" class="update">update</span>
             </td>
      </tr>
   `;

   const row = document.createRange().createContextualFragment(strRow);
   table.innerHTML += strRow;
};

function createAndSave() {

    let dataLocalStorage = localStorage.getItem('users');
    let data = [];

    if (dataLocalStorage) {
        data = JSON.parse(dataLocalStorage);
    }

    let user = {};
    user.id = Date.now();
    user.name = name.value;
    user.age = age.value;
    user.email = email.value;

    data.push(user);

    localStorage.setItem('users', JSON.stringify(data));
    createRow(user, data.length - 1);
    form.reset();
};



btn.addEventListener('click' , function () {
    validate();
    createAndSave();
});

window.onload = function () {
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (data.length) {
        data.forEach((user, index) => {
            createRow(user, index);
        });
    }       

    let deleteButtons = document.querySelectorAll('span.delete');
    if (deleteButtons.length) {
        deleteButtons.forEach(item => {
            item.addEventListener('click', function () {
                let confirmDelete = confirm("O'chirishi istaysizmi");

                if (confirmDelete) {
                    let userId = item.id.substring(12);

                    data = date.filter(el => {
                        return el.id != userId;
                    });

                    localStorage.setItem('users', JSON.stringify(data));
                    window.location.reload();

                }
            })
        })
    }
};

$(document).ready(function () {
    checkUserLoggedIn();
    loadUsers();
    loadSelectedUser();
});

// SECCION USUARIO

//Comprueba si existe un usuario logueado permitiendo visualizar en caso positivo,
// de lo contrario nos devuelve a la seccion de login.

function checkUserLoggedIn() {
    var user = getUserLoggedIn();
    if ((user != null) && (userExistence(user)) &&(user == "admin")) {
        $('#navbarDropdownUser').text(user);
    }
    else {
        alert("Acceso solo administradores.");
        window.location.replace("index.html");
    }
}


// Retorna true si el usuario pasado como parametro esta registrado.

function userExistence(userLogin) {
    var user = null;
    user = JSON.parse(localStorage.getItem(userLogin));

    if (user == null)
        user = JSON.parse(sessionStorage.getItem(userLogin));

    if (user.usuario == userLogin)
        return true;
}


// Devuelve el nombre del usuario logueado actualmente.

function getUserLoggedIn() {
    var user = null;
    user = localStorage.getItem("userLoggedIn");
    if (user == null)
        user = sessionStorage.getItem("userLoggedIn");
    return user;
}


// Cierra la sesion actual y nos devuelve a la seccion login.

function userLogOut() {
    localStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userLoggedIn');
    window.location.replace("login.html");
}


// Redirige a la seccion de cambio de contraseña

function changePassword() {
    window.location.replace("modify.html");
}

// SECCION CONFIGURACION USUARIOS

function loadUsers() {
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if (clave != "admin") {
            var x = document.getElementById("userList");
            var option = document.createElement("option");
            option.text = clave;
            x.add(option);
        }
    }
}


function loadSelectedUser(){
    var e = document.getElementById("userList");
    var nick = e.options[e.selectedIndex].value;
    var user = JSON.parse(localStorage.getItem(nick));
    clearFields();
    document.getElementById("outputNick").innerHTML = user.usuario;
    document.getElementById("outputName").innerHTML = user.nombre;
}

function deleteUser() {
    var e = document.getElementById("userList");
    var nick = e.options[e.selectedIndex].value;
    localStorage.removeItem(nick);
    e.remove(e.selectedIndex);
    clearFields();
    loadSelectedUser();
}


function deleteAllUsers() {
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if (clave != "admin")
            localStorage.removeItem(clave);
    }

    var x = document.getElementById("userList");
    for (var i = 0; i < x.length; i++)
        x.remove(i);
    
    clearFields();
}

function clearFields(){
    document.getElementById("outputNick").innerHTML = "";
    document.getElementById("outputName").innerHTML = "";
}

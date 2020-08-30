// Chequea si existe un usuario logueado, en caso negativo nos devuelve al login.

function checkUserLoggedIn() {
    var user = getUserLoggedIn();
    if ((user == null)) {
        window.location.replace("login.html");
    }
    else
        document.getElementById('navbarDropdownUser').innerHTML = user;
}


// Luego de realizar los chequeos necesarios, actualiza la contraseña.

function changePassword() {
    if (checkFields()) {
        var currentPass = document.getElementById('inputCurrentPassword').value;
        var newPass = document.getElementById('inputNewPassword').value;

        var user = getUser(getUserLoggedIn());
        if (user.clave == currentPass) {
            if (validatePassword()) {

                var nick = user.usuario;
                var name = user.nombre;

                var user = createUser(nick, name, newPass);
                localStorage.setItem(user.usuario, JSON.stringify(user));

                clearFields();
                document.getElementById("lblMsg").innerHTML = "Contraseña modificada exitosamente.";
                setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);

            }
        }
        else {
            document.getElementById("lblMsg").innerHTML = "Contraseña anterior incorrecta.";
            setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
        }
    }
}


// Devuelve el nombre del usuario logueado actualmente.

function getUserLoggedIn() {
    var user = null;
    user = localStorage.getItem("userLoggedIn");
    if (user == null)
        user = sessionStorage.getItem("userLoggedIn");
    return user;
}


// Devuelve el usuario completo si esta registrado.

function getUser(usuario) {
    var user = null;
    user = JSON.parse(localStorage.getItem(usuario));
    return user;
}


// Retorna true si la constraseña ingresada en ambos campos es igual.

function validatePassword() {
    var newPass = document.getElementById('inputNewPassword').value;
    var confirmNewPass = document.getElementById('inputConfirmNewPassword').value;

    if (newPass == confirmNewPass)
        return true
    else {
        document.getElementById("lblMsg").innerHTML = "La contraseña no coincide.";
        setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
        return false;
    }
}


// Constructor del objeto usuario.

function createUser(nick, name, pass) {
    return {
        usuario: nick,
        nombre: name,
        clave: pass
    };
}


// Retorna true si los campos no estan vacios, en caso contrario informa al usuario.

function checkFields() {
    var currentPass = document.getElementById("inputCurrentPassword").value;
    var newPass = document.getElementById("inputNewPassword").value;
    var confirmNewPass = document.getElementById("inputConfirmNewPassword").value;

    if ((currentPass != "") && (newPass != "") && (confirmNewPass != ""))
        return true;
    else {
        document.getElementById("lblMsg").innerHTML = "Debe completar todos los campos.";
        setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
        return false;
    }
}


// Limpia los campos de texto.

function clearFields() {
    document.getElementById("inputCurrentPassword").value = "";
    document.getElementById("inputNewPassword").value = "";
    document.getElementById("inputConfirmNewPassword").value = "";
}


// Limpiar los campos y retorna al index.

function atras() {
    clearFields();
    history.back();
}
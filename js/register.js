


// Chequea si existe un usuario logueado, en caso positivo nos devuelve al index.

function checkUserLoggedIn() {
    var user = getUserLoggedIn();
    if ((user != null)) {
        window.location.replace("index.html");
    }
}


// Devuelve el nombre del usuario logueado actualmente.

function getUserLoggedIn() {
    var user = null;
    user = localStorage.getItem("userLoggedIn");
    if(user == null)
        user = sessionStorage.getItem("userLoggedIn");
    return user;
}


// Realiza los chequeos necesarios para completar el registro.

function register() {
    if (checkFields()) {
        if (validatePassword()) {

            var nick = document.getElementById("inputNick").value;
            var name = document.getElementById("inputName").value;
            var pass = document.getElementById("inputPassword").value;

            if (validateUser(nick)) {

                var user = createUser(nick, name, pass);
                localStorage.setItem(user.usuario, JSON.stringify(user));

                clearFields();
                document.getElementById("lblMsg").innerHTML = "Usuario registrado exitosamente.";
                setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
            }
        }
    }
}


// Retorna true si los campos no estan vacios, en caso contrario informa al usuario.

function checkFields() {
    var inputNick = document.getElementById("inputNick").value;
    var inputName = document.getElementById("inputName").value;
    var inputPassword = document.getElementById("inputPassword").value;
    var inputConfirmPassword = document.getElementById("inputConfirmPassword").value;

    if ((inputNick != "") && (inputName != "") && (inputPassword != "") && (inputConfirmPassword != ""))
        return true;
    else {
        document.getElementById("lblMsg").innerHTML = "Debe completar todos los campos.";
        setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
        return false;
    }
}


// Limpia los campos de texto.

function clearFields() {
    document.getElementById("inputNick").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputPassword").value = "";
    document.getElementById("inputConfirmPassword").value = "";
}

function clearLocalStorage() {
    localStorage.clear();
    sessionStorage.clear();
}


// Retorna true si no existe un registro con el nombre de usuario pasado como parametro.

function validateUser(usuario) {
    var user = null;
    user = JSON.parse(localStorage.getItem(usuario));
    if (user == null)
        return true;
    else {
        document.getElementById("lblMsg").innerHTML = "Usuario no disponible.";
        setTimeout(function () { document.getElementById("lblMsg").innerHTML = ""; }, 3000);
        return false;
    }
}


// Retorna true si la constraseña ingresada en ambos campos es igual.

function validatePassword() {
    var pass = document.getElementById("inputPassword").value;
    var confirmPass = document.getElementById("inputConfirmPassword").value;

    if (pass == confirmPass)
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



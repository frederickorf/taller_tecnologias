
/* $('#imdb_page').on('pageinit', function() {
    checkUserLoggedIn();
}); */

$(document).ready(function () {
    checkUserLoggedIn();
});


// SECCION USUARIO


//Comprueba si existe un usuario logueado permitiendo visualizar en caso positivo,
// de lo contrario nos devuelve a la seccion de login.

function checkUserLoggedIn() {
    var user = getUserLoggedIn();
    if ((user != null) && (userExistence(user))) {
        $('#navbarDropdownUser').text(user);
    }
    else {
        window.location.replace("login.html");
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


// Retorna true si el usuario pasado como parametro esta registrado.

function userExistence(userLogin) {
    var user = null;
    user = JSON.parse(localStorage.getItem(userLogin));

    if (user == null)
        user = JSON.parse(sessionStorage.getItem(userLogin));

    if (user.usuario == userLogin)
        return true;
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


// SECCION MI API


// Carga en pantalla la solicitud a la api imdb movies segun busqueda.

function apiImdbMovies() {
    const busqueda = $("#inputImdbMovies").val();
    if (busqueda != "") {
        var url = 'http://www.omdbapi.com/?s=' + busqueda + '&apikey=26724638&';
        const http = new XMLHttpRequest();

        http.open("GET", url);
        http.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var datos = JSON.parse(this.responseText)
                console.log(datos);
                $("#resultadosMercadoLibre").html("");
                for (var i = 0; i < 3; i++) {
                    $("#resultadosMercadoLibre").append(
                        '<div class="col-md-4">' +
                        '<a href="categories.html" class="card mb-4 shadow-sm custom-card">' +
                        '<img class="bd-placeholder-img card-img-top" alt="' + datos.Search[i].Title + '" src=' + datos.Search[i].Poster + '>' +
                        '<h3 class="m-3">' + datos.Search[i].Title + ' (' + datos.Search[i].Year + ')' + '</h3>' +
                        '<div class="card-body">' +
                        '<p class="card-text"></p>' +
                        '</div>'
                    )
                }
            }
        }
        http.send();
    }
}


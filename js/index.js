

// Funcion que se ejecuta al finalizar la carga del html.

$(document).ready(function () {
    checkUserLoggedIn();
    apiMindicator("dolar", "#divisaDolar");
    $('#tablaBuscarDivisa').hide();
    apiRandomUser();
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


// SECCION APIS


// Carna en la seccion indicada (id) los datos de la divisa solicitada (divisa)

function apiMindicator(divisa, id) {
    const url = 'https://mindicador.cl/api/' + divisa;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText)

            $(id).html("");
            $(id).append(
                '<td class="text-center">' + datos.codigo + '</td>' +
                '<td class="text-center">' + datos.serie[0].fecha.substring(0, 10) + '</td>' +
                '<td class="text-center">' + datos.nombre + '</td>' +
                '<td class="text-center">' + datos.unidad_medida + '</td>' +
                '<td class="text-center">' + datos.serie[0].valor + '</td>'
            )
        }
        if (this.status == 500) {
            $('#tablaBuscarDivisa').hide();
        }
    }
    http.send();
}


// Muestra en pantalla usuarios random.

function apiRandomUser() {
    var url = 'https://randomuser.me/api/';
    var http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText)
            console.log(datos);
            $("#userImage").html("");
            $("#userImage").append(
                '<img class="img-fluid" alt="' + datos.results[0].gender + '" src="' + datos.results[0].picture.medium + '"></img>'
            )

            $("#userData").html("");
            $("#userData").append(
                '<h3 class= "name">' + datos.results[0].name.first + " " + datos.results[0].name.last + '</h3 >' +
                '<h4 class="title">' + datos.results[0].gender + '</h4>'
            )
        }
    }
    http.send();
}

// Invoca al metodo apiMindicator pasandole los parametros necesarios para mostrar la divisa buscada.

function buscarDivisa() {
    const divisa = $("#inputDivisa").val();
    if (divisa != "") {
        $('#tablaBuscarDivisa').show();
        apiMindicator(divisa, "#trBuscarDivisa");
    }
}


// Carga en pantalla la solicitud a la api MercadoLibre segun busqueda.

function apiMercadoLibre() {
    const busqueda = $("#inputMercadoLibre").val();
    if (busqueda != "") {
        var url = 'https://api.mercadolibre.com/sites/MLU/search?q=' + busqueda;
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
                        '<img class="bd-placeholder-img card-img-top" src=' + datos.results[i].thumbnail + '>' +
                        '<h3 class="m-3">' + datos.results[i].price + ' (' + datos.results[i].currency_id + ')' + '</h3>' +
                        '<div class="card-body">' +
                        '<p class="card-text">' + datos.results[i].title + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</div>'
                    )
                }
            }
        }
        http.send();
    }
}
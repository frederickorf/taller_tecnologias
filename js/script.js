function altaUsuario()
{
    var x = document.forms["abmUsuarios"].elements;

    localStorage.setItem("Nombre", x.nombre);
    localStorage.setItem("Usuario", x.usuario);
    localStorage.setItem("Contraseña", x.contraseña);

    document.getElementById('lblMsg').innerText = "Usuario ingresado exitosamente.";
    setTimeout(borrarMsg(),3000);

    limpiarCampos();
}

function mostrarUsuarios()
{
    var nombre = localStorage.getItem("Nombre");   
    var usuario = localStorage.getItem("Usuario");   
    var contraseña = localStorage.getItem("Contraseña");  
    
    document.getElementById("nombre").innerText = nombre;
    document.getElementById("usuario").innerText = usuario;
    document.getElementById("contraseña").innerText = contraseña;
}

// FUNCIONES AUXILIARES

function limpiarCampos()
{
    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";

    document.getElementById('nombre').focus();
}

function borrarMsg()
{
    document.getElementById('lblMsg').innerText = ""
}

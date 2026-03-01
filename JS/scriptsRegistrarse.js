import { createUser, generarID } from "../Services/ServicesUsuarios.js";

/*
Inicilizacion de las variables para su proximo uso 
*/
var usuariosDB = JSON.parse(localStorage.getItem("usuariosDB") || "[]");

const btnRegistrar = document.getElementById("btnRegistrar")
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmPassword");
const toastElement = document.getElementById("toastExito");

//Boton para registrar al usuario utilizando los datos de las variables 
btnRegistrar.addEventListener("click", function(e) {
    e.preventDefault();

    //pasando las variables crudas a varaibles utilizables 
    const nombreValue = nombre.value.trim();
    const telefonoValue = telefono.value.trim();
    const correoValue = correo.value.toLowerCase().trim(); 
    const passwordValue = password.value.trim();
    const confirmarPasswordValue = confirmarPassword.value.trim()
    
    //validaciones basicas para completar el registro
    if (
        nombreValue === "" ||
        telefonoValue === "" ||
        correoValue === "" ||
        passwordValue === "" ||
        confirmarPasswordValue === ""
    ) {
        alert("Rellene los espacios vacíos");
        return;
    }

    if(passwordValue != confirmarPasswordValue)
    {
        alert("Contraseña no coincide")
        return;
    }

    const usuarioEncontrado = usuariosDB.find(usuario => usuario.correo === correoValue)

    if(usuarioEncontrado)
    {
        alert("Correo electronico ya registrado")
        return
    }

    //creacion del objeto nuevoUsuario para almacenarlo en la base de datos 
    const nuevoUsuario = {
        id: generarID(),
        nombre: nombreValue,
        telefono: telefonoValue,
        correo: correoValue,
        password: passwordValue,
        suscripcionFinaliza: null,
        huellaDactilar: null
    };

    //enviar al objeto a la funcion (createUser) para que se encargue ne guardarlo en la base de datos
    const usuarioCreado = createUser(nuevoUsuario);

    if(usuarioCreado)
    {
        mostrarExitoYRedirigir()
    }

});

//mostrar toast para indicar inicio de sesion exitoso y ademas redirigir a la pagina principal 
function mostrarExitoYRedirigir() {

    const toast = new bootstrap.Toast(toastElement, {
        delay: 1000 
    });

    toast.show();

    setTimeout(() => {
        window.location.href = "index.html"; 
    }, 2000);
}

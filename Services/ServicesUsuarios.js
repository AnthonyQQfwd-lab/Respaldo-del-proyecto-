var usuariosDB = JSON.parse(localStorage.getItem("usuariosDB") || "[]");



// Crear usuario y almacenarlo
function createUser(usuarioNuevo) {
    
    usuariosDB.push(usuarioNuevo);
    localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB));
    return usuarioNuevo;
}

//geenra un ID random 
function generarID() {
    return crypto.randomUUID();
}

export {createUser, generarID}


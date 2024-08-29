const imagenPerfil = () => {
    const inputImagen = document.getElementById("imagen_perfil");
    const previewImagen = document.getElementById("preview_imagen");
    const url = inputImagen.value;
    if (
        /https?:\/{2}([a-zA-Z0-9-]+\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,6}.*/.test(url)
    ) {
        previewImagen.src = url;
        previewImagen.style.display = "block";
    } else {
        inputImagen.value = "";
        previewImagen.style.display = "none";
        alert("URL de imagen incorrecta");
    }
};
const changeError = (e) => {
        e.target.src =
            "../Resources/img/Perfil.png";
        e.target.style.display = "block";
}
const nombrePerfil = () => {
    const inputNombre = document.getElementById("nombre_perfil");
    const previewNombre = document.getElementById("preview_nombre");
    const nombre = inputNombre.value;
    if (nombre !== "" && nombre.length <= 30) {
        previewNombre.textContent = nombre;
        previewNombre.style.display = "block";
    } else {
        alert("El nombre no puede estar vacio");
        previewNombre.textContent = "";
        previewNombre.style.display = "none";
    }
};
const guardarInformacion = () => {
    const nombre = document.getElementById("preview_nombre").textContent;
    const imagen = document.getElementById("preview_imagen").src;
    if (nombre === "" || imagen === "") {
        alert("Debes completar todos los campos de informacion");
        return;
    }
    datos = {
        nombreUsuario: nombre,
        imagenUsuario: imagen,
    }
    localStorage.setItem("datos_usuario", JSON.stringify(datos));
    alert("Información guardada correctamente");
}
if (localStorage.getItem("datos_usuario") != null) {
    const datos = JSON.parse(localStorage.getItem("datos_usuario"));
    document.getElementById("preview_nombre").textContent = datos.nombreUsuario;
    document.getElementById("preview_nombre").style.display = "block"
    document.getElementById("preview_imagen").src = datos.imagenUsuario;
    document.getElementById("preview_imagen").style.display = "block"
}
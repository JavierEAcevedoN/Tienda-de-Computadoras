const cargarProductos = async () => {
    try {
        const respuesta = await fetch("./data.json");
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            return datos;
        } else {
            console.log("Error al cargar los productos");
        }
    } catch (error) {
        console.error(error);
    }
};
const mostrarProductosCatalogo = async () => {
    const catalogo = document.getElementById("Catalogo");
    const productos = await cargarProductos();
    let catalogoContenido = ``;
    let color = "";
    for (let i = 0; i < productos.length; i++) {
        if (i % 2 === 0) {
            color = "Color1";
        } else {
            color = "Color2";
        }
        catalogoContenido += `
        <div class="Producto_${i + 1} ${color}">
            <img src="${productos[i].imagen}" alt="${productos[i].titulo}">
            <h3>${productos[i].titulo}</h3>
            <p>$ ${productos[i].precio}</p>
            <a href="#" onclick="guardarProducto(event)">Mas informacion</a>
        </div>
        `;
    }
    catalogo.innerHTML = catalogoContenido;
};
const mostrarProductosDestacado = async () => {
    const destacado = document.getElementById("Destacado");
    if (localStorage.getItem("productos_destacados") !== null) {
        destacado.innerHTML = localStorage.getItem("productos_destacados");
        return;
    }
    const productos = await cargarProductos();
    const candidad = Math.floor(Math.random() * productos.length) + 1;
    let destacadoContenido = ``;
    let color = "";
    for (let i = 0; i < candidad; i++) {
        if (i % 2 === 0) {
            color = "Color1";
        } else {
            color = "Color2";
        }
        destacadoContenido += `
        <div class="Producto_${i + 1} ${color}">
            <img src="${productos[i].imagen}" alt="${productos[i].titulo}">
            <h3>${productos[i].titulo}</h3>
            <p>$ ${productos[i].precio}</p>
            <a href="#" onclick="guardarProducto(event)">Mas informacion</a>
        </div>
        `;
    }
    localStorage.setItem("productos_destacados",destacadoContenido)
    destacado.innerHTML = destacadoContenido;
};
const guardarProducto = async (event) => {
    const productos = await cargarProductos();
    const clase = event.target.parentElement.classList.item(0)
    const numero = clase[clase.length-1]-1
    productos[numero] = {...productos[numero], numero: numero}
    localStorage.setItem("producto_seleccionado", JSON.stringify(productos[numero]))
    window.location.href = "./html/Producto.html";
}
mostrarProductosCatalogo();
mostrarProductosDestacado();
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito.length === 0) {
        main.innerHTML = `
        <p class="No_productos">No hay productos</p>
        `;
        return;
    }
    let productos = "";
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        if (producto.numero % 2 === 0) {
            color = "Color1";
        } else {
            color = "Color2";
        }
        productos += `
        <div class="Producto_${producto.numero} ${color}">
            <img src=".${producto.imagen}" alt="${producto.titulo}">
            <div class="Contenido">
                <h2>${producto.titulo}</h2>
                <p>Precio: $ <span class="precio">${producto.precio}</span></p>
            </div>
            <div class="Opciones">
                <div class="Cantidad">
                    <button class="btn_sumar">+</button>
                    <button class="cantidad">1</button>
                    <button class="btn_restar">-</button>
                </div>
                <button class="btn_eliminar">Eliminar</button>
            </div>
        </div>
        `;
    }
    main.innerHTML = `
    <h1>Productos</h1>
    <section class="Productos">
    ${productos}
    </section>
    `;
    const cantidad = document.querySelectorAll(".cantidad");
    for (let i = 0; i < cantidad.length; i++) {
        if (carrito[i].cantidad !== undefined) {
            cantidad[i].textContent = carrito[i].cantidad;
        }
    }
    const btn_sumar = document.querySelectorAll(".btn_sumar");
    const btn_restar = document.querySelectorAll(".btn_restar");
    const btn_eliminar = document.querySelectorAll(".btn_eliminar");

    for (let i = 0; i < btn_sumar.length; i++) {
        btn_sumar[i].addEventListener("click", (event) => {
            const cantidad = event.target.nextElementSibling;
            const carrito = JSON.parse(localStorage.getItem("carrito"));
            const numero = Number(
                event.target.parentElement.parentElement.parentElement.classList[0].split(
                    "_"
                )[1]
            );
            const indice = carrito.findIndex((item) => item.numero === numero);
            if (Number(cantidad.textContent) < 1) {
                cantidad.textContent = 1;
            } else {
                cantidad.textContent = Number(cantidad.textContent) + 1;
            }
            carrito[indice].cantidad = Number(cantidad.textContent);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            calcularPrecio();
        });
    }
    for (let i = 0; i < btn_restar.length; i++) {
        btn_restar[i].addEventListener("click", (event) => {
            const cantidad = event.target.previousElementSibling;
            const carrito = JSON.parse(localStorage.getItem("carrito"));
            const numero = Number(
                event.target.parentElement.parentElement.parentElement.classList[0].split(
                    "_"
                )[1]
            );
            const indice = carrito.findIndex((item) => item.numero === numero);
            if (Number(cantidad.textContent) > 1) {
                cantidad.textContent = Number(cantidad.textContent) - 1;
            } else {
                cantidad.textContent = 1;
            }
            carrito[indice].cantidad = Number(cantidad.textContent);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            calcularPrecio();
        });
    }
    for (let i = 0; i < btn_eliminar.length; i++) {
        btn_eliminar[i].addEventListener("click", (event) => {
            const elemento = event.target.parentElement.parentElement;
            elemento.remove();
            const carrito = JSON.parse(localStorage.getItem("carrito"));
            const numero = Number(elemento.classList[0].split("_")[1]);
            const indice = carrito.findIndex((item) => item.numero === numero);
            carrito.splice(indice, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            calcularPrecio();
        });
    }
    calcularPrecio();
});
const calcularPrecio = () => {
    const footer = document.createElement("footer");
    const body = document.querySelector("body");
    const precio = document.querySelectorAll(".precio");
    const cantidad = document.querySelectorAll(".cantidad");
    const main = document.querySelector("main");
    const oldFooter = document.querySelector("footer");
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito.length === 0) {
        main.innerHTML = `
        <p class="No_productos">No hay productos</p>
        `;
        document.querySelector("footer").remove();
        return;
    }
    let total = 0;
    for (let i = 0; i < precio.length; i++) {
        let Nprecio = 0;
        let Ncantidad = 0;
        for (let j = 0; j < precio[i].textContent.length; j++) {
            const letra = precio[i].textContent[j];
            if (letra !== ".") {
                Nprecio += letra;
            }
        }
        Nprecio = Number(Nprecio);
        Ncantidad = Number(cantidad[i].textContent);
        total += Nprecio * Ncantidad;
        // arreglar el total para ponerle los numeros decimales
    }
    total = String(total);
    // poner un punto cada 3 caracteres de izquierda a derecha del total
    total = total.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (oldFooter !== null) {
        oldFooter.remove();
    }
    footer.innerHTML = `
        <p><span class="Negrilla">Total:</span> $ ${total}</p>
        <button onclick="alert('Gracias por comprar')">Continuar</button>
    `;
    body.appendChild(footer);
};
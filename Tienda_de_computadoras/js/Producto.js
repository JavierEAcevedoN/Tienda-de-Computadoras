document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const producto = JSON.parse(localStorage.getItem("producto_seleccionado"));
    // Aqui se genera el contenido del main
    let color = ""
    if (producto.numero % 2 === 0) {
        color = "Color1";
    } else {
        color = "Color2";
    }
    const divRate = document.createElement("div");
    divRate.className = "Rate";
    for (let i = 1; i <= 5; i++) {
        if (i <= producto.contenido[0]) {
            divRate.innerHTML += `
            <img src="../Resources/img/Estrella_rellena.png" alt="Estrella_rellena"/>
            `;
        } else {
            divRate.innerHTML += `
            <img src="../Resources/img/Estrella.png" alt="Estrella"/>
            `;
        }
    }
    divRate.innerHTML += `
    <span>${producto.contenido[1]}</span>
    `;
    let informacion = "";
    for (let i = 2; i < producto.contenido.length; i++) {
        const tag = producto.contenido[i][0];
        const value = producto.contenido[i][1];
        if (tag === "ul" || tag === "ol") {
            let lista = "";
            for (let j = 0; j < value.length; j++) {
                const vTag = value[j][0];
                const vValue = value[j][1];
                if (vTag === "strong") {
                    const vText = value[j][2];
                    lista += `
                    <li><${vTag}>${vValue}</${vTag}>${vText}</li>
                    `;
                } else {
                    lista += `
                    <li>${vValue}</li>
                    `;
                }
            }
            informacion += `
                <${tag}>
                    ${lista}
                </${tag}>
                `;
        } else if (tag === "h2" || tag === "h3") {
            informacion += `
            <${tag} class="${color}">${value}</${tag}>
            `;
        } else {
            informacion += `
            <${tag}>${value}</${tag}>
            `;
        }
    }
    // Aqui se genera el main
    main.innerHTML = `
    <img src=".${producto.imagen}" alt="${producto.titulo}">
    <div class="Informacion ${color}">
        <h1 class="${color}">${producto.titulo}</h1>
        <span>$ ${producto.precio}</span>
        ${divRate.outerHTML}
        ${informacion}
    </div>
    `;
    // Aqui se genera el footer
    footer.classList.add(color)
    footer.innerHTML = `
    <p><span>Precio:</span> $ ${producto.precio}</p>
    <a class="${color}" href="#" onclick="comprarProducto()">Comprar</a>
    `;
});
const comprarProducto = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = JSON.parse(localStorage.getItem("producto_seleccionado"));
    if (carrito.some(item => item.numero === producto.numero)) {
        alert("Este producto ya se encuentra en el carrito");
        return;
    }
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito");
    window.location.href = "../html/Carrito.html";
}
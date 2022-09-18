let btnAgregar = document.getElementById('btnAgregaProd')
btnAgregar.addEventListener('click', (evento) => agregarProducto (evento))

let btnConfirmar = document.getElementById('btnCambio')
btnConfirmar.addEventListener('click', (evento) => actualizarProducto(evento))

let nombre = document.getElementById('nombre-producto')
let cantidad = document.getElementById('cantidad-producto')

let listado = document.getElementById('listado-productos')

let productos = []


function agregarProducto (evento) {
    evento.preventDefault()


    if (nombre.value.trim().length == 0 || cantidad.value.trim().length == 0) {
        alert("Debes llenar ambos campos!")
        
    } else {

    const producto = {
        nombre: nombre.value,
        cantidad: cantidad.value
    }

    
    productos.push(producto)
    toLS()
    mostrarProductos()
    clearInput()
    listado.style.display = 'flex'
    }
}

function clearInput() {
    nombre.value = ''
    cantidad.value = ''
    }

function editarProducto (btn, nombreProd) {
    btnAgregar.style.display = 'none'
    btnConfirmar.style.display ='inline'

    let prodEdit = productos.find((producto) => producto.nombre === nombreProd)

    nombre.value = prodEdit.nombre
    cantidad.value = prodEdit.cantidad

}
function leerProductos() {
    let productosLS = window.localStorage.getItem('productos')
   
    
    productos = JSON.parse(productosLS) || []
    mostrarProductos()
  }

function eliminarProducto (btn, nombre) {
    btn.parentElement.parentElement.remove()
    productos = productos.filter((producto) => producto.nombre !== nombre)
    toLS()
    if (productos.length == 0) {
        listado.style.display = 'none'
    } else {
        listado.style.display = 'flex'
    }
}



function mostrarProductos () { 
    listado.innerHTML = ''
    productos.forEach((producto) => {
      listado.innerHTML += 
        `
        <article>
                <div class="cajaNombre">
                    <p>${producto.nombre}</p>
                </div>
                <div class="cajaCantidad">
                    <p>${producto.cantidad}</p>
                </div>
                <div class="botonera-lista">
                    <button onclick="editarProducto(this, '${producto.nombre}' )"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="eliminarProducto(this, '${producto.nombre}' )"><i class="fa-solid fa-trash"></i></button>
                </div>
        </article>
        `
    })
}

function toLS() {
    let arrayToString = JSON.stringify(productos)
    window.localStorage.setItem('productos', arrayToString)
}

function actualizarProducto (evento) {
    evento.preventDefault ()

    if (nombre.value.trim().length == 0 || cantidad.value.trim().length == 0) {
        alert("Debes llenar ambos campos!")
    } else {

    let nombreProd = nombre.value
    let cantProd = cantidad.value

    productos = productos.map((producto) => {
        if (producto.nombre === nombreProd) {
            return {
                nombre: nombreProd,
                cantidad: cantProd
            }
        } else {
            return producto
        }
    })

    clearInput()
    btnAgregar.style.display = 'inline'
    btnConfirmar.style.display = 'none'
    toLS()
    mostrarProductos()
}}

leerProductos()

//fab
let fab = document.getElementById("fab");
//cerrar btn
let cerrar = document.getElementById("cerrar");
//volver
let volver = document.getElementById("volver");
//formulario
let form = document.getElementById("form");
//secciones
let formulario = document.getElementById("formulario");
let home = document.getElementById("home");
let listado = document.getElementById("listado");
let detalle = document.getElementById("detalle");
//items
let items = document.getElementById("items");
//el detalle
let eldetalle = document.getElementById("eldetalle");

let productos = 0;

cerrar.addEventListener("click", () => {
  //click para botones q estan fuera del formulario
  if (productos > 0) {
    formulario.classList.add("dnone");
    listado.classList.remove("dnone");
    home.classList.add("dnone");
    detalle.classList.add("dnone");
  } else {
    formulario.classList.add("dnone");
    listado.classList.add("dnone");
    home.classList.remove("dnone");
    detalle.classList.add("dnone");
  }
});

fab.addEventListener("click", () => {
  //click para botones q estan fuera del formulario
  formulario.classList.remove("dnone");
  listado.classList.add("dnone");
  home.classList.add("dnone");
  detalle.classList.add("dnone");
});

volver.addEventListener("click", () => {
  //vuelve desde el detalle al listado
  formulario.classList.add("dnone");
  listado.classList.remove("dnone");
  home.classList.add("dnone");
  detalle.classList.add("dnone");
});

const verDetalle = (titulo, categoria, descripcion) => {
  listado.classList.add("dnone");
  detalle.classList.remove("dnone");

  let item = `<li>
    <div>
    <img src="${categoria}">
    <h3>${titulo}</h3>
    </div>
    <p>${descripcion}</p>
    </li>`;

  eldetalle.innerHTML = item;
};

const addItem = (titulo, categoria, descripcion) => {
  //se crea una variable q como valor tiene un fragmento de html
  let item = `<li id="item-${productos}">
    <img src="${categoria}">
    <h3>${titulo}</h3>
    <button onclick="verDetalle('${titulo}', '${categoria}', '${descripcion}')">Ver mas</button>
    <button onclick="verDetalle('${titulo}', '${categoria}', '${descripcion}')"> Borrar</button>
 </li>`;

  items.innerHTML += item; // el += hace q se vayan sumando los items
  console.log("productos");
};

form.addEventListener("submit", (e) => {
  //submit envia los datos de un formulario ((aplica al ultimo boton dentro de un formulario))
  e.preventDefault();
  let titulo = e.target.titulo.value;
  let categoria = e.target.categoria.value;
  let descripcion = e.target.descripcion.value;
  productos++;

  addItem(titulo, categoria, descripcion);
  formulario.classList.add("dnone");
  listado.classList.remove("dnone");
  form.reset();
});

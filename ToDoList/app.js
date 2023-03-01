let sup = document.getElementById("sup");
let cerrar = document.getElementById("cerrar");
let volver = document.getElementById("volver");
let form = document.getElementById("form");
let formulario = document.getElementById("formulario");
let home = document.getElementById("home");
let listado = document.getElementById("listado");
let detalle = document.getElementById("detalle");
let items = document.getElementById("items");
let eldetalle = document.getElementById("eldetalle");

let tareas = 0;

cerrar.addEventListener("click", () => {
  if (tareas > 0) {
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

sup.addEventListener("click", () => {
  formulario.classList.remove("dnone");
  listado.classList.add("dnone");
  home.classList.add("dnone");
  detalle.classList.add("dnone");
});

volver.addEventListener("click", () => {
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
  let item = `<li id="item-${tareas}">
    <img src="${categoria}">
    <h3>${titulo}</h3>
    <button onclick="verDetalle('${titulo}', '${categoria}', '${descripcion}')">Ver  mas</button>
    <button onclick="verDetalle('${titulo}', '${categoria}', '${descripcion}')">Borrar </button>
 </li>`;

  items.innerHTML += item;
  console.log("tareas");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let titulo = e.target.titulo.value;
  let categoria = e.target.categoria.value;
  let descripcion = e.target.descripcion.value;
  tareas++;

  addItem(titulo, categoria, descripcion);
  formulario.classList.add("dnone");
  listado.classList.remove("dnone");
  form.reset();
});

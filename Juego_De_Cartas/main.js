let section = document.querySelectorAll(".section");
let form = document.getElementById("formulario");
let carouselInner = document.getElementById("carousel-inner");
let carouselTitulos = document.getElementById("carouselTitulos");
let btnGuardar = document.getElementById("guardar");
let cartasPlayer1 = document.getElementById("cartasPlayer1");
let cartasPlayer2 = document.getElementById("cartasPlayer2");
let titulo1 = document.getElementById("titulo1");
let titulo2 = document.getElementById("titulo2");
let ver_match = document.getElementById("ver_match");

//Variables generales
let player1 = "",
  player2 = "",
  suma = 0,
  i = 0,
  suma2 = 0;

//Arreglos
let cartasElegidas = [],
  noElegidas = [],
  partidas = [];
//Funcion para obtener las 6 cartas random
let tirada = () => {
  let random = Math.floor(Math.random() * cartas.length);
  console.log(cartas[random].titulo);
  if (!noElegidas.includes(cartas[random].titulo)) {
    cartasElegidas.push(cartas[random]);
    noElegidas.push(cartas[random].titulo);
  }
};
//esta funcion permite que aparesca cada una de las cartas en el carousel
let carouselPantalla = (elegidas) => {
  elegidas.forEach((carta, index) => {
    if (index == 0) {
      active = "active";
      jugador = player1;
      id = "1";
    } else if (index < 3) {
      active = "";
      jugador = player1;
      id = index + 1;
    } else {
      active = "";
      jugador = player2;
      id = index - 2;
    }
    let primerCard = `<div id='${index}' class=" carousel-item ${active}">
                            <div id="carouselTitulos">
                            <h2 class="txt__general--secundario "> Carta ${id} de ${jugador} </h2>
                            </div>
                            <img src="${carta.img}" class="card d-block w-100" alt="primerCarta"  >
                            <div class="carousel-caption d-md-block">
                                <h4 class="txt__general--secundario " >${carta.titulo}</h4>
                                <p class="txt__general--secundario frase">${carta.descripcion}</p>
                                <p class="frase txt__general--secundario frase dnone">${carta.frase}</p>
                                
                            </div>
                        </div>`;
    carouselInner.innerHTML += primerCard;
  });
};
//Esta es la funcion JUEGO  que se activa al enviar el formulario
let juego = () => {
  cierres("tercer_pantalla");
  while (cartasElegidas.length < 6) {
    tirada();
  }
  carouselPantalla(cartasElegidas);
};

//Funcion Para ingresar al juego
form.addEventListener("submit", function (e) {
  e.preventDefault();
  player1 = e.target.player1.value;
  player2 = e.target.player2.value;
  if (player1 && player2) {
    cierres("segunda_pantalla");
  } else {
    alert("Ingresa los nombres de los jugadores");
  }
  form.reset();
});
//FUNCION Para que se arme el tablero y haga el MATCH
let verTablero = () => {
  titulo1.innerHTML += player1;
  titulo2.innerHTML += player2;
  cartasElegidas.forEach((carta, index) => {
    if (index < 3) {
      let cartas1 = `<img src="${carta.img}" alt="Cartas Jugador 1">`;
      cartasPlayer1.innerHTML += cartas1;
      suma = suma + carta.score;
    } else {
      let cartas2 = `<img src="${carta.img}" alt="Cartas Jugador 2">`;
      cartasPlayer2.innerHTML += cartas2;
      suma2 = suma2 + carta.score;
    }
  });
  if (suma % 2 === 0 && suma % 2 === 0) {
    ver_match.innerHTML = `<h2 class="txt__general--primario">Felicitaciones! HAY MATCH</h2>
        <p class="txt__general--secundario">La fortuna esta en sus cartas</p>`;
    console.log(suma);
    console.log(suma2);
  } else if (suma % 2 === 1 && suma2 % 2 === 1) {
    ver_match.innerHTML = `<h2 class="txt__general--primario">Felicitaciones! HAY MATCH</h2>
    <p class="txt__general--secundario">La fortuna esta en sus cartas</p>`;
    console.log(suma);
    console.log(suma2);
  } else {
    ver_match.innerHTML = `<h2 class="txt__general--primario">NO HAY MATCH</h2>
        <p class="txt__general--secundario">El destino no los favorece</p>`;
    console.log(suma);
    console.log(suma2);
  }
};

//Esta funcion permite abrir y cerrar las pantallas
let cierres = (pagina) => {
  section.forEach((item) => {
    if (item.id === pagina) {
      item.classList.remove("dnone");
      item.classList.add("dflex");
    } else {
      item.classList.add("dnone");
      item.classList.remove("dflex");
    }
  });
  if (pagina === "segunda_pantalla") {
    setTimeout(() => juego(), 3000);
  }
};

//DECLARACIONES PARA BOTONES de CIERRE; MATCH Y CONTINUAR
let btnCierre = document.getElementById("carousel_btn-cierre");
let btnCierreMatch = document.getElementById("btn_cierre--match");
let btn_continuar = document.getElementById("btn_continuar");
let match = document.getElementById("match");
let tirarDenuevo = document.getElementById("tirarDenuevo");
let btnSalir = document.getElementById("salir");
let btn_salir = document.getElementById("salir2");
let partidasGuardadas = document.getElementById("partidasGuardadas");
let partidaJugadores = document.getElementById("partidas");
let primerPantalla = document.getElementById("primer_pantalla");

//FUNCION PARA SALIR Y VOLVER AL INICIO
let salir = () => {
  cartasElegidas = [];
  noElegidas = [];
  carouselInner.innerHTML = "";
  cartasPlayer1.innerHTML = "";
  cartasPlayer2.innerHTML = "";
  ver_match.innerHTML = "";
  titulo1.innerHTML = "";
  titulo2.innerHTML = "";
  btnGuardar.classList.remove("dnone");
  cierres("primer_pantalla");
};
//FUNCION QUE PERMITE GUARDAR PARTIDAS
let guardar = () => {
  partidas.push(cartasElegidas);
  partidasGuardadas.classList.add("dflex");
  partidasGuardadas.classList.remove("dnone");
  primerPantalla.classList.add("section_inicio--partidas");
  primerPantalla.classList.remove("section_inicio");
  console.log(partidas);
  partidaJugadores.innerHTML += `<li><p class="txt__general--secundario txt_partidas" >${player1} y ${player2}</p>
                            <button id=${i} class="btn_ver btn--general" data-btn="">Ver</button></li>`;
  i++;
  salir();
};
//ESTO PERMITE VER LAS PARTIDAS GUARDADAS
partidaJugadores.addEventListener("click", function (e) {
  if (e.target.localName == "button") {
    let posicion = e.target.id;
    console.log(posicion);
    cartasElegidas = partidas[posicion];
    cierres("tercer_pantalla");
    if (partidas.includes(cartasElegidas)) {
      btnGuardar.classList.add("dnone");
      tirarDenuevo.classList.add("dnone");
    }
    carouselPantalla(cartasElegidas);
  }
});

btnCierre.addEventListener("click", function () {
  cierres("section_opciones");
});
btn_continuar.addEventListener("click", function () {
  cierres("section_opciones");
});
match.addEventListener("click", function () {
  cierres("match_pantalla");
  verTablero();
});
tirarDenuevo.addEventListener("click", function () {
  cartasElegidas = [];
  carouselInner.innerHTML = "";
  cierres("segunda_pantalla");
});
btnSalir.addEventListener("click", salir);
btnGuardar.addEventListener("click", guardar);
btn_salir.addEventListener("click", salir);
btnCierreMatch.addEventListener("click", salir);

// initial data
let currentColor = "black"; // seta o preto como 'padrão'
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d"); // pega as dimensões da tela

// events
document.querySelectorAll(".colorArea .color").forEach((item) => {
  item.addEventListener("click", colorClickEvent);
});

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);

document.querySelector(".clear").addEventListener("click", clearScreen);

//functions
function colorClickEvent(e) {
  let color = e.target.getAttribute("data-color");
  // console.log("Cor clicada:", color);
  currentColor = color;

  document.querySelector(".color.active").classList.remove("active"); //remove a class
  e.target.classList.add("active"); //adiciona no item clicado
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft; //distancia do elemento para o fim da página à esquerda
  mouseY = e.pageY - screen.offsetTop; // distancia do elemento para o início da página acima
}

function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  //recebe as duas posições
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  //Para fazer a 'linha'
  ctx.beginPath(); //começo o desenho
  ctx.lineWidth = 4; //grossura da linha
  ctx.lineJoin = "round"; // formato
  ctx.moveTo(mouseX, mouseY); // para onde ele vai mover
  ctx.lineTo(pointX, pointY);
  ctx.closePath(); //termina o desenho
  ctx.strokeStyle = currentColor; // qual cor será a linha
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

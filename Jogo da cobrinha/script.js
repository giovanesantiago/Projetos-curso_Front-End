// adicionando area HTML do elemento Canvas
let canvas = document.getElementById("snake");
// Definindo context bidimencional
let context = canvas.getContext('2d');
// tamanho da cx
let box = 32;
// Criando Arrays para função da criação da cobra
let snake = []
snake[0] = {
    //tamanho da cobra
    x: 8 * box,
    y: 8 * box
}
//direção 
let direction = "right";
// comida
let food = {
    // randomizando o local
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box 
}

// Criando a area do jogo
function criarBG() {
    //definindo cor de fundo
    context.fillStyle = "lightgreen";
    //definindo tamanho da area
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Criando Cobra
function criarCobrinha() {
    for(i = 0 ; i < snake.length; i++){
        //cor da cobra
        context.fillStyle = "green";
        //Defindo tamanho de 1caixa
        context.fillRect(snake[i].x, snake[i].y, box, box); 
    }
}

// gerando comida
function drawFood() {
    // stylo e lugar da comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Entrada de comando do ursuario
document.addEventListener('keydown', update);
function update (event) {
    //verificando tecla e criando regra de nao contrario
    if (event.keyCode == 37 && direction != "right" ) direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down"
}

//Inicio para dar movimento a cobra
function iniciarJogo() {

    //regra para cobra nao sumir fora do mapa
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //iniciando funções
    criarBG();
    criarCobrinha();
    drawFood();

    //Ponto de partida ca cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Criando Os movimentos 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // up da cobrinha
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    
    //movimento da cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead);
}
// variavel que inicia jogo a cada 100ml sem pausa
let jogo = setInterval(iniciarJogo, 100);



class Game {
    static grid = 16;
    static W = 800;
    static H = 480;
    constructor() {
        var board = document.getElementById('board');
        board.width = Game.W;
        board.height = Game.H;

        var hscore = document.getElementById('hscore');
        var score = document.getElementById('score');
        var isGameOver = true;
        var isFirstPlay = true;
        var isPlayedSound = false;
        var context = board.getContext('2d');
        var gameOverSound = new Audio('assets/sound/game_over.mp3');

        var snake = new Snake();
        var apple = new Food();
        var isInitGame = false;



        var img = loadImages(["assets/snake.png"])[0]

        var count = 0;

        function newgame() {
            // score.innerHTML = 0;
            snake.init();
            apple.getnewfood();
        }



        function main() {
            requestAnimationFrame(main);
            if (!isInitGame) {
                newgame();
                isInitGame = true;
            }
            render();
        }

        function render() {
            if (!isGameOver) {
                if (++count < Snake.max_speed - snake.speed) {
                    return;
                }

                count = 0;
                context.clearRect(0, 0, board.width, board.height);

                isGameOver = !snake.keep_moving();

                if (isGameOver) {
                    isInitGame = false;
                    isPlayedSound = false;
                }

                apple.draw(context, img);
                // snake ate apple
                if (snake.cells[0].x === apple.x && snake.cells[0].y === apple.y) {
                    var audio = new Audio('assets/sound/apple_eat.wav');
                    audio.play();
                    snake.maxCells++;
                    apple.getnewfood(snake.cells);
                    snake.score += 1;
                    score.innerHTML = snake.score;
                    if (apple.affect === "down") {
                        snake.speed_down();
                    } else if (apple.affect === "up") {

                        // snake.speed_up();
                    }
                }

                // draw snake one cell at a time
                snake.draw(context, img);
            } else { //GameOver
                if (isFirstPlay) {
                    isFirstPlay = false;
                } else {
                    if (!isPlayedSound) {
                        {
                            gameOverSound.play();
                            isPlayedSound = true;
                        }
                    } 
                }
                var current_hscore = parseInt(hscore.innerHTML);
                var current_score = parseInt(score.innerHTML);
                if(current_score > current_hscore)
                {
                    hscore.innerHTML = current_score;
                }
                score.innerHTML = 0;
                context.fillStyle = "#4336f4";
                context.font = "30px Verdana";
                drawCenterText("Press any key to start!", 0, board.height / 2, board.width);

            }
        }

        function drawCenterText(text, x, y, width) {
            var textdim = context.measureText(text);
            context.fillText(text, x + (width - textdim.width) / 2, y);
        }

        document.addEventListener('keydown', function (e) {
            if (isGameOver) {
                isGameOver = false;
            } else {

                // left arrow key
                if ((e.which === 37 || e.keyCode === 65) && snake.dx === 0) {
                    snake.dx = -Game.grid;
                    snake.dy = 0;
                }
                // up arrow key
                else if ((e.which === 38 || e.keyCode === 87) && snake.dy === 0) {
                    snake.dy = -Game.grid;
                    snake.dx = 0;
                }
                // right arrow key
                else if ((e.which === 39 || e.keyCode === 68) && snake.dx === 0) {
                    snake.dx = Game.grid;
                    snake.dy = 0;
                }
                // down arrow key
                else if ((e.which === 40 || e.keyCode === 83) && snake.dy === 0) {
                    snake.dy = Game.grid;
                    snake.dx = 0;
                }
            }
        });
        // start the game
        requestAnimationFrame(main);
    }
}
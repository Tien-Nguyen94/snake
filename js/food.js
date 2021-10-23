function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.affect = "up";
    }

    getnewfood(block_cells = []) {
        var isloop = true;
        var tmp_x = 0,
            tmp_y = 0;
        while (isloop) {
            isloop = false;
            tmp_x = getRandomInt(0, Math.floor(Game.W / Game.grid)) * Game.grid;
            tmp_y = getRandomInt(0, Math.floor(Game.H / Game.grid)) * Game.grid;
            for (var i = 0; i < block_cells.length; i++) {
                if (tmp_x == block_cells[i].x && tmp_y == block_cells[i].y) {
                    isloop = true;
                    break;
                }
            }
        }
        this.x = tmp_x;
        this.y = tmp_y;
    }

    draw(context, img) {
        context.drawImage(img, 2 * 40, 2 * 40, 40, 40, this.x, this.y, Game.grid, Game.grid);
    }
}
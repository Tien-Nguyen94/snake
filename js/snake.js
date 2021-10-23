class Snake {
  static normal_speed = 4;
  static min_speed = 1;
  static max_speed = 10;
  constructor(){}
  init() {
    this.x = Math.floor(board.width / 2);
    this.y = Math.floor(board.height / 2);
    this.dx = Game.grid;
    this.dy = 0;
    this.cells = [];
    this.cells.push({
      x: this.x - 1,
      y: this.y
    });
    this.cells.push({
      x: this.x - 2,
      y: this.y
    });
    this.maxCells = 3;
    this.score = 0;
    this.speed = Snake.normal_speed;
  }

  speed_down() {
    if (this.speed > Snake.min_speed)
      this.speed -= 1;
  }

  speed_up() {
    if (this.speed < Snake.max_speed)
      this.speed += 1;
  }

  keep_moving() {
    // move snake by it's velocity
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x >= board.width || this.y < 0 || this.y >= board.height) {
      return false
    }

    // keep track of where snake has been. front of the array is always the head
    this.cells.unshift({
      x: this.x,
      y: this.y
    });

    // remove cells as we move away from them
    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
    return true;

  }

  draw(context, img) {
  
    for (var i = 0; i < this.cells.length; i++) {
      var cell = this.cells[i];
      var cellx = cell.x;
      var celly = cell.y;

      // Sprite column and row that gets calculated
      var tx = 0;
      var ty = 0;

      if (i == 0) { // HEAD
        var nextCell = this.cells[i + 1];
        if (celly < nextCell.y) {
          // Up
          tx = 0;
          ty = 0;
        } else if (cellx > nextCell.x) {
          // Right
          tx = 3;
          ty = 0;
        } else if (celly > nextCell.y) {
          // Down
          tx = 1;
          ty = 0;
        } else if (cellx < nextCell.x) {
          // Left
          tx = 2;
          ty = 0;
        }

      } else if (i == this.cells.length - 1) { //TAIL
        var pseg = this.cells[i - 1]; // Prev segment
        if (pseg.y < celly) {
          // Up
          tx = 5;
          ty = 1;
        } else if (pseg.x > cellx) {
          // Right
          tx = 0;
          ty = 2;
        } else if (pseg.y > celly) {
          // Down
          tx = 4;
          ty = 1;
        } else if (pseg.x < cellx) {
          // Left
          tx = 1;
          ty = 2;
        }
      } else { //BODY

        var pseg = this.cells[i - 1]; // Previous segment
        var nextCell = this.cells[i + 1]; // Next segment

        if (pseg.x == cellx && cellx == nextCell.x) { // vertical
          tx = 5;
          ty = 0;
        } else if (pseg.y == celly && celly == nextCell.y) { // horizontal
          tx = 4;
          ty = 0;
        } else {
          var x = (nextCell.x + pseg.x) / 2 - cellx;
          var y = (nextCell.y + pseg.y) / 2 - celly;

          if (x < 0 && y > 0) {
            // Angle Left-Down
            tx = 1;
            ty = 1;

          } else if (x > 0 && y < 0) {
            // Angle Right-Up
            tx = 3;
            ty = 1;
          } else if (x > 0 && y > 0) {
            // Angle Down-Right
            tx = 0;
            ty = 1;
          } else {
            // Angle Top-Left
            tx = 2;
            ty = 1;
          }
        }
      }
      context.drawImage(img, tx * 40, ty * 40, 40, 40, cellx, celly, Game.grid, Game.grid);
    }
  }
}
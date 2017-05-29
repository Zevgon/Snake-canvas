import Snake from './snake';
import {
  VALID_DIRS,
  COLOR_MAP,
} from './constants';

export default class Board {
  constructor(rows, cols, canvasEl) {
    this.rows = rows;
    this.cols = cols;
    this.canvas = canvasEl.getContext('2d');
    this.width = parseInt($(canvas).css('width'));
    this.height = parseInt($(canvas).css('height'));
    this.widthRatio = parseInt(this.width / cols);
    this.heightRatio = parseInt(this.height / rows);
    this.grid = canvas.getContext("2d");
    this.grid.scale(this.widthRatio, this.heightRatio);
    this.direction = 'n';
    this.reset();
  }

  reset() {
    this.snake = new Snake([this.getStartingCoord()]);
    this.grid.clearRect(0, 0, this.width, this.height);
    this.direction = 'n';
    this.fillSquare(this.snake.head(), 'snake');
  }

  changeDirection(newDir) {
    if (this.validDirection(this.direction, newDir)) {
      this.direction = newDir;
    }
  }

  fillSquare(coord, type) {
    const color = COLOR_MAP[type];
    if (!color) {
      throw 'Invalid color!';
    }
    this.grid.fillStyle = color;
    this.grid.fillRect(...this.coordToCanvas(coord));
  }

  validPos(pos) {
    if (this.snake.set.has(pos.toString()) &&
        pos.toString() !== this.snake.head().toString()) {
      return false;
    }
    if (pos[0] < 0 || pos[0] >= this.columns || pos[1] < 0 || pos[1] >= this.rows) {
      return false;
    }
    return true;
  }

  clearSnake() {
    this.snake.queue.forEach(coord => {
      this.fillSquare(coord, 'empty');
    });
  }

  getStartingCoord() {
    const x = parseInt(this.cols / 2);
    const y = this.rows - 1;
    return [x, y];
  }

  coordToCanvas(coord) {
    return [coord[0], coord[1], 1, 1];
  }

  validDirection(oldDir, newDir) {
    return VALID_DIRS[oldDir].includes(newDir);
  }

  move() {
    const tail = this.snake.move(this.direction);
    if (tail) {
      this.fillSquare(tail, 'empty');
    }
    if (this.validPos(this.snake.head())) {
      this.fillSquare(this.snake.head(), 'snake');
      return true;
    } else {
      this.clearSnake();
      this.reset();
      return false;
    }
  }
}

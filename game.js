import Snake from './snake.js';
import {
  COLOR_MAP,
  KEY_TO_DIR,
  VALID_DIRS,
} from './constants';

export default class Game {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    const canvas = document.getElementById('canvas');
    const width = parseInt($(canvas).css('width'));
    const height = parseInt($(canvas).css('height'));
    this.widthRatio = parseInt(width / columns);
    this.heightRatio = parseInt(height / rows);
    this.grid = canvas.getContext("2d");
    this.grid.scale(this.widthRatio, this.heightRatio);
    this.reset();
    this.startEventListner();
  }

  reset() {
    this.snake = new Snake([this.getStartingCoord()]);
    this.fillSquare(this.snake.head(), 'snake');
    this.direction = 'n';
  }

  validDirection(dir) {
    return VALID_DIRS[this.direction].includes(dir);
  }

  startEventListner() {
    document.addEventListener('keydown', e => {
      const dir = KEY_TO_DIR[e.which];
      if (this.validDirection(dir)) {
        this.direction = dir;
      }
    });
  }

  getStartingCoord() {
    const x = parseInt(this.columns / 2);
    const y = this.rows - 1;
    return [x, y];
  }

  coordToCanvas(coord) {
    return [coord[0], coord[1], 1, 1];
  }

  start() {
    this.interval = setInterval(this.move.bind(this), 200);
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

  move() {
    const tail = this.snake.move(this.direction);
    if (tail) {
      this.fillSquare(tail, 'empty');
    }
    if (this.validPos(this.snake.head())) {
      this.fillSquare(this.snake.head(), 'snake');
    } else {
      clearInterval(this.interval);
      this.clearSnake();
      this.reset();
    }
  }
}

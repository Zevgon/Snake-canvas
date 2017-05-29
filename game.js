import Snake from './snake.js';

const COLOR_MAP = {
  'snake': 'red',
  'empty': 'white',
}

const KEY_TO_DIR = {
  '37': 'w',
  '38': 'n',
  '39': 'e',
  '40': 's',
}

const VALID_DIRS = {
  'n': ['e', 'w'],
  's': ['e', 'w'],
  'e': ['n', 's'],
  'w': ['n', 's'],
}

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
    this.snake = new Snake([this.getStartingCoord()]);
    this.fillSquare(this.snake.head(), 'snake');
    this.direction = 'n';
    this.startEventListner();
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

  move() {
    const tail = this.snake.move(this.direction);
    if (tail) {
      this.fillSquare(tail, 'empty');
    }
    this.fillSquare(this.snake.head(), 'snake');
  }
}

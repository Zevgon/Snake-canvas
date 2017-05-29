import Grid from './grid';
import { KEY_TO_DIR } from './constants';

export default class Game {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = new Grid(rows, columns, document.getElementById('canvas'));
    this.startEventListner();
  }

  startEventListner() {
    document.addEventListener('keydown', e => {
      const dir = KEY_TO_DIR[e.which];
      this.grid.changeDirection(dir);
    });
  }

  start() {
    this.interval = setInterval(this.handleMove.bind(this), 200);
  }

  handleMove() {
    const moved = this.grid.move();
    if (!moved) {
      clearInterval(this.interval);
      this.grid.reset();
    }
  }
}

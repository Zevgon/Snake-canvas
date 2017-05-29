export default class Snake {
  constructor(coords) {
    this.queue = coords;
    this.set = new Set;
    coords.forEach(coord => {
      this.set.add(coord.toString());
    });
  }

  getNewHead(head, dir) {
    switch (dir) {
      case 'n':
        return [head[0], head[1] - 1]
      case 's':
        return [head[0], head[1] + 1]
      case 'e':
        return [head[0] + 1, head[1]]
      case 'w':
        return [head[0] - 1, head[1]]
      default:
        throw 'Invalid direction!';
    }
  }

  head() {
    return this.queue[0];
  }

  move(dir, removeTail=true) {
    const head = this.queue[0];
    const newHead = this.getNewHead(head, dir);
    this.queue.unshift(newHead);
    this.set.add(newHead.toString());
    if (removeTail) {
      const tail = this.queue.pop();
      if (!this.set.delete(tail.toString())) {
        throw 'Oops! Queue doesn\'t match set';
      }
      return tail;
    }
  }
}

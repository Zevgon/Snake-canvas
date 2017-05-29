import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(30, 30);
  window.game = game;
  $('#start').on('click', () => {
    game.start();
  });
});

(function GameBoard() {
  const game = gameProgress();
  function EventListener() {
    const board = document.querySelector('.board');
    for (let i = 1; i <= 9; i++) {
      const boardChild = document.querySelector(`#square${i}`);
      boardChild.addEventListener('mouseenter', function () {
        if (boardChild.childNodes.length >= 1) {
          return;
        }
        const div = document.createElement('div');
        div.classList.add('hoverIndicator');
        div.id = `hovering${i}`;
        boardChild.appendChild(div);
      });
      boardChild.addEventListener('mouseleave', function () {
        const div = document.querySelector(`#hovering${i}`);
        if (div) {
          boardChild.removeChild(div);
        } else {
          return;
        }
      });
      boardChild.addEventListener('click', function () {
        const div = document.querySelector(`#hovering${i}`);
        boardChild.removeChild(div);
        if (game.currentPosition() % 2 == 0) {
          const svg = document.createElement('svg');
          svg.innerHTML += `<svg width="120" height="120" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M110 30C59.5679 30 29.3384 70.3456 30.0108 111.036C30.6747 151.221 60.4323 190 110 190C159.568 190 189.325 151.221 189.989 111.036C190.662 70.3456 160.432 30 110 30ZM0.0148552 111.532C-0.893647 56.5475 40.4394 0 110 0C179.561 0 220.894 56.5475 219.985 111.532C219.094 165.454 178.459 220 110 220C41.5413 220 0.905809 165.454 0.0148552 111.532Z" fill="#AA555A"/>
          </svg>`;
          svg.classList.add('card');
          boardChild.appendChild(svg);
          game.increasePosition();
          game.updateTurnIndicator();
        } else {
          const svg = document.createElement('svg');
          svg.innerHTML += `<svg width="120" height="120" viewBox="0 0 211 211" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M83.4553 105.865L5.50631 27.9161C-0.681989 21.7278 -0.68199 11.6946 5.50631 5.50627C11.6946 -0.682024 21.7278 -0.682022 27.9161 5.50628L105.865 83.4553L183.814 5.50628C190.002 -0.682014 200.036 -0.682016 206.224 5.50628C212.412 11.6946 212.412 21.7278 206.224 27.9161L128.275 105.865L206.224 183.814C212.412 190.002 212.412 200.036 206.224 206.224C200.036 212.412 190.002 212.412 183.814 206.224L105.865 128.275L27.9161 206.224C21.7278 212.412 11.6946 212.412 5.50631 206.224C-0.681993 200.036 -0.681992 190.002 5.5063 183.814L83.4553 105.865Z" fill="#345F82"/>
          </svg>`;
          svg.classList.add('card');
          boardChild.appendChild(svg);
          game.increasePosition();
          game.updateTurnIndicator();
        }
      });
    }
  }
  function gameProgress() {
    let position = 1;
    function increasePosition() {
      position += 1;
    }
    function currentPosition() {
      return position;
    }
    function updateTurnIndicator() {
      const p = document.querySelector('#player1');
      const p2 = document.querySelector('#player2');
      if (currentPosition() % 2 == 0) {
        p.style.fontWeight = 'normal';
        p2.style.fontWeight = 'bold';
      } else {
        p.style.fontWeight = 'bold';
        p2.style.fontWeight = 'normal';
      }
    }
    return { position, increasePosition, currentPosition, updateTurnIndicator };
  }
  EventListener();
})();

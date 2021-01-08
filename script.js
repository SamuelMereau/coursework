const googleHomepage = document.querySelector('#google');
googleHomepage.addEventListener('click', function () {
  window.location.href = 'https://sammc-google-homepage.netlify.com';
});
const etchasketch = document.querySelector('#etchasketch');
etchasketch.addEventListener('click', function () {
  window.location.href = 'https://sammc-etch-a-sketch.netlify.com';
});
const rockpaperscissors = document.querySelector('#rockpaperscissors');
rockpaperscissors.addEventListener('click', function () {
  window.location.href = 'https://sammc-rock-paper-scissors.netlify.com';
});
const calculator = document.querySelector('#calculator');
calculator.addEventListener('click', function () {
  window.location.href = 'https://sammc-calculator.netlify.com';
});
const library = document.querySelector('#library');
library.addEventListener('click', function () {
  window.location.href = 'https://sammc-library.netlify.com';
});

const profileImg = document.querySelector('#profile-img');
function createBubble() {
  const profile = document.querySelector('.profile');
  const div = document.createElement('div');
  div.id = 'bubble';
  const p = document.createElement('p');
  p.textContent = '👋';
  div.append(p);
  profile.appendChild(div);
}
profileImg.addEventListener('mouseenter', createBubble);
profileImg.addEventListener('click', function () {
  window.location.href = 'https://github.com/SamuelMereau';
});
profileImg.addEventListener('mouseout', function () {
  const bubble = document.querySelector('#bubble');
  bubble.remove();
});

const github = document.querySelector('#github-link');
github.addEventListener('click', function () {
  window.location.href = 'https://github.com/SamuelMereau/coursework';
});

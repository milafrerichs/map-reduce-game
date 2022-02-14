import Game from '../src/Game.svelte';


function gameEvent(direction, slideIndex) {
  window.dispatchEvent(new CustomEvent(`mrGame:${direction}`, { bubbles: true, detail: { slideIndex } }))
}

document.getElementById("next").addEventListener("click", () => {
  gameEvent("next", 1)
})

document.getElementById("prev").addEventListener("click", () => {
  gameEvent("prev", 1)
})

const app = new Game({
  target: document.getElementById("app"),
  props: { name: 'world' }
});

export default app;

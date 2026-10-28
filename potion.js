const ingredients = [
  { id: 'lavender', name: 'Lavender', image: 'lavander.png' },
  { id: 'moonstone', name: 'Moonstone', image: 'moonstone.png' },
  { id: 'rosemary', name: 'Rosemary', image: 'rosemary.png' },
  { id: 'wormwood', name: 'Wormwood', image: 'wormwood.png' },
  { id: 'sage', name: 'Sage', image: 'sage.png' },
  { id: 'salt', name: 'Sea salt', image: 'salt.png' },
  { id: 'knotgrass', name: 'Knotgrass', image: 'knotgrass.png' },
];

const birthstones = [
  ['january', 'Garnet'], ['february', 'Amethyst'], ['march', 'Aquamarine'],
  ['april', 'Diamond'], ['may', 'Emerald'], ['june', 'Alexandrite'],
  ['july', 'Ruby'], ['august', 'Peridot'], ['september', 'Sapphire'],
  ['october', 'Tourmaline'], ['november', 'Topaz'], ['december', 'Zircon'],
].map(([month, stone]) => ({
  id: month,
  stone,
  label: `${month[0].toUpperCase()}${month.slice(1)}`,
  name: `${month[0].toUpperCase()}${month.slice(1)} birthstone (${stone})`,
  image: `${month}.png`,
}));

// The curser's birthstone must be the eighth and final ingredient.
const recipe = ['salt', 'wormwood', 'sage', 'knotgrass', 'moonstone', 'lavender', 'rosemary', 'july'];
const dialog = document.getElementById('potionDialog');
const cauldron = document.getElementById('cauldronArt');
const shelf = document.getElementById('ingredientShelf');
const brewButton = document.getElementById('brewPotion');
const brewingView = document.getElementById('brewingView');
const resultView = document.getElementById('potionResult');
const endGame = document.getElementById('endGame');
const potionImage = document.getElementById('potionImage');
const endGameImage = document.getElementById('endGameImage');
const resetButton = document.getElementById('resetPotion');
const returnToGarden = document.getElementById('returnToGarden');
let phase = 'mixing';
let brewTimer = null;
let added = [];
let brewResult = null;

function renderIngredients(items, grid, cropBirthstones = false) {
  for (const ingredient of items) {
    const button = document.createElement('button');
    button.className = 'ingredient';
    button.type = 'button';
    button.dataset.ingredient = ingredient.id;
    button.setAttribute('aria-label', `Add ${ingredient.name.toLowerCase()} to the cauldron`);
    const image = document.createElement('img');
    image.src = `assets/potionassets/${ingredient.image}`;
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = ingredient.label || ingredient.name;
    if (cropBirthstones) {
      const stoneLabel = document.createElement('span');
      stoneLabel.textContent = ingredient.stone;
      button.append(stoneLabel);
      const crop = document.createElement('div');
      crop.className = 'birthstone-crop';
      crop.append(image);
      button.append(crop);
    } else {
      button.append(image);
    }
    button.append(label);
    button.addEventListener('click', () => addIngredient(ingredient));
    grid.append(button);
  }
}

renderIngredients(ingredients, document.getElementById('ingredientGrid'));
renderIngredients(birthstones, document.getElementById('birthstoneGrid'), true);

function renderBrew() {
  const complete = brewResult === 'success';
  cauldron.classList.toggle('brewing', phase === 'brewing');
  resetButton.disabled = phase === 'brewing';
  brewButton.disabled = added.length !== recipe.length || brewResult !== null;
  for (const button of shelf.querySelectorAll('button')) {
    button.disabled = phase !== 'mixing' || complete || added.length === recipe.length || added.includes(button.dataset.ingredient);
  }
}

function addIngredient(ingredient) {
  if (phase !== 'mixing' || added.length === recipe.length || added.includes(ingredient.id)) return;
  added.push(ingredient.id);
  renderBrew();
}

brewButton.addEventListener('click', () => {
  if (added.length !== recipe.length || brewResult !== null) return;
  const correct = recipe.every((id, index) => added[index] === id);
  brewResult = correct ? 'success' : 'failure';
  phase = 'brewing';
  renderBrew();
  brewTimer = setTimeout(() => {
    brewTimer = null;
    phase = 'ready';
    potionImage.src = correct
      ? 'assets/potionassets/goodpotion.png'
      : `assets/potionassets/badpotion${Math.floor(Math.random() * 4) + 1}.png`;
    brewingView.hidden = true;
    resultView.hidden = false;
    document.getElementById('drinkPotion').focus();
    renderBrew();
  }, 1800);
});

document.getElementById('openPotion').addEventListener('click', () => dialog.showModal());
document.getElementById('closePotion').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
function resetPotion() {
  clearTimeout(brewTimer);
  brewTimer = null;
  added = [];
  brewResult = null;
  phase = 'mixing';
  brewingView.hidden = false;
  resultView.hidden = true;
  endGame.hidden = true;
  returnToGarden.hidden = true;
  renderBrew();
}
resetButton.addEventListener('click', resetPotion);
returnToGarden.addEventListener('click', () => {
  resetPotion();
  dialog.close();
  document.getElementById('openPotion').focus();
});
document.getElementById('discardPotion').addEventListener('click', () => {
  resetPotion();
  shelf.querySelector('button').focus();
});
document.getElementById('drinkPotion').addEventListener('click', () => {
  if (phase !== 'ready') return;
  phase = 'finished';
  const won = brewResult === 'success';
  const message = won ? 'You broke the curse.' : "You've died.";
  endGameImage.hidden = false;
  endGameImage.alt = message;
  endGameImage.src = `assets/potionassets/${won ? 'endGameWin' : 'endGameDie'}.png`;
  resultView.hidden = true;
  endGame.hidden = false;
  returnToGarden.hidden = won;
  (won ? document.getElementById('closePotion') : returnToGarden).focus();
});
// Keep the outcome readable until the ending artwork is supplied.
endGameImage.addEventListener('error', () => { endGameImage.hidden = true; });
renderBrew();

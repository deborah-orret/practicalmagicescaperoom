const ingredients = [
  { id: 'lavender', name: 'Lavender', image: 'lavander.png' },
  { id: 'moonstone', name: 'Moonstone', image: 'moonstone.png' },
  { id: 'rosemary', name: 'Rosemary', image: 'rosemary.png' },
  { id: 'rubies', name: 'Crushed rubies', image: 'rubies.png' },
  { id: 'sage', name: 'Sage', image: 'sage.png' },
  { id: 'salt', name: 'Sea salt', image: 'salt.png' },
  { id: 'knotgrass', name: 'Knotgrass', image: 'knotgrass.png' },
];

// Change this sequence to update the puzzle's recipe.
const recipe = ['salt', 'rubies', 'sage', 'knotgrass', 'moonstone', 'lavender', 'rosemary'];
const dialog = document.getElementById('potionDialog');
const status = document.getElementById('brewStatus');
const progress = document.getElementById('brewProgress');
const cauldron = document.getElementById('cauldronArt');
const shelf = document.getElementById('ingredientGrid');
const brewButton = document.getElementById('brewPotion');
let added = [];
let brewResult = null;

for (const ingredient of ingredients) {
  const button = document.createElement('button');
  button.className = 'ingredient';
  button.type = 'button';
  button.dataset.ingredient = ingredient.id;
  button.setAttribute('aria-label', `Add ${ingredient.name.toLowerCase()} to the cauldron`);
  const image = document.createElement('img');
  image.src = `assets/potionassets/${ingredient.image}`;
  image.alt = '';
  const label = document.createElement('span');
  label.textContent = ingredient.name;
  button.append(image, label);
  button.addEventListener('click', () => addIngredient(ingredient));
  shelf.append(button);
}

function renderBrew() {
  const complete = brewResult === 'success';
  if (progress) progress.textContent = `${added.length} of ${recipe.length} ingredients added`;
  cauldron.classList.toggle('brewing', added.length > 0);
  cauldron.classList.toggle('complete', complete);
  brewButton.disabled = added.length !== recipe.length || brewResult !== null;
  for (const button of shelf.querySelectorAll('button')) {
    button.disabled = complete || added.includes(button.dataset.ingredient);
  }
}

function addIngredient(ingredient) {
  if (added.length === recipe.length || added.includes(ingredient.id)) return;
  added.push(ingredient.id);
  if (status) status.textContent = added.length === recipe.length
    ? 'All ingredients added. Click Brew to test your potion.'
    : `${ingredient.name} added. Choose your next ingredient.`;
  renderBrew();
}

brewButton.addEventListener('click', () => {
  if (added.length !== recipe.length || brewResult !== null) return;
  const correct = recipe.every((id, index) => added[index] === id);
  brewResult = correct ? 'success' : 'failure';
  if (status) status.textContent = correct
    ? 'The potion glows gold. You followed the recipe perfectly — your potion is complete!'
    : 'The potion fizzles. That order did not work. Click Reset to try a different order.';
  renderBrew();
});

document.getElementById('openPotion').addEventListener('click', () => dialog.showModal());
document.getElementById('closePotion').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.getElementById('resetPotion').addEventListener('click', () => {
  added = [];
  brewResult = null;
  if (status) status.textContent = 'The cauldron is ready. Choose your first ingredient.';
  renderBrew();
});
renderBrew();

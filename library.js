/* ==========================================
   PRACTICAL MAGIC — LIBRARY
   ========================================== */

const imageOverlay = document.getElementById("imageOverlay");
const overlayImage = document.getElementById("overlayImage");
const closeImageOverlay = document.getElementById("closeImageOverlay");
const bookSearch = document.getElementById("bookSearch");
const bookTitleOptions = document.getElementById("bookTitles");
const toggleBooks = document.getElementById("toggleBooks");
const librarySearch = document.getElementById("librarySearch");
const libraryCat = document.getElementById("libraryCat");
const uniqueTitles = [...new Set(bookTitles)].sort(function(a, b) {
  return a.localeCompare(b);
});

let matchingTitles = [];
let activeIndex = -1;

function closeOptions() {
  bookTitleOptions.hidden = true;
  bookSearch.setAttribute("aria-expanded", "false");
  bookSearch.removeAttribute("aria-activedescendant");
  activeIndex = -1;
}

function showOptions() {
  const query = bookSearch.value.trim().toLowerCase();
  matchingTitles = uniqueTitles.filter(function(title) {
    return title.toLowerCase().includes(query);
  });
  bookTitleOptions.replaceChildren();
  activeIndex = -1;
  bookSearch.removeAttribute("aria-activedescendant");

  matchingTitles.forEach(function(title, index) {
    const option = document.createElement("div");
    option.id = "book-option-" + index;
    option.className = "book-option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.textContent = title;
    option.addEventListener("click", function() {
      openBook(title);
    });
    bookTitleOptions.appendChild(option);
  });

  if (!matchingTitles.length) {
    const message = document.createElement("div");
    message.className = "book-options-empty";
    message.textContent = "No books found";
    bookTitleOptions.appendChild(message);
  }
  bookTitleOptions.hidden = false;
  bookSearch.setAttribute("aria-expanded", "true");
}

function setActiveOption(index) {
  const options = bookTitleOptions.querySelectorAll('[role="option"]');
  if (!options.length) return;
  if (activeIndex >= 0) options[activeIndex].setAttribute("aria-selected", "false");
  activeIndex = Math.max(0, Math.min(index, options.length - 1));
  const option = options[activeIndex];
  option.setAttribute("aria-selected", "true");
  bookSearch.setAttribute("aria-activedescendant", option.id);
  option.scrollIntoView({ block: "nearest" });
}

// Assign each title a consistent position on the six shelves.
function bookPosition(title) {
  const shelfCounts = [45, 48, 48, 45, 48, 48];
  const shelfBottoms = [16.5, 32.7, 48.5, 65.5, 81.7, 97.5];
  let index = uniqueTitles.indexOf(title);
  let shelf = 0;
  while (index >= shelfCounts[shelf]) {
    index -= shelfCounts[shelf++];
  }
  const bookX = 3 + (index + 0.5) * 94 / shelfCounts[shelf];
  return {
    x: Math.max(0, Math.min(86, bookX - 7)),
    y: Math.max(0, shelfBottoms[shelf] - 19)
  };
}

function moveCat(keyframes, duration) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Promise.resolve();
  }
  return libraryCat.animate(keyframes, {
    duration: duration,
    easing: "ease-in-out",
    fill: "forwards"
  }).finished;
}

async function openBook(title) {
  closeOptions();
  bookSearch.value = "";
  librarySearch.hidden = true;
  const position = bookPosition(title);
  const x = position.x + "%";
  const y = position.y + "%";

  libraryCat.className = "library-cat " + (position.x > 82 ? "walk-right" : "walk-left");
  await moveCat([{ left: "82%", top: "80%" }, { left: x, top: "80%" }], 3200);
  libraryCat.style.left = x;
  libraryCat.style.top = "80%";
  libraryCat.getAnimations().forEach(function(animation) {
    if (animation.effect instanceof KeyframeEffect && animation.playState === "finished") animation.cancel();
  });

  libraryCat.className = "library-cat jump";
  await moveCat([{ left: x, top: "80%" }, { left: x, top: y }], 1400);
  libraryCat.style.top = y;
  libraryCat.getAnimations().forEach(function(animation) {
    if (animation.effect instanceof KeyframeEffect && animation.playState === "finished") animation.cancel();
  });

  libraryCat.className = "library-cat touch";
  await new Promise(function(resolve) {
    setTimeout(resolve, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500);
  });

  libraryCat.hidden = true;
  const isAlice = title === "Alice in Wonderland";
  overlayImage.src = isAlice
    ? "assets/libraryassets/bookwithriddle.png"
    : "assets/libraryassets/bookwithoutriddle.png";
  overlayImage.alt = isAlice ? "Open book with a riddle" : "Open book";
  imageOverlay.hidden = false;
  closeImageOverlay.focus();
}

bookSearch.addEventListener("click", function() {
  if (bookTitleOptions.hidden) showOptions();
});
bookSearch.addEventListener("input", showOptions);
bookSearch.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (bookTitleOptions.hidden) showOptions();
    setActiveOption(event.key === "ArrowDown" ? activeIndex + 1 : (activeIndex < 0 ? matchingTitles.length - 1 : activeIndex - 1));
  } else if (event.key === "Enter" && !bookTitleOptions.hidden) {
    const exactMatch = matchingTitles.find(function(title) {
      return title.toLowerCase() === bookSearch.value.trim().toLowerCase();
    });
    const title = activeIndex >= 0 ? matchingTitles[activeIndex] : exactMatch;
    if (title) {
      event.preventDefault();
      openBook(title);
    }
  } else if (event.key === "Escape" && !bookTitleOptions.hidden) {
    event.preventDefault();
    event.stopPropagation();
    closeOptions();
  } else if (event.key === "Tab") {
    closeOptions();
  }
});

toggleBooks.addEventListener("click", function() {
  if (bookTitleOptions.hidden) {
    showOptions();
  } else {
    closeOptions();
  }
  bookSearch.focus();
});

document.addEventListener("click", function(event) {
  if (!event.target.closest(".book-picker")) closeOptions();
});

function closeImage() {
  if (imageOverlay.hidden) return;
  imageOverlay.hidden = true;
  overlayImage.removeAttribute("src");
  libraryCat.className = "library-cat";
  libraryCat.hidden = false;
  libraryCat.style.left = "82%";
  libraryCat.style.top = "80%";
  librarySearch.hidden = false;
  bookSearch.focus();
}

closeImageOverlay.addEventListener("click", closeImage);
imageOverlay.addEventListener("click", function(event) {
  if (event.target === imageOverlay) closeImage();
});
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") closeImage();
});

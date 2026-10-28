
/* ==========================================
   PRACTICAL MAGIC — KYLIE'S DESK
   ========================================== */

// Replace with your published Code.org App Lab URL
const PHONE_APP_URL = "https://studio.code.org/projects/applab/cd1989c6-6893-4472-952f-232c411c578c";

// ==========================================
// ELEMENTS
// ==========================================

const imageOverlay = document.getElementById("imageOverlay");
const overlayImage = document.getElementById("overlayImage");
const closeImageOverlay = document.getElementById("closeImageOverlay");

const panelOverlay = document.getElementById("panelOverlay");
const panelContent = document.getElementById("panelContent");
const closePanelOverlay = document.getElementById("closePanelOverlay");

// ==========================================
// IMAGE POPUPS
// ==========================================

function openImageOverlay(src, alt = "Clue") {
  overlayImage.src = src;
  overlayImage.alt = alt;

  imageOverlay.hidden = false;
}

function closeImage() {
  imageOverlay.hidden = true;
  overlayImage.removeAttribute("src");
}

closeImageOverlay.addEventListener("click", closeImage);

// Clicking outside the image closes it
imageOverlay.addEventListener("click", function(event) {
  if (event.target === imageOverlay) {
    closeImage();
  }
});

// ==========================================
// INTERACTIVE PANELS
// ==========================================

function openPanelOverlay(html) {
  panelContent.innerHTML = html;
  panelOverlay.hidden = false;
}


function closePanel() {
  panelOverlay.hidden = true;

  // Keep the phone loaded so progress isn't lost
  if (document.getElementById("kyliePhone")) {
    return;
  }

  // Clear other interactive panels normally
  panelContent.innerHTML = "";
}


closePanelOverlay.addEventListener("click", closePanel);

panelOverlay.addEventListener("click", function(event) {
  if (event.target === panelOverlay) {
    closePanel();
  }
});

// Escape closes whichever popup is open
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeImage();
    closePanel();
    closePhone();
  }
});

// ==========================================
// DESK HOTSPOTS
// ==========================================

document.querySelectorAll(".hotspot").forEach(function(hotspot) {
  hotspot.addEventListener("click", function() {
    const view = hotspot.dataset.view;
    openDeskObject(view);
  });
});

function openDeskObject(view) {
  switch (view) {

    // PHONE
    case "phone":
      openPhone();
      break;

    // FAMILY TREE
    case "tree":
      openFamilyTree();
      break;

    // NOTE TO TONI
    case "note":
      openImageOverlay(
        "assets/lettertotoni.png",
        "Kylie's note to Toni"
      );
      break;

    // LETTERS
    case "letterToVictor":
      openImageOverlay(
        "assets/lettertoVictor.png",
        "Letter to Vincent"
      );
      break;

    case "letterToSally":
      openImageOverlay(
        "assets/lettertoSally.png",
        "Letter to Sally"
      );
      break;

    case "letterToGina":
      openImageOverlay(
        "assets/lettertoGina.png",
        "Letter to Gina"
      );
      break;

    // POLAROIDS
    case "polGina":
      openImageOverlay(
        "assets/polGina.png",
        "Gina's photograph"
      );
      break;

    case "polSally":
      openImageOverlay(
        "assets/polSally.png",
        "Sally's photograph"
      );
      break;

    case "polKylie":
      openImageOverlay(
        "assets/polKylie.png",
        "Kylie's photograph"
      );
      break;

    // JOURNAL
    case "journal":
      openImageOverlay(
        "assets/journal.png",
        "Journal"
      );
      break;

    // BOOK OF RAVEN
    case "spellbook":
      openImageOverlay(
        "assets/bookofraven.png",
        "Book of Raven"
      );
      break;

    default:
      console.warn("Unknown desk object:", view);
  }
}

// ==========================================
// PHONE
// ==========================================



const phoneOverlay = document.getElementById("phoneOverlay");
const closePhoneButton = document.getElementById("closePhone");

// Open the existing phone without reloading
function openPhone() {
  phoneOverlay.hidden = false;
}

// Hide the phone without destroying its state
function closePhone() {
  phoneOverlay.hidden = true;
}

// Close button
closePhoneButton.addEventListener("click", closePhone);

// Click outside the phone
phoneOverlay.addEventListener("click", function(event) {
  if (event.target === phoneOverlay) {
    closePhone();
  }
});



// ==========================================
// FAMILY TREE
// ==========================================

// Replace these filenames with the actual
// portrait assets from your folder.

const familyMembers = [
  { id: "maria", name: "Maria Owens", image: "assets/maria.png" },
  { id: "vincent", name: "Vincent Owens", image: "assets/victor.png" },
  { id: "lillian", name: "Lillian Owens", image: "assets/lily.png" },
  { id: "frances", name: "Frances Owens", image: "assets/franny.png" },
  { id: "jet", name: "Jet Owens", image: "assets/jet.png" },
  { id: "regina", name: "Regina Owens", image: "assets/regina.png" },
  { id: "daniel", name: "Daniel Owens", image: "assets/daniel.png" },
  { id: "gina", name: "Gina Owens", image: "assets/gina.png" },
  { id: "kylie", name: "Kylie Owens", image: "assets/kylie.png" },
];


function openFamilyTree() {

  const portraits = familyMembers.map(function(member) {
    return `
      <div
        class="portrait-card"
        draggable="true"
        data-member="${member.id}"
      >
        <img src="${member.image}" alt="${member.name}">
      </div>
    `;
  }).join("");

  openPanelOverlay(`
    <div class="family-tree-panel">

      <div class="family-tree-layout">

        <div class="tree-board" id="treeBoard">

          <img
            class="tree-background"
            src="assets/familyTree.png"
            alt="Owens Family Tree"
            draggable="false"
          >

          <div class="tree-slot" data-slot="1"
               style="left:20%; top:16.5%;"></div>

          <div class="tree-slot" data-slot="2"
               style="left:47.5%; top:16.5%;"></div>

          <div class="tree-slot" data-slot="3"
               style="left:74.5%; top:16.5%;"></div>

          <div class="tree-slot" data-slot="4"
               style="left:14%; top:39.5%;"></div>

          <div class="tree-slot" data-slot="5"
               style="left:52.5%; top:35%;"></div>

          <div class="tree-slot" data-slot="6"
               style="left:73.5%; top:35%;"></div>

          <div class="tree-slot" data-slot="7"
               style="left:35%; top:39.5%;"></div>

          <div class="tree-slot" data-slot="8"
               style="left:72.5%; top:59.5%;"></div>

          <div class="tree-slot" data-slot="9"
               style="left:86%; top:59.5%;"></div>

        </div>

        <div class="portrait-bank" id="portraitBank">
          ${portraits}
        </div>

      </div>
    </div>
  `);

  initializeFamilyTree();
}

// ==========================================
// FAMILY TREE DRAGGING
// ==========================================


function initializeFamilyTree() {

  const slots = document.querySelectorAll(".tree-slot");
  const bank = document.getElementById("portraitBank");

  // Start dragging a portrait
  document.querySelectorAll(".portrait-card").forEach(function(card) {

    card.addEventListener("dragstart", function(event) {
      event.dataTransfer.setData(
        "text/plain",
        card.dataset.member
      );
    });

  });

  // Allow dropping on slots
  slots.forEach(function(slot) {

    slot.addEventListener("dragover", function(event) {
      event.preventDefault();
      slot.classList.add("drag-over");
    });

    slot.addEventListener("dragleave", function() {
      slot.classList.remove("drag-over");
    });

    slot.addEventListener("drop", function(event) {
      event.preventDefault();
      slot.classList.remove("drag-over");

      const memberId =
        event.dataTransfer.getData("text/plain");

      const draggedCard = document.querySelector(
        '.portrait-card[data-member="' + memberId + '"]'
      );

      if (!draggedCard) return;

      // Existing card in target slot
      const existingCard =
        slot.querySelector(".portrait-card");

      // Where dragged card came from
      const previousParent = draggedCard.parentElement;

      if (existingCard && existingCard !== draggedCard) {

        // Swap cards if both came from slots
        if (previousParent.classList.contains("tree-slot")) {
          previousParent.appendChild(existingCard);
        } else {
          // Otherwise return existing card to bank
          bank.appendChild(existingCard);
        }
      }

      slot.appendChild(draggedCard);
    });
  });

  // Allow returning cards to sidebar
  bank.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  bank.addEventListener("drop", function(event) {
    event.preventDefault();

    const memberId =
      event.dataTransfer.getData("text/plain");

    const card = document.querySelector(
      '.portrait-card[data-member="' + memberId + '"]'
    );

    if (card) {
      bank.appendChild(card);
    }
  });
}


// ==========================================
// KYLIE'S JOURNAL
// ==========================================

function openJournal() {
  openPanelOverlay(`
    <div class="journal-panel">
      <h2>Kylie's Journal</h2>

      <h3>October 24</h3>
      <p>
        I keep coming back to the Owens family tree.
        Something about it doesn't make sense.
      </p>

      <p>
        Frances had two daughters, but their names
        seem to have disappeared from every record.
      </p>

      <h3>October 25</h3>
      <p>
        I found Gina's number. I think she might
        know more than she's telling me.
      </p>

      <p>
        If the answer really is in Thornfield,
        I need to go there myself.
      </p>
    </div>
  `);
}

// ==========================================
// BOOK OF RAVEN
// ==========================================

function openSpellBook() {
  openPanelOverlay(`
    <div class="spellbook-panel">
      <h2>The Book of Raven</h2>

      <p>
        An ancient book containing generations
        of spells from the Owens family.
      </p>

      <h3>The Curse of Maria Owens</h3>

      <p>
        In sorrow, a spell was cast.
        From heartbreak, a curse was born.
      </p>

      <p>
        But the original spell has been altered.
        Several pages appear to be missing.
      </p>

      <p><em>
        Something has been written in the margin:
        "To undo the curse, first discover
        what was forgotten."
      </em></p>
    </div>
  `);
}

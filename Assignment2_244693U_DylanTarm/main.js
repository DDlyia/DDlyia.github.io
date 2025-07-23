// ========== QUIZ PAGE ==========
if (window.location.pathname.includes("quiz.html")) {
   // List of Yōkai with name and descriptions (used as quiz questions and answers)
  const yokaiList = [
  {
    name: "Kitsune",
    desc: "A trickster spirit often revered as a divine messenger, capable of creating illusions and possessing humans."
  },
  {
    name: "Jorogumo",
    desc: "A deceptive entity that dwells near waterfalls, taking the form of a woman to lure unsuspecting travelers into her web."
  },
  {
    name: "Kirin",
    desc: "A mythical creature believed to appear during the reign of a just ruler, often associated with serenity and divine judgment."
  },
  {
    name: "Bake Kujira",
    desc: "Said to haunt coastal waters as a skeletal leviathan, this ghostly being is linked to curses, famine, and misfortune."
  },
  {
    name: "Hone Onna",
    desc: "A woman who appears youthful and beautiful but is truly a walking corpse feeding off the life force of her lover."
  },
  {
    name: "Hitodama",
    desc: "Glowing orbs that drift silently through graveyards, believed to be the souls of the recently departed."
  },
  {
    name: "Shuten Dōji",
    desc: "Feared for leading a band of demons, this drunken ogre ruled Mt. Ōe until vanquished by a disguised warrior band."
  },
  {
    name: "Sutoku Tennō",
    desc: "An emperor whose death led to his transformation into a malevolent spirit, blamed for political unrest and disasters."
  },
  {
    name: "Tatarigami",
    desc: "A destructive force of divine origin, known for bringing disease and calamity when disrespected or neglected."
  },
  {
    name: "Shogoro",
    desc: "A mischievous elder-like spirit who enjoys baffling villagers with riddles and pranks, yet causes no real harm."
  },
  {
    name: "Karakasa Kozō",
    desc: "A Tsukumogami known for startling people with sudden appearances, often depicted with a single eye and hopping on one foot."
  },
  {
    name: "Oi no Bakemono",
    desc: "A cryptic figure who appears as an old traveler, dispensing wisdom or confusion depending on their whims."
  }
];

// Get references to quiz-related DOM elements
  const quizContainer = document.getElementById("quiz-container");
  const btnSubmit = document.getElementById("btnSubmit");
  const scorebox = document.getElementById("scorebox");
  const difficultySelect = document.getElementById("difficulty");

  let currentQuestions = []; // Will store randomly selected questions for current quiz
  let score = 0;

  // Generate new quiz questions based on selected difficulty
  function generateQuiz() {
    score = 0;
    quizContainer.innerHTML = "";// Clear previous questions
    let diff = difficultySelect.value;

    // Set number of questions based on difficulty
    let numQuestions = diff === "easy" ? 3 : diff === "medium" ? 6 : 9;

    // Randomly shuffle and select questions
    let shuffled = yokaiList.slice().sort(() => Math.random() - 0.5);
    currentQuestions = shuffled.slice(0, numQuestions);

     // Create quiz UI elements
    currentQuestions.forEach((yokai, index) => {
      const choices = [yokai.name]; // Correct answer
      // Select 3 wrong answers
      let distractors = yokaiList
        .filter(y => y.name !== yokai.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(y => y.name);
      const options = choices.concat(distractors).sort(() => Math.random() - 0.5);

      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = `Q${index + 1}: ${yokai.desc}`;
      fieldset.appendChild(legend);

      // Create radio buttons for each option
      options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q${index}`;
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        fieldset.appendChild(label);
        fieldset.appendChild(document.createElement("br"));
      });

      quizContainer.appendChild(fieldset);
    });

    scorebox.textContent = "Not submitted";
  }

  // Check submitted answers and show score
  function checkAnswers() {
    score = 0;
    currentQuestions.forEach((yokai, index) => {
      const selected = document.querySelector(`input[name='q${index}']:checked`);
      if (selected && selected.value === yokai.name) score++;
    });

    scorebox.textContent = `Score: ${score} / ${currentQuestions.length}`;
  }

  // Event listeners for difficulty and submission
  btnSubmit.addEventListener("click", checkAnswers);
  difficultySelect.addEventListener("change", generateQuiz);

  generateQuiz(); // Auto-generate quiz on page load
}

// ========== GAME PAGE ========== //
if (window.location.pathname.includes("game.html")) {
   // Game state variables
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let level = 1;
  let totalMatches = 0;
  let foundMatches = 0;

  // Audio feedback for actions
  const flipSound = new Audio("audio/flip.wav");
  const matchSound = new Audio("audio/match.wav");
  const winSound = new Audio("audio/win.wav");
  const resetSound = new Audio("audio/reset.mp3");

   // Function to create each card div
function createCard(name, imageSrc, description) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.dataset.name = name;
  cardDiv.dataset.image = imageSrc;
  cardDiv.dataset.description = description;

  cardDiv.innerHTML = `
    <div class="front"></div>
    <div class="back"><img src="${imageSrc}" alt="${name}"></div>
  `;

  cardDiv.onclick = () => flipCard(cardDiv);
  return cardDiv;
}

// Start the game
function startGame() {
  const gameBoard = document.getElementById("game-board");
  const infoBox = document.getElementById("yokai-info");
  infoBox.classList.add("hidden");
  infoBox.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  foundMatches = 0;

  // List of yokai for matching game
  const yokaiPool = [
    ["Kitsune", "images/kitsune.jpg", "A mystical fox with shapeshifting abilities."],
    ["Jorogumo", "images/Jorōgumo.jpg", "Spider-woman who lures victims."],
    ["Kirin", "images/kirin.jpg", "A peaceful and divine beast."],
    ["Bake Kujira", "images/bakekujira.jpg", "A ghostly whale with a cursed legend."],
    ["Hone Onna", "images/Hone onna.jpg", "A beautiful woman revealed to be skeletal."],
    ["Hitodama", "images/hitodama.jpg", "Floating soul flames."],
    ["Shuten Dōji", "images/Shuten dōji.jpg", "Demon leader with fearsome strength."],
    ["Sutoku Tennō", "images/Sutoku Tennō.jpg", "Emperor turned vengeful spirit."],
    ["Tatarigami", "images/tatarigami.jpg", "God of curses and disasters."],
    ["Shogoro", "images/Shōgorō.jpg", "Playful old spirit who tricks villagers."],
    ["Karakasa Kozō", "images/Karakasa kozō.jpg", "Umbrella spirit who hops on one leg."],
    ["Oi no Bakemono", "images/Oi no bakemono.jpg", "Aged yokai full of wisdom and mystery."]
  ];

  // Choose number of pairs based on level
  const numPairs = level === 1 ? 4 : level === 2 ? 8 : 12;
  totalMatches = numPairs;

  const selectedYokai = yokaiPool.slice(0, numPairs);
  const cardElements = [];

  // Create pairs of cards
  for (let i = 0; i < numPairs; i++) {
    const [name, img, desc] = selectedYokai[i];
    cardElements.push(createCard(name, img, desc));
    cardElements.push(createCard(name, img, desc));
  }

   // Fisher-Yates Shuffle Algorithm
  // Purpose: Randomly shuffle the array (fairly and efficiently)
  for (let i = cardElements.length - 1; i > 0; i--) {
  // i starts at the last index of the array and moves backward

  // Pick a random index j between 0 and i (inclusive)
  const j = Math.floor(Math.random() * (i + 1));

  // Swap the elements at positions i and j
  // This swaps the current element with a random one earlier (or itself)
  [cardElements[i], cardElements[j]] = [cardElements[j], cardElements[i]];
}

// After this loop, cardElements is shuffled randomly

  // Display shuffled cards
  gameBoard.innerHTML = "";
  cardElements.forEach(card => gameBoard.appendChild(card));
}

// Handle flipping cards and checking for match
function flipCard(cardDiv) {
  if (lockBoard || cardDiv.classList.contains("flipped")) return;

  flipSound.currentTime = 0;
  flipSound.play();
  cardDiv.classList.add("flipped");

  if (!firstCard) {
    firstCard = cardDiv;
    return;
  }

  secondCard = cardDiv;
  lockBoard = true;

  const name1 = firstCard.dataset.name;
  const name2 = secondCard.dataset.name;

  if (name1 === name2) {
    matchSound.currentTime = 0;
    matchSound.play();
    showYokaiInfo(name1, firstCard.dataset.image, firstCard.dataset.description);
    foundMatches++;

    // If all pairs matched, move to next level or win
    if (foundMatches === totalMatches) {
      setTimeout(() => {
        if (level < 3) {
          winSound.currentTime = 0;
          winSound.play();
          level++;
          alert(`Great! Moving to Level ${level}`);
        } else {
          alert("You've completed all levels!");
        }
        startGame();
      }, 1000);
    }

    firstCard = secondCard = null;
    lockBoard = false;
  } else {
    // If not matched, flip back after delay
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// Display yokai info when a pair is matched
function showYokaiInfo(name, image, description) {
  const infoBox = document.getElementById("yokai-info");
  infoBox.classList.remove("hidden");
  infoBox.innerHTML = `
    <h2>${name}</h2>
    <img src="${image}" alt="${name}" style="width: 100px;">
    <p>${description}</p>
  `;
}

// Restart the game from level 1
function resetGame() {
  level = 1;
  resetSound.currentTime = 0;
  resetSound.play();
  startGame();
}

window.onload = startGame;// Auto start game when page loads
}

// ========== INDEX PAGE ========== //
if (window.location.pathname.includes("index.html")) {
  // Reference all page buttons and sub-pages
  const page1btn = document.querySelector("#page1btn");
  const page2btn = document.querySelector("#page2btn");
  const page3btn = document.querySelector("#page3btn");
  const page4btn = document.querySelector("#page4btn");
  const closeBtn = document.querySelector("#closeBtn");
  const allpages = document.querySelectorAll(".page");

  // Hide all pages
  function hideall() {
    for (let onepage of allpages) {
      onepage.style.display = "none";
    }
  }

  // Show selected page
  function show(pgno) {
    hideall();
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";
  }

  // Event listeners for navigation buttons
  page1btn.addEventListener("click", () => show(1));
  page2btn.addEventListener("click", () => show(2));
  page3btn.addEventListener("click", () => show(3));
  page4btn.addEventListener("click", () => show(4));
  closeBtn.addEventListener("click", hideall);

  hideall(); // Hide everything on load

  // Toggle visibility of yokai info sections
  document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.getAttribute('data-target');
      const target = document.querySelector(targetSelector);

      if (target) {
        const isHidden = target.classList.toggle('hidden');
        button.textContent = isHidden
          ? `Show ${targetSelector.replace('.', '').replace('-info', '').replace(/^\w/, c => c.toUpperCase())} Details`
          : `Hide ${targetSelector.replace('.', '').replace('-info', '').replace(/^\w/, c => c.toUpperCase())} Details`;
      }
    });
  });
}

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");

hamBtn.addEventListener("click", toggleMenus);

function toggleMenus() {
  // Toggle visibility class
  menuItemsList.classList.toggle("menuShow");

  // Update button text
  if (menuItemsList.classList.contains("menuShow")) {
    hamBtn.innerHTML = "Close Menu";
  } else {
    hamBtn.innerHTML = "Open Menu";
  }
}
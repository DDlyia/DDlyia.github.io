let firstCard = null;
let secondCard = null;
let lockBoard = false;

function startGame() {
  const gameBoard = document.getElementById("game-board");
  const infoBox = document.getElementById("yokai-info");
  infoBox.classList.add("hidden");
  infoBox.innerHTML = "";

  // Create cards manually (4 pairs = 8 cards total)
  const cards = [
    createCard("Kitsune", "images/kitsune.jpg", "A mystical fox with shapeshifting abilities."),
    createCard("Kitsune", "images/kitsune.jpg", "A mystical fox with shapeshifting abilities."),
    createCard("Tanuki", "images/tanuki.jpg", "A playful spirit known for trickery and fun."),
    createCard("Tanuki", "images/tanuki.jpg", "A playful spirit known for trickery and fun."),
    createCard("Oni", "images/oni.jpg", "A fierce ogre that punishes the wicked."),
    createCard("Oni", "images/oni.jpg", "A fierce ogre that punishes the wicked."),
    createCard("Noppera-bō", "images/nopperabo.jpg", "A ghost with no face, it startles people by revealing its blank expression."),
    createCard("Noppera-bō", "images/nopperabo.jpg", "A ghost with no face, it startles people by revealing its blank expression.")
  ];

  // Shuffle cards using Fisher-Yates
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Add shuffled cards to the board
  gameBoard.innerHTML = "";
  cards.forEach(card => gameBoard.appendChild(card));
}

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

function flipCard(cardDiv) {
  if (lockBoard || cardDiv.classList.contains("flipped")) return;

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
    showYokaiInfo(firstCard.dataset.name, firstCard.dataset.image, firstCard.dataset.description);
    firstCard = secondCard = null;
    lockBoard = false;
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function showYokaiInfo(name, image, description) {
  const infoBox = document.getElementById("yokai-info");
  infoBox.classList.remove("hidden");
  infoBox.innerHTML = `
    <h2>${name}</h2>
    <img src="${image}" alt="${name}" style="width: 100px;">
    <p>${description}</p>
  `;
}


//quiz.html
if (document.querySelector("#btnSubmit")) {
  // Quiz page code here (e.g., your CheckAns function)
  const btnSubmit = document.querySelector("#btnSubmit");
  const scorebox = document.querySelector("#scorebox");

  btnSubmit.addEventListener("click", function() {
    let score = 0;

    const correctAnswers = {
      q1: "Kitsune",
      q2: "Tanuki",
      q3: "Noppera-bō"
    };

    for (let i = 1; i <= 3; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === correctAnswers[`q${i}`]) {
        score++;
      }
    }

    scorebox.textContent = `Score: ${score} / 3`;
    btnSubmit.disabled = true;
  });
}


//wiki.html
//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const closeBtn = document.querySelector("#closeBtn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
closeBtn.addEventListener("click", function () {
  hideall(); 
});
hideall();

/*Kitsune*/
const kitsuneToggleBtn = document.querySelector("#kitsuneToggleBtn");
const kitsuneInfo = document.querySelector(".kitsune-info");

kitsuneToggleBtn.addEventListener("click", function () {
  if (kitsuneInfo.style.display === "none") {
    kitsuneInfo.style.display = "block";
    kitsuneToggleBtn.innerText = "Hide Details";
  } else {
    kitsuneInfo.style.display = "none";
    kitsuneToggleBtn.innerText = "Kitsune Details";
  }
});

/*Jorōgumo*/
const jorogumoToggleBtn = document.querySelector("#jorogumoToggleBtn");
const jorogumoInfo = document.querySelector(".jorogumo-info");

jorogumoToggleBtn.addEventListener("click", function () {
  if (jorogumoInfo.style.display === "none") {
    jorogumoInfo.style.display = "block";
    jorogumoToggleBtn.innerText = "Hide Details";
  } else {
    jorogumoInfo.style.display = "none";
    jorogumoToggleBtn.innerText = "Jorōgumo Details";
  }
});

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);
function toggleMenus(){ /*open and close menu*/
//if menuItemsList dont have the class "menuShow", add it, else remove it
menuItemsList.classList.toggle("menuShow");
//if menu is showing (has the class “menuShow”)
if(menuItemsList.classList.contains("menuShow")){
hamBtn.innerHTML="Close Menu"; //change button text to chose menu
}else{ //if menu NOT showing
hamBtn.innerHTML="Open Menu"; //change button text open menu
}
}
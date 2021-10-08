//THE PERSONNAGE

const you = document.getElementById("you");

//HIDDEN ELEMENTS IN HOME FOLDER

const hidden = document.getElementsByClassName("hidden");
const hiddens = [...hidden];

//NEW FILE CREATED DURING THE GAME

const newFile = document.querySelector(".fileTxt");

//HIDDEN ELEMENTS IN TMP FOLDER

const hiddenTmp = document.getElementsByClassName("hiddenTmp");
const hiddensTmp = [...hiddenTmp];

//IMAGE AT DESTINATION OF THE PLAYER

const imgDialog = document.getElementById("imgDialog");

//PLAYERS FORMULAIRE

const formulaire = document.getElementById("formulaire");
const formQuestion = document.querySelector(".form-question");
const alarm = document.querySelector(".alarm");
const formBlock = document.querySelector(".form");

let firstAnswerHTML = document.getElementById("firstAnswerHTML");
let secondAnswerHTML = document.getElementById("secondAnswerHTML");
let thirdAnswerHTML = document.getElementById("thirdAnswerHTML");

//LIFE COUNTER

let lives = 3;
document.getElementById("counter-life").innerHTML = `${lives}`;

//START BUTTON

const start = document.getElementById("start");

//STOP BUTTON

const stopIt = document.getElementById("close");

//NEXT BUTTON

const nextButton = document.getElementById("next");

//RETRY BUTTON

const retryButton = document.getElementById("retry");

//RESTART BUTTON

const restartButton = document.getElementById("restart");

//////////////////////////////////////////////////////////////////////////////////////

const minus = () => {
  lives -= 1;
  document.getElementById("counter-life").innerHTML = `${lives}`;
};

//MOVE FUNCTION

const move = (x, y) => {
  you.style.gridColumn = x;
  you.style.gridRow = y;
};

//REFRESH

const refresh = () => {
  for (let i = 0; i < hiddens.length; i++) {
    hiddens[i].classList.remove("show");
  }
  for (let i = 0; i < hiddensTmp.length; i++) {
    hiddensTmp[i].classList.remove("show");
  }
  newFile.classList.remove("show");
  move(4, 7);
  lives = 3;
  document.getElementById("counter-life").innerHTML = `${lives}`;
  formBlock.classList.remove("showForm");
  retryButton.style.display = "none";
  formulaire.reset();
};

//YOU WIN

const youWin = () => {
  formulaire.reset();
  imgDialog.src = "assets/trophy.svg";
  imgDialog.style.opacity = 1;
  nextButton.style.display = "none";
  formQuestion.innerHTML = "";
  alarm.innerHTML =
    "Félicitation, tu as bien bossé tes commandes linux !<br>Si tu souhaites contribuer à ce projet, rdv sur <a href='https://github.com/innermost47/terminux' target ='_blank' class='whiteLink'>github</a> !";
  formBlock.classList.add("showForm");
};

//REFRESH VALUE

const refreshValue = () => {
  firstAnswer.value = "";
  secondAnswer.value = "";
  thirdAnswer.value = "";
};

//////////////////////////////////////////////////////////////////////////////////////

//LEVEL EDITOR

const levelEditor = (
  levelNumber,
  question,
  answers,
  possibleAnswers,
  congrat,
  x,
  y,
  classToAdd,
  classesArray,
  classToRemove,
  showMeTheOneYouWantInAnArray,
  theOne,
  showOneItem,
  oneItemClass,
  hideOneItem
) => {
  alarm.innerHTML = "";
  imgDialog.src = "";
  imgDialog.style.opacity = 0;
  formulaire.style.visibility = "visible";
  nextButton.style.display = "none";
  formBlock.classList.add("showForm");
  formQuestion.innerHTML = question;
  firstAnswerHTML.innerHTML = possibleAnswers[0];
  secondAnswerHTML.innerHTML = possibleAnswers[1];
  thirdAnswerHTML.innerHTML = possibleAnswers[2];
  const handleSubmit = (e) => {
    e.preventDefault();
    let firstAnswer = document.getElementById("firstAnswer");
    let secondAnswer = document.getElementById("secondAnswer");
    let thirdAnswer = document.getElementById("thirdAnswer");
    firstAnswer.value = possibleAnswers[0];
    secondAnswer.value = possibleAnswers[1];
    thirdAnswer.value = possibleAnswers[2];
    const tryThis = (answer) => {
      if (answers.includes(answer)) {
        formulaire.style.visibility = "hidden";
        formQuestion.innerHTML = congrat;
        if (x && y) {
          move(x, y);
        }
        if (classToAdd) {
          for (let i = 0; i < classesArray.length; i++) {
            classesArray[i].classList.add(classToAdd);
          }
        }
        if (classToRemove) {
          for (let i = 0; i < classesArray.length; i++) {
            classesArray[i].classList.remove(classToRemove);
          }
        }
        if (showMeTheOneYouWantInAnArray) {
          for (let i = 0; i < showMeTheOneYouWantInAnArray.length; i++) {
            showMeTheOneYouWantInAnArray[theOne].classList.add("show");
          }
        }
        if (showOneItem) {
          showOneItem.classList.add(oneItemClass);
        }
        if (hideOneItem) {
          hideOneItem.classList.remove(oneItemClass);
        }
        imgDialog.style.opacity = 1;
        imgDialog.src = "assets/like.svg";
        nextButton.style.display = "block";
      } else {
        if (lives !== 0) {
          minus();
          imgDialog.src = "assets/sad.svg";
          imgDialog.style.opacity = 1;
          alarm.innerHTML = "Mauvaise réponse, essaie encore";
          formQuestion.innerHTML = "";
          formulaire.style.visibility = "hidden";
          formulaire.removeEventListener("submit", handleSubmit);
          retryButton.style.display = "block";
          nextButton.style.opacity = "1";
          const handleRetry = () => {
            retryButton.removeEventListener("click", handleRetry);
            alarm.innerHTML = "";
            retryButton.style.display = "none";
            refreshValue();
            imgDialog.src = "";
            levels[levelNumber]();
          };
          retryButton.addEventListener("click", handleRetry);
        } else {
          alarm.innerHTML = "Game over";
          imgDialog.src = "assets/verysad.svg";
          imgDialog.style.opacity = 1;
          formQuestion.innerHTML = "";
          formulaire.style.visibility = "hidden";
          formulaire.removeEventListener("submit", handleSubmit);
          restartButton.style.display = "block";
          const handleRestart = () => {
            retryButton.removeEventListener("click", handleRestart);
            alarm.innerHTML = "";
            restartButton.style.display = "none";
            refresh();
            levels[0]();
          };
          restartButton.addEventListener("click", handleRestart);
        }
      }
    };
    if (firstAnswer.checked) {
      tryThis(firstAnswer.value);
    } else if (secondAnswer.checked) {
      tryThis(secondAnswer.value);
    } else if (thirdAnswer.checked) {
      tryThis(thirdAnswer.value);
    }
  };
  formulaire.addEventListener("submit", handleSubmit);
  const handleClick = () => {
    formBlock.classList.remove("showForm");
    formulaire.removeEventListener("submit", handleSubmit);
    formulaire.reset();
    nextButton.removeEventListener("click", handleClick);
    setTimeout(() => {
      levels[levelNumber + 1]();
    }, 1000);
  };
  nextButton.addEventListener("click", handleClick);
  const handleStop = () => {
    refresh();
    nextButton.removeEventListener("click", handleClick);
    formulaire.removeEventListener("submit", handleSubmit);
    nextButton.style.display = "none";
    stopIt.removeEventListener("click", handleStop);
  };
  stopIt.addEventListener("click", handleStop);
};

//////////////////////////////////////////////////////////////////////////////////////

//LEVEL 1

const firstLevel = () => {
  return levelEditor(
    0,
    "Quelle est la commande pour te déplacer vers le dossier home ?",
    ["cd home"],
    ["cd home", "td home", "ls home"],
    "Effectivement la commande cd (change directory) te sert à rejoindre le dossier dont tu as spécifié la destination.",
    1,
    6
  );
};

//LEVEL 2

const secondLevel = () => {
  return levelEditor(
    1,
    "Quelle est la commande pour lister ce que contient ton dossier ?",
    ["ls"],
    ["la", "lt", "ls"],
    "Effectivement la commande ls (list) te sert à afficher le contenu du dossier dans lequel tu te trouves.",
    null,
    null,
    "show",
    hiddens
  );
};

//LEVEL 3

const thirdLevel = () => {
  return levelEditor(
    2,
    "Quelle est la commande pour te déplacer vers le dossier tmp ?",
    ["cd tmp"],
    ["cp tmp", "cd tmp", "cl tmp"],
    "Effectivement la commande cd (change directory) te sert à rejoindre le dossier dont tu as spécifié la destination.",
    4,
    6,
    null,
    hiddens,
    "show"
  );
};

//LEVEL 4

const fourthLevel = () => {
  return levelEditor(
    3,
    "Quelle est la commande pour créer un dossier répondant au nom de wildGameJs ?",
    ["mkdir wildGameJs"],
    ["makdir wildGameJs", "mkdir wildGameJs", "makedir wildGameJs"],
    "Effectivement la commande mkdir (make directory) te sert à créer un nouveau répertoire (ou dossier) du nom de ton choix."
  );
};

//LEVEL 5

const fifthLevel = () => {
  return levelEditor(
    4,
    "Quelle est la commande pour voir ton nouveau dossier ?",
    ["ls"],
    ["lt", "lp", "ls"],
    "Effectivement la commande ls (list) te sert à afficher le contenu du dossier dans lequel tu te trouves.",
    null,
    null,
    "show",
    hiddensTmp
  );
};

//LEVEL 6

const sixthLevel = () => {
  return levelEditor(
    5,
    "Crée un fichier (nomme le file.txt) depuis ton emplacemement dans le dossier wildGameJs ?",
    ["touch wildGameJs/file.txt"],
    [
      "touch wildGameJs/file.txt",
      "new wildGameJs/file.txt",
      "create wildGameJs/file.txt",
    ],
    "Effectivement la commande touch te sert à créer un nouveau fichier. De plus tu as pu remarquer que tu peux créer un fichier dans n'importe quel répertoire depuis n'importe quel autre, du moment que tu le spécifies dans ta commande.",
    null,
    null,
    null,
    hiddensTmp,
    "show"
  );
};

//LEVEL 7

const seventhLevel = () => {
  return levelEditor(
    6,
    "Maintenant, rends toi dans ton dossier wildGameJs",
    ["cd wildGameJs"],
    ["cp wildGameJs", "cd wildGameJs", "ct wildGameJs"],
    "Effectivement la commande cd (change directory) te sert à rejoindre le dossier dont tu as spécifié la destination.",
    4,
    4,
    null,
    null,
    null,
    hiddensTmp,
    1
  );
};

//LEVEL 8

const eigthLevel = () => {
  return levelEditor(
    7,
    "Maintenant, vérifie que ton nouveau fichier y est bien présent",
    ["ls"],
    ["ls", "lt", "lp"],
    "Effectivement la commande ls (list) te sert à afficher le contenu du dossier dans lequel tu te trouves.",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    newFile,
    "show"
  );
};

//LEVEL 9

const ninethLevel = () => {
  return levelEditor(
    8,
    "Maintenant, déplace le fichier file.txt (en mode superutilisateur) dans ton répertoire home",
    ["sudo mv file.txt /home"],
    [
      "sudo mv file.txt /home",
      "admin mv file.txt /home",
      "sudo move file.txt /home",
    ],
    "Effectivement la commande mv (move) te sert à déplacer (ou renommer) un fichier ou un répertoire à l'emplacement souhaité. La commande sudo (superutilisateur do) te permet d'obtenir les privilèges pour effectuer des tâches 'à risques' dans ton système d'exploitation.",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "show",
    newFile
  );
};

//LEVEL 10

const tenthLevel = () => {
  return levelEditor(
    9,
    "Maintenant, retourne dans ton dossier tmp",
    ["cd .."],
    ["cd /", "cd ..", "cd parent"],
    "Effectivement la commande cd .. te sert à rejoindre le dossier parent du quel tu es.",
    4,
    6,
    null,
    hiddensTmp,
    "show"
  );
};

//////////////////////////////////////////////////////////////////////////////////////

//LEVELS ARRAY

const levels = [
  firstLevel,
  secondLevel,
  thirdLevel,
  fourthLevel,
  fifthLevel,
  sixthLevel,
  seventhLevel,
  eigthLevel,
  ninethLevel,
  tenthLevel,
  youWin,
];

//////////////////////////////////////////////////////////////////////////////////////

//GAME

const game = () => {
  levels[0]();
};

//START FUNCTION

start.addEventListener("click", () => {
  refresh();
  setTimeout(() => {
    game();
  }, 500);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js");
}


// Bron: eigen werk op basis van cursusmateriaal Inleiding Programmeren 23/24
// Toegevoegde functionaliteit voor audio bij winst/verlies
// Bron: MDN Web Docs - HTMLAudioElement (new Audio):
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio

const keuzes = ["steen", "papier", "schaar"];
const buttons = document.querySelectorAll("button[data-keuze]");
const spelerText = document.getElementById("spelerKeuze");
const computerText = document.getElementById("computerKeuze");
const uitslagText = document.getElementById("uitslag");
const scoreSpeler = document.getElementById("scoreSpeler");
const scoreComputer = document.getElementById("scoreComputer");
const resetBtn = document.getElementById("resetBtn");

const winGeluid = new Audio("sps.audio/win.mp3");
const verliesGeluid = new Audio("sps.audio/verlies.mp3");

let spelerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const spelerKeuze = button.dataset.keuze;
    const computerKeuze = keuzes[Math.floor(Math.random() * keuzes.length)];

    spelerText.textContent = "Jouw keuze: " + spelerKeuze;
    computerText.textContent = "Computer: " + computerKeuze;

    const uitslag = bepaalUitslag(spelerKeuze, computerKeuze);
    uitslagText.textContent = uitslag;

    if (uitslag === "gewonnen") {
      spelerScore++;
      winGeluid.play();
    } else if (uitslag === "verloren") {
      computerScore++;
      verliesGeluid.play();
    }

    scoreSpeler.textContent = spelerScore;
    scoreComputer.textContent = computerScore;
  });
});

resetBtn.addEventListener("click", () => {
  spelerScore = 0;
  computerScore = 0;
  scoreSpeler.textContent = spelerScore;
  scoreComputer.textContent = computerScore;
  spelerText.textContent = "Jouw keuze:";
  computerText.textContent = "Computer:";
  uitslagText.textContent = "";
});

function bepaalUitslag(speler, computer) {
  if (speler === computer) return "gelijkspel";
  if (
    (speler === "steen" && computer === "schaar") ||
    (speler === "papier" && computer === "steen") ||
    (speler === "schaar" && computer === "papier")
  ) {
    return "gewonnen";
  } else {
    return "verloren";
  }
}

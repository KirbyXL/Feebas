const { ipcRenderer } = require('electron');

const TILE_DURATION = 45 * 60 * 1000;
const REFERENCE_RESET = new Date("2026-01-01T00:30:00-04:00").getTime();

const countdownEl = document.getElementById("countdown");
const nextResetEl = document.getElementById("nextReset");
const bellToggle = document.getElementById("bellToggle");
const alertSound = document.getElementById("alertSound");
const soundTestBtn = document.getElementById("soundTest");

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

let notificationsEnabled = true;
let notified5 = false;
let notified1 = false;

// toggle notifications
bellToggle.addEventListener("click", () => {
  notificationsEnabled = !notificationsEnabled;
  bellToggle.classList.toggle("on", notificationsEnabled);
});

// testings
soundTestBtn.addEventListener("click", () => {
  alertSound.currentTime = 0;
  alertSound.play();
});


function updateTimer() {
  const now = Date.now();
  const timeSinceReference = now - REFERENCE_RESET;
  const timeIntoCycle = timeSinceReference % TILE_DURATION;
  const timeLeft = TILE_DURATION - timeIntoCycle;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  countdownEl.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const nextReset = new Date(now + timeLeft);
  nextResetEl.innerText = "Next reset at: " + nextReset.toLocaleTimeString();

  updateColors(timeLeft);
  checkNotifications(timeLeft);


  // sending time to main for tray tooltip
  ipcRenderer.send('update-tray-time', timeLeft);
}

function updateColors(timeLeft) {
  countdownEl.classList.remove("safe", "warning", "danger");

  if (timeLeft <= 60 * 1000) {
    countdownEl.classList.add("danger");
  } else if (timeLeft <= 5 * 60 * 1000) {
    countdownEl.classList.add("warning");
  } else {
    countdownEl.classList.add("safe");
  }
}

function sendAlert(message) {
  new Notification("Feebas Alert", { body: message });

  alertSound.currentTime = 0;
  alertSound.play();
}

function checkNotifications(timeLeft) {
  if (!notificationsEnabled) return;

  if (timeLeft <= 5 * 60 * 1000 && !notified5) {
    sendAlert("Tile resets in 5 minutes!");
    notified5 = true;
  }

  if (timeLeft <= 60 * 1000 && !notified1) {
    sendAlert("Tile resets in 1 minute!");
    notified1 = true;
  }

  if (timeLeft > 5 * 60 * 1000) {
    notified5 = false;
    notified1 = false;
  }
}

setInterval(updateTimer, 1000);
updateTimer();




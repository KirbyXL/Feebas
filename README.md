# Feebas Timer for PokeMMO

**Feebas Timer** is a desktop utility built with **Electron** that automatically tracks the global **Feebas tile reset cycle** in *PokéMMO* and alerts you when a reset is approaching. The timer uses real-world clock calculations so you never have to manually track tile resets while hunting.

---

## Description

In the game PokeMMO, the Feebas tiles reset on a **consistent global 45-minute cycle**. This tool syncs with that cycle, shows a live countdown, gives notifications and sound alerts, and runs quietly from the system tray. This makes shiny hunting far more convenient so you don't stick to a specific tile when it resets.

---

## Features

✔ Automatic global time sync  
✔ Visual live countdown (green/yellow/red states)  
✔ Desktop notifications with sound  
✔ Minimize to system tray  
✔ Tray tooltip shows remaining time  
✔ Windows installable `.exe`  

---

## Installation

### From Releases
Download the **latest Windows installer** and run it to install the app.

### From Source

Clone the repo:

```bash
git clone https://github.com/KirbyXL/Feebas.git
cd Feebas
```

Install the dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

---

## How It Works

The app calculates the tile reset time based on a known reference point and repeats every 45 minutes:

```
timeLeft = 45 minutes − (currentTime − referenceTime) % 45 minutes
```

The formula keeps the timer accurate even if the app or computer turned off.

---

## Built With

- **Electron** — Desktop application framework  
- **JavaScript** — Timer logic + IPC communication  
- **HTML/CSS** — User interface  
- **Node.js** — Runtime environment  
- **Electron Builder** — Packaging into a Windows executable  

---

## Usage

Once installed:

1. Launch **Feebas Timer**
2. The countdown auto-starts
3. If closed, you can hover over the system tray icon to see time left
4. Get alerts at 5 minutes and 1 minute before reset
5. Use the bell toggle to enable/disable notifications

---

## Screenshots

<img width="518" height="383" alt="image" src="https://github.com/user-attachments/assets/0024bb23-7b95-4246-8ba9-b3d65acd821c" />


---

## Project Structure

```
feebas-timer/
├── index.html
├── main.js
├── renderer.js
├── style.css
├── icon.png
├── alert.mp3
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```



## License

This project is open-source



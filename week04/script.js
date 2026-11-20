
document.addEventListener("DOMContentLoaded", function () {
  setupDailyTip();
  setupPiano();
  setupTimer();
  setupContactForm();
});


function setupDailyTip() {
  var tipText = document.getElementById("tip-text");
  var tipButton = document.getElementById("next-tip-btn");

 
  if (!tipText || !tipButton) {
    return;
  }

  var tips = [
    "Look for any group of two black keys to find C right away without counting up from the bottom.",
    "Let your arms hang loose at your sides, then lift them onto the keys keeping that natural finger curve.",
    "Practice a new piece one hand at a time before trying to put both hands together.",
    "When practicing the C major scale, keep your wrist relaxed as your thumb tucks under finger 3 onto F.",
    "Read sheet music by landmarks: find Middle C, Treble G, or Bass F, then follow steps up or down.",
    "Ten slow, focused minutes of daily practice beats one rushed hour on the weekend."
  ];

  
  var today = new Date();
  var currentIndex = today.getDate() % tips.length;
  tipText.textContent = tips[currentIndex];

 
  tipButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % tips.length;
    tipText.textContent = tips[currentIndex];
  });
}


var audioCtx = null;

function playSound(frequency) {
 
  if (!audioCtx) {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (!audioCtx) {
    return;
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  var now = audioCtx.currentTime;
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, now);

  
  gainNode.gain.setValueAtTime(0.25, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.6);
}

function setupPiano() {
  var readout = document.getElementById("note-readout");
  var keys = document.querySelectorAll(".piano-key");

  if (!readout || keys.length === 0) {
    return;
  }

 
  var noteFrequencies = {
    "C4": 261.63,
    "C#4": 277.18,
    "D4": 293.66,
    "D#4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "F#4": 369.99,
    "G4": 392.00,
    "G#4": 415.30,
    "A4": 440.00,
    "A#4": 466.16,
    "B4": 493.88,
    "C5": 523.25
  };

  for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function () {
      var noteName = this.getAttribute("data-note");
      var freq = noteFrequencies[noteName];

     
      readout.textContent = "Note played: " + noteName + " (" + freq + " Hz)";

      
      var clickedKey = this;
      clickedKey.classList.add("pressed");
      setTimeout(function () {
        clickedKey.classList.remove("pressed");
      }, 200);

      
      playSound(freq);
    });
  }
}


function setupTimer() {
  var display = document.getElementById("timer-display");
  var startBtn = document.getElementById("start-timer-btn");
  var pauseBtn = document.getElementById("pause-timer-btn");
  var resetBtn = document.getElementById("reset-timer-btn");
  var statusText = document.getElementById("timer-status");

  if (!display || !startBtn || !pauseBtn || !resetBtn) {
    return;
  }

  var totalSeconds = 0;
  var timerInterval = null;

  function updateTimerDisplay() {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    var minText = minutes < 10 ? "0" + minutes : "" + minutes;
    var secText = seconds < 10 ? "0" + seconds : "" + seconds;

    display.textContent = minText + ":" + secText;
  }

  startBtn.addEventListener("click", function () {
    if (timerInterval !== null) {
      return; 
    }
    statusText.textContent = "Timer running. Take your time and stay relaxed.";
    timerInterval = setInterval(function () {
      totalSeconds = totalSeconds + 1;
      updateTimerDisplay();
    }, 1000);
  });

  pauseBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    statusText.textContent = "Timer paused.";
  });

  resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    updateTimerDisplay();
    statusText.textContent = "Timer reset to 00:00.";
  });
}


function setupContactForm() {
  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");

  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    var nameInput = document.getElementById("visitor-name");
    var emailInput = document.getElementById("visitor-email");
    var messageInput = document.getElementById("visitor-message");

    var nameValue = nameInput.value.trim();
    var emailValue = emailInput.value.trim();
    var messageValue = messageInput.value.trim();

    
    nameInput.removeAttribute("aria-invalid");
    emailInput.removeAttribute("aria-invalid");
    messageInput.removeAttribute("aria-invalid");

    if (nameValue === "") {
      nameInput.setAttribute("aria-invalid", "true");
      feedback.className = "form-feedback error";
      feedback.textContent = "Please enter your name before submitting.";
      nameInput.focus();
      return;
    }

    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
      emailInput.setAttribute("aria-invalid", "true");
      feedback.className = "form-feedback error";
      feedback.textContent = "Please enter a valid email address (for example, name@example.com).";
      emailInput.focus();
      return;
    }

    if (messageValue.length < 10) {
      messageInput.setAttribute("aria-invalid", "true");
      feedback.className = "form-feedback error";
      feedback.textContent = "Please write a short message or song suggestion (at least 10 characters).";
      messageInput.focus();
      return;
    }

    
    feedback.className = "form-feedback success";
    feedback.textContent = "Thank you, " + nameValue + "! Your message has been received.";
    form.reset();
  });
}
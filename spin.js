const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const addOptionBtn = document.getElementById('addOptionBtn');
const newOptionInput = document.getElementById('newOption');

// Startliste med standardalternativ (tal 1 - 10)
let options = ['1','2','3','4','5','6','7','8','9','10'];

/**
 * For å setje at det første alternativet skal vere øverst ved start,
 * legg initial rotasjon til -90 grader (i radianer).
 *  - I canvas er 0 rad = klokka 3. -90° tilsvarer klokka 12.
 */
const initialAngle = -Math.PI / 2;
let currentRotation = initialAngle;
let spinning = false;

const canvasSize = 400;
const centerX = canvasSize / 2;
const centerY = canvasSize / 2;
const radius = canvasSize / 2;

/**
 * Funksjon for å teikne hjulet
 */
function drawWheel() {
  const numOptions = options.length;
  const arc = 2 * Math.PI / numOptions;
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  
  // Teikn kvar sektor
  for (let i = 0; i < numOptions; i++) {
    // Berekn vinkel for kvar sektor med den totale rotasjonen
    const angle = currentRotation + i * arc;
    
    // Varierte bakgrunnsfargar for kvar sektor
    ctx.fillStyle = i % 2 === 0 ? '#FFCDD2' : '#E1BEE7';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
    ctx.closePath();
    ctx.fill();
    
    // Skriv teksten midt i kvar sektor
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(options[i], radius - 10, 10);
    ctx.restore();
  }
}

/**
 * Funksjon for å spinne hjulet med animering
 */
function spinWheel() {
  if (spinning) return;
  spinning = true;
  
  const spinTimeTotal = 6000; // Spinn i 6 sekund
  const spinStartTime = performance.now();
  // Tilfeldig spin: minst 4 fulle omdreiningar
  const randomSpin = Math.random() * 360 + 360 * 4;
  const randomSpinRad = randomSpin * Math.PI / 180; // konverter til radianer
  
  function animate(currentTime) {
    const elapsed = currentTime - spinStartTime;
    if (elapsed < spinTimeTotal) {
      // Ease-out effekt
      const t = elapsed / spinTimeTotal;
      const easedT = easeOut(t);
      // Oppdater total rotasjon basert på initial rotasjon
      currentRotation = initialAngle + randomSpinRad * easedT;
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      // Avslutt spinning
      spinning = false;
      // Sjekk sluttrotasjonen
      currentRotation = initialAngle + randomSpinRad;
      drawWheel();

      // Finn vinnaralternativet
      findWinner();
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Utregning av vinner
 */
function findWinner() {
  // Konverter nåværende rotasjon til grader
  let currentDeg = (currentRotation * 180 / Math.PI) % 360;
  if (currentDeg < 0) currentDeg += 360;

  // Fordi 0° i canvas = kl 3, men pilen peker kl 12
  // legger vi til 90° for å 'flytte' 0° til toppen
  let effectiveDeg = (currentDeg + 90) % 360;

  const arcDeg = 360 / options.length;
  let winningIndex = Math.floor(effectiveDeg / arcDeg);

  // SPEILVEND: Hvis du ser at resultatet blir “feil vei”, fjern kommentaren:
  winningIndex = (options.length - 1 - winningIndex) % options.length;

  alert('Vinnar: ' + options[winningIndex]);
}

/**
 * Easing-funksjon (easeOutCubic)
 */
function easeOut(t) {
  return (--t) * t * t + 1;
}

/**
 * Funksjon for å legge til eit nytt alternativ i hjulet
 */
function addOption() {
  const newValue = newOptionInput.value.trim();
  if (newValue) {
    options.push(newValue);
    newOptionInput.value = '';
    drawWheel();
  }
}

// Legg til event-lyttarane
spinBtn.addEventListener('click', spinWheel);
addOptionBtn.addEventListener('click', addOption);

// Teikn hjulet initialt
drawWheel();
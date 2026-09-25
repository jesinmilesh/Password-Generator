const password = document.getElementById("password");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");

const slider = document.getElementById("length");
const value = document.getElementById("lengthValue");

const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");

const strength = document.querySelector(".strength-bar");

slider.oninput = () => {
  value.innerHTML = slider.value;
};

const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const L = "abcdefghijklmnopqrstuvwxyz";
const N = "0123456789";
const S = "!@#$%^&*()_+{}[]<>?/|";

function randomChar(chars) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return chars[array[0] % chars.length];
}

generate.onclick = () => {
  let chars = "";

  if (upper.checked) chars += U;
  if (lower.checked) chars += L;
  if (number.checked) chars += N;
  if (symbol.checked) chars += S;

  if (!chars) {
    alert("Select at least one option");
    return;
  }

  let pass = "";

  for (let i = 0; i < slider.value; i++) {
    pass += randomChar(chars);
  }

  password.value = pass;

  updateStrength();
};

copy.onclick = () => {
  if (!password.value) return;

  navigator.clipboard.writeText(password.value);

  copy.innerHTML = '<i class="fa-solid fa-check"></i>';

  setTimeout(() => {
    copy.innerHTML = '<i class="fa-regular fa-copy"></i>';
  }, 1500);
};

function updateStrength() {
  let score = 0;

  if (upper.checked) score++;
  if (lower.checked) score++;
  if (number.checked) score++;
  if (symbol.checked) score++;

  score += slider.value / 10;

  if (score < 5) {
    strength.style.width = "35%";
    strength.style.background = "#ef4444";
  } else if (score < 7) {
    strength.style.width = "65%";
    strength.style.background = "#f59e0b";
  } else {
    strength.style.width = "100%";
    strength.style.background = "#22c55e";
  }
}

generate.click();
# 🔐 Modern & Cryptographically Secure Password Generator

A lightweight, modern, and highly secure client-side password generator built with **HTML5**, **CSS3 (Glassmorphism & Micro-animations)**, and **Vanilla JavaScript**. 

Designed with security best practices in mind, this tool leverages the browser's native **Web Cryptography API (`crypto.getRandomValues`)** to generate high-entropy, cryptographically random passwords directly on the client machine — ensuring zero sensitive data ever leaves your device.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Why Cryptographic Randomness Matters](#-why-cryptographic-randomness-matters)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
  - [1. Password Generation Algorithm](#1-password-generation-algorithm)
  - [2. Password Strength Evaluation Formula](#2-password-strength-evaluation-formula)
- [UI & Design System](#-ui--design-system)
- [Project Structure](#-project-structure)
- [Quick Start & Local Setup](#-quick-start--local-setup)
- [Security Considerations](#-security-considerations)
- [Potential Future Enhancements](#-potential-future-enhancements)
- [Author & License](#-author--license)

---

## 🌟 Overview

In cybersecurity, passwords are the first line of defense against unauthorized access. Traditional simple passwords or predictable combinations are susceptible to credential stuffing, dictionary attacks, and brute-force cracking.

This application provides users with an intuitive, aesthetic, and responsive interface to generate strong passwords tailored to specific security policies and length requirements.

---

## 🛡️ Why Cryptographic Randomness Matters

Most basic JavaScript password generators rely on `Math.random()`. However:
- `Math.random()` uses a pseudo-random number generator (PRNG) that is **not cryptographically secure (non-CSPRNG)**. Its internal seed and sequence can often be predicted if previous outputs are observed.
- **This application uses `window.crypto.getRandomValues()`**, a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) backed by hardware/system entropy provided by the operating system (e.g., `/dev/urandom` or Windows CryptoAPI). This guarantees true unpredictability against brute-force attacks.

```javascript
// Implementation snippet from script.js
function randomChar(chars) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return chars[array[0] % chars.length];
}
```

---

## ✨ Key Features

- **🔒 Cryptographically Secure**: Uses `crypto.getRandomValues()` for entropy.
- **🎚️ Dynamic Length Slider**: Smooth range selection from **6 to 32 characters** with real-time numeric display.
- **⚙️ Configurable Character Sets**:
  - **Uppercase Letters**: `A-Z`
  - **Lowercase Letters**: `a-z`
  - **Numbers**: `0-9`
  - **Special Symbols**: `!@#$%^&*()_+{}[]<>?/|`
- **📊 Real-time Strength Meter**: Visual color-coded progress bar giving instant feedback:
  - 🔴 **Weak (< 5 score)**: Needs more characters or diversity.
  - 🟡 **Medium (5 - 6.9 score)**: Decent complexity.
  - 🟢 **Strong (≥ 7 score)**: High entropy and robust protection.
- **📋 One-Click Clipboard Copy**: Copies the generated password instantly and changes the button icon to a checkmark for 1.5 seconds.
- **🎨 Glassmorphic Aesthetic**: Premium dark-mode UI with backdrop filters, gradient borders, floating background animated blobs, and Font Awesome iconography.
- **⚡ Zero Dependencies & Blazing Fast**: No frameworks or heavy libraries needed — pure native web standards.

---

## 🧠 How It Works

### 1. Password Generation Algorithm
1. The user selects desired character sets via checkboxes (Uppercase, Lowercase, Numbers, Symbols).
2. The user adjusts the length slider (default: 12).
3. If no options are checked, an alert warns the user to select at least one character type.
4. The algorithm concatenates the eligible characters into a single pool.
5. For each character up to the specified length, a random 32-bit unsigned integer is fetched via `crypto.getRandomValues(new Uint32Array(1))` and modulo-indexed into the pool.
6. The resulting string is rendered in the input field and strength is evaluated.

### 2. Password Strength Evaluation Formula
The strength meter computes a score based on a combination of **character diversity** and **length factor**:

$$\text{Score} = \text{Checked Sets Count (0-4)} + \frac{\text{Password Length}}{10}$$

- **Score < 5**: Width: `35%`, Color: `#ef4444` (Red)
- **Score 5 to 6.9**: Width: `65%`, Color: `#f59e0b` (Amber)
- **Score ≥ 7**: Width: `100%`, Color: `#22c55e` (Green)

---

## 🎨 UI & Design System

- **Design Style**: Modern Glassmorphism with deep navy/black backgrounds (`#0a0f1d`).
- **Typography**: Google Font **Poppins** (300, 400, 500, 600, 700).
- **Background Effects**: Three pulsating, blurred gradient blobs (`blob1`, `blob2`, `blob3`) creating an ambient lighting effect.
- **Card Container**: `backdrop-filter: blur(16px)` with subtle translucent border (`rgba(255, 255, 255, 0.1)`).
- **Responsive Layout**: Adapts gracefully to desktop, tablet, and mobile screens.

---

## 📂 Project Structure

```text
Password-Generator/
├── index.html        # Semantic HTML5 layout and UI structure
├── style.css         # Glassmorphism styling, layout, animations & theme
├── script.js         # Core password generation, CSPRNG logic & DOM events
└── README.md         # Comprehensive project documentation
```

### File Breakdown:
- **[`index.html`](index.html)**: Contains the main application card, length slider, character toggle checkboxes, output box with copy button, and strength bar.
- **[`style.css`](style.css)**: Implements CSS variables, flexbox alignments, custom range sliders, glowing button states, and CSS keyframe animations for the ambient blobs.
- **[`script.js`](script.js)**: Handles user interaction, clipboard API integration, input validation, CSPRNG character selection, and strength bar recalculation.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
Any modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari, Brave, etc.) that supports the Web Cryptography API.

### Method 1: Direct File Launch
1. Clone the repository:
   ```bash
   git clone https://github.com/jesinmilesh/Password-Generator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Password-Generator
   ```
3. Open `index.html` directly in your browser:
   - On Windows: Double-click `index.html` or run `start index.html` in PowerShell.
   - On macOS: Run `open index.html` in Terminal.
   - On Linux: Run `xdg-open index.html`.

### Method 2: Local Development Server
Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Or with Node.js / `npx`:
```bash
npx serve .
```

---

## 🔒 Security Considerations

- **Client-Side Only**: All passwords are generated purely within your local browser session. No network requests, analytics, or external API calls are made with your password data.
- **Zero Logging & Storage**: Passwords are never saved to `localStorage`, `sessionStorage`, or cookies. Once you refresh or close the tab, the password exists only in your clipboard if you chose to copy it.
- **HTTPS Recommended**: When deployed to a public server (such as GitHub Pages), always serve over HTTPS to ensure integrity and prevent tampering.

---

## 🔮 Potential Future Enhancements

- [ ] Option to exclude ambiguous/look-alike characters (e.g., `0`, `O`, `l`, `1`, `I`).
- [ ] Passphrase generator mode (Diceware / EFF wordlist style).
- [ ] Password history drawer (optional local session cache).
- [ ] Export generated passwords to CSV / JSON / TXT.
- [ ] Dark / Light theme toggle.

---

## 👤 Author

Developed by **[Jesin Milesh](https://github.com/jesinmilesh)**.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
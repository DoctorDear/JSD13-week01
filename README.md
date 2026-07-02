# 🌿 Botanica — Rare & Exotic Plant Sanctuary

Botanica is a static, premium web application designed to act as an interactive showcase catalog for collector-grade houseplants. Users can filter species by care difficulty, search by keyword, view comprehensive care sheets, and bookmark plants in a persistent wishlist.

---

## 🚀 Key Features

* **Dynamic Catalog Rendering**: Powered by a structured JSON-like JavaScript array of objects.
* **Instant Searching & Filtering**: Search bar, difficulty category pills, and sorting (Price, Alphabetical) operate in real-time without reloading the page.
* **Care-guide Drawers**: Slide-over panels detailing origin and specific parameters (Light, Water, Humidity, Temperature, and Soil).
* **Interactive Wishlist**: Add/remove bookmarked plants, view calculated total value, and run a mock checkout simulation.
* **LocalStorage Sync**: Wishlist selections are saved locally and persist when the page is refreshed.
* **Modern Premium Styling**: Styled with a dark-forest aesthetic, custom typography (*Plus Jakarta Sans*), subtle border glows, animations, and glassmorphism.

---

## 📁 File Structure

```bash
first-meet-git/
├── index.html     # Semantic structure, layout skeletons, & SVGs
├── style.css      # Design tokens, layouts, transitions, & mobile styling
├── data.js        # Data source (JavaScript array of plant objects)
└── app.js         # Interface logic, DOM binding, filters, & state management
```

---

## 🛠️ How it Works: Linking Data from `.js`

### 1. The Data Source (`data.js`)
The dataset is structured as an **array of objects**. Each object stores specific plant attributes and complex child objects (such as `careGuide` details). It is exposed to the global `window` object to allow seamless local file viewing:

```javascript
// data.js
const plants = [
  {
    id: 1,
    name: "Monstera Albo",
    difficulty: "Moderate",
    price: 145.00,
    careGuide: {
      humidity: "High (60%+)",
      soil: "Aroid mix"
    }
    // ... other properties
  }
];

window.plants = plants;
```

### 2. Linking in HTML (`index.html`)
The data is linked inside `index.html` by ordering the `<script>` tag calls. `data.js` runs first to initialize the data object, making it available to `app.js`:

```html
<!-- index.html -->
<script src="data.js"></script>
<script src="app.js"></script>
```

### 3. Rendering in DOM (`app.js`)
The controller script reads `window.plants` and dynamically prints cards into the grid using template literals:

```javascript
// app.js
const plants = window.plants;

plants.forEach(plant => {
  const card = document.createElement("div");
  card.className = "plant-card";
  card.innerHTML = `
    <h3>${plant.name}</h3>
    <span>$${plant.price.toFixed(2)}</span>
    <p>Soil: ${plant.careGuide.soil}</p>
  `;
  gridElement.appendChild(card);
});
```

---

## 🖥️ How to Run Locally

Since the application does not rely on third-party frameworks or compiler tools, you can run it instantly:

1. **Option A: Direct Double-Click**
   Open your folder and double-click [index.html](file:///Users/doctordear/Code/JSD13/week-01/first-meet-git/index.html) to run the website directly in any web browser.
   
2. **Option B: Local Dev Server**
   If you have Python installed, you can spin up a static file server:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

# Product Requirements Document (PRD) - Botanica

## 1. Executive Summary
**Botanica** is a premium, interactive web-based showcase catalog for rare and exotic houseplants (such as variegated Monstera, Anthuriums, and Alocasias). The project aims to deliver a high-end, immersive, dark-forest themed catalog experience for plant collectors while demonstrating clean web fundamentals using Vanilla JavaScript (arrays and objects), semantic HTML5, and responsive CSS3.

---

## 2. Project Objectives
* **Educational**: Practice core JavaScript concepts including Arrays, Objects, dynamic DOM manipulation, array filtering/sorting methods, and localStorage management.
* **UX/UI Excellence**: Create a state-of-the-art interactive catalog with fluid transitions, drawer animations, and modern glassmorphic visual treatments.
* **Performance**: Build a lightweight, SEO-friendly, zero-dependency static web application.
* **Portability**: Ensure the project operates flawlessly when loaded directly from the filesystem (`file://` protocol) by avoiding cross-origin module restrictions.

---

## 3. User Features & Requirements

### 3.1 Plant Catalog Grid (Core)
* **Description**: A grid that showcases cards for each plant.
* **Requirements**:
  * Render cards dynamically from the array of plant objects.
  * Each card must display:
    * Plant thumbnail image (fully optimized ratio).
    * Rating score badge.
    * Plant name and scientific botanical name.
    * Difficulty/Care status badge (Color-coded: Easy = Green, Moderate = Orange, Hard = Pink).
    * Price tag formatted in USD.
    * "Quick View" and "Wishlist Heart" buttons.

### 3.2 Dynamic Search & Filtering
* **Description**: Real-time tools to narrow down the plant selection.
* **Requirements**:
  * **Search Input**: Text filter that checks against plant name, scientific name, and description.
  * **Category Filter Pills**: Quick category tabs filterable by care requirements (All, Easy Care, Moderate Care, Collector's Choice).
  * **Sorting Dropdown**: Options to sort by Price (Low to High / High to Low) and Alphabetical (A-Z).
  * **Empty State**: Visual notification with search suggestions when no plants match the criteria.

### 3.3 Detail Slide-Over Drawer
* **Description**: A detail panel that slides in from the right edge when "Quick View" is clicked.
* **Requirements**:
  * Full plant details including botanical origin and overview description.
  * Dedicated "Care Instructions Grid" displaying specific parameters: Light, Watering, Humidity, Temperature, and Soil Mix.
  * Action bar with item price and a toggle wishlist button.

### 3.4 Localized Wishlist Drawer
* **Description**: A bookmarking system allowing users to save plants they wish to purchase/adopt.
* **Requirements**:
  * Visual badge count indicator in the sticky header.
  * Slide-over wishlist panel displaying selected items.
  * Ability to remove items directly from the list.
  * Real-time calculation of total "Est. Portfolio Value".
  * Simulated checkout action which clears the wishlist and alerts the user with a dynamic toast message.
  * Persistent storage across browser sessions using `localStorage`.

---

## 4. Technical Requirements

### 4.1 System Architecture & Files
The site utilizes a flat static architecture with 4 core files:
1. `index.html` - Site structure and component hooks.
2. `style.css` - Custom styling variables, glassmorphic UI elements, and keyframes.
3. `data.js` - Data layer declaring the plant data array.
4. `app.js` - Controller layer handling states, events, filtering, and storage.

### 4.2 Data Specifications
Data is structured in `data.js` as an **Array of Objects** exposed globally to avoid CORS policies:
```json
[
  {
    "id": 1,
    "name": "Monstera Albo",
    "scientificName": "Monstera deliciosa...",
    "category": "collector",
    "difficulty": "Moderate",
    "light": "Bright Indirect",
    "water": "Every 1-2 weeks",
    "price": 145.00,
    "rating": 4.9,
    "description": "...",
    "origin": "...",
    "image": "https://...",
    "careGuide": {
      "humidity": "High (60%+)",
      "temperature": "18°C - 27°C",
      "soil": "..."
    }
  }
]
```

### 4.3 Browser Support
* Modern browsers (Chrome, Safari, Edge, Firefox).
* No compilation or bundle build steps required. Runs out-of-the-box.

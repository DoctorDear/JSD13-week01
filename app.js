// Botanica Application Logic
// Accesses window.plants loaded from data.js

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE MANAGEMENT ---
  const state = {
    plants: window.plants || [],
    wishlist: JSON.parse(localStorage.getItem("botanica_wishlist")) || [],
    filters: {
      category: "all",
      search: "",
      sort: "default"
    },
    activeDetailPlant: null
  };

  // --- DOM ELEMENTS ---
  const DOM = {
    plantsGrid: document.getElementById("plants-grid"),
    searchInput: document.getElementById("search-input"),
    filterPills: document.getElementById("filter-pills"),
    sortSelect: document.getElementById("sort-select"),
    
    // Drawers & Overlay
    overlay: document.getElementById("drawer-overlay"),
    detailDrawer: document.getElementById("detail-drawer"),
    detailBody: document.getElementById("detail-drawer-body"),
    detailFooter: document.getElementById("detail-drawer-footer"),
    detailCloseBtn: document.getElementById("detail-close-btn"),
    
    wishlistDrawer: document.getElementById("wishlist-drawer"),
    wishlistBody: document.getElementById("wishlist-drawer-body"),
    wishlistFooter: document.getElementById("wishlist-drawer-footer"),
    wishlistCloseBtn: document.getElementById("wishlist-close-btn"),
    wishlistToggleBtn: document.getElementById("wishlist-toggle-btn"),
    wishlistCount: document.getElementById("wishlist-count"),
    
    toastContainer: document.getElementById("toast-container")
  };

  // --- DRAWER ACTIONS ---
  function openDrawer(drawer) {
    DOM.overlay.classList.add("active");
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeAllDrawers() {
    DOM.overlay.classList.remove("active");
    DOM.detailDrawer.classList.remove("open");
    DOM.wishlistDrawer.classList.remove("open");
    DOM.detailDrawer.setAttribute("aria-hidden", "true");
    DOM.wishlistDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore background scroll
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    const icon = type === "success" 
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`;

    toast.innerHTML = `${icon}<span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    // Trigger reflow to enable CSS transition
    toast.offsetHeight;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2500);
  }

  // --- WISHLIST OPERATIONS ---
  function updateWishlistStorage() {
    localStorage.setItem("botanica_wishlist", JSON.stringify(state.wishlist));
    DOM.wishlistCount.textContent = state.wishlist.length;
  }

  function toggleWishlist(plantId) {
    const index = state.wishlist.indexOf(plantId);
    const plant = state.plants.find(p => p.id === plantId);
    
    if (index === -1) {
      state.wishlist.push(plantId);
      showToast(`${plant.name} added to wishlist!`);
    } else {
      state.wishlist.splice(index, 1);
      showToast(`${plant.name} removed from wishlist.`, "error");
    }
    
    updateWishlistStorage();
    renderPlants();
    renderWishlist();
    
    // Update active details drawer footer if currently viewing this plant
    if (state.activeDetailPlant && state.activeDetailPlant.id === plantId) {
      renderDetailFooter(plantId);
    }
  }

  // --- RENDERING PLANTS GRID ---
  function renderPlants() {
    DOM.plantsGrid.innerHTML = "";
    
    // 1. Filter
    let filtered = state.plants.filter(plant => {
      const matchesCategory = state.filters.category === "all" || plant.category === state.filters.category;
      const matchesSearch = plant.name.toLowerCase().includes(state.filters.search.toLowerCase()) || 
                            plant.scientificName.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                            plant.description.toLowerCase().includes(state.filters.search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 2. Sort
    if (state.filters.sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.filters.sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.filters.sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 3. Render
    if (filtered.length === 0) {
      DOM.plantsGrid.innerHTML = `
        <div class="no-results">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3>No Rare Plants Found</h3>
          <p>Try refining your search terms or choosing a different care level category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(plant => {
      const isWishlisted = state.wishlist.includes(plant.id);
      
      const card = document.createElement("div");
      card.className = "plant-card";
      card.innerHTML = `
        <button class="card-wishlist-btn ${isWishlisted ? "active" : ""}" data-id="${plant.id}" aria-label="Add to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" fill="${isWishlisted ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        <div class="card-img-container">
          <img src="${plant.image}" alt="${plant.name}" loading="lazy">
          <span class="difficulty-badge ${plant.difficulty.toLowerCase()}">${plant.difficulty}</span>
        </div>
        
        <div class="card-content">
          <div class="plant-rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>${plant.rating.toFixed(1)}</span>
          </div>
          <h3 class="plant-name">${plant.name}</h3>
          <p class="plant-sci-name">${plant.scientificName}</p>
          <div class="card-footer">
            <span class="plant-price">$${plant.price.toFixed(2)}</span>
            <button class="quick-view-btn" data-id="${plant.id}">Quick View</button>
          </div>
        </div>
      `;
      
      // Wire up card inner buttons
      card.querySelector(".card-wishlist-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(plant.id);
      });
      
      card.querySelector(".quick-view-btn").addEventListener("click", () => {
        showDetailDrawer(plant);
      });

      DOM.plantsGrid.appendChild(card);
    });
  }

  // --- RENDERING DETAIL DRAWER ---
  function showDetailDrawer(plant) {
    state.activeDetailPlant = plant;
    
    DOM.detailBody.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="detail-img">
      <h3 class="plant-name" style="font-size: 1.8rem; margin-bottom: 0.25rem;">${plant.name}</h3>
      <p class="detail-sci-name">${plant.scientificName}</p>
      
      <div class="detail-tags">
        <span class="detail-tag">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Origin: ${plant.origin}
        </span>
        <span class="detail-tag">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Difficulty: ${plant.difficulty}
        </span>
      </div>
      
      <h4 class="detail-section-title">Overview</h4>
      <p class="detail-desc">${plant.description}</p>
      
      <h4 class="detail-section-title">Care Instructions</h4>
      <div class="detail-grid">
        <div class="detail-card">
          <h4>Light</h4>
          <p>${plant.light}</p>
        </div>
        <div class="detail-card">
          <h4>Watering</h4>
          <p>${plant.water}</p>
        </div>
        <div class="detail-card">
          <h4>Humidity</h4>
          <p>${plant.careGuide.humidity}</p>
        </div>
        <div class="detail-card">
          <h4>Ideal Temp</h4>
          <p>${plant.careGuide.temperature}</p>
        </div>
      </div>
      
      <div class="detail-card" style="grid-column: 1 / -1; margin-bottom: 2rem;">
        <h4 style="margin-bottom: 0.25rem;">Soil Requirement</h4>
        <p style="font-weight: 500;">${plant.careGuide.soil}</p>
      </div>
    `;

    renderDetailFooter(plant.id);
    openDrawer(DOM.detailDrawer);
  }

  function renderDetailFooter(plantId) {
    const plant = state.plants.find(p => p.id === plantId);
    const isWishlisted = state.wishlist.includes(plantId);
    
    DOM.detailFooter.innerHTML = `
      <div class="detail-action-bar">
        <div class="detail-price-box">
          <span class="detail-price-label">Price</span>
          <span class="detail-price">$${plant.price.toFixed(2)}</span>
        </div>
        <button class="detail-add-wishlist ${isWishlisted ? "active" : ""}" id="detail-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="${isWishlisted ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>${isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
        </button>
      </div>
    `;

    // Wire up button in details footer
    document.getElementById("detail-action-btn").addEventListener("click", () => {
      toggleWishlist(plantId);
    });
  }

  // --- RENDERING WISHLIST DRAWER ---
  function renderWishlist() {
    DOM.wishlistBody.innerHTML = "";
    DOM.wishlistFooter.innerHTML = "";
    
    if (state.wishlist.length === 0) {
      DOM.wishlistBody.innerHTML = `
        <div class="wishlist-empty">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p>Your wishlist is empty.</p>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Explore the sanctuary and tap the heart icon to save rare finds.</p>
        </div>
      `;
      return;
    }

    const listContainer = document.createElement("div");
    listContainer.className = "wishlist-items";
    
    let totalPrice = 0;

    state.wishlist.forEach(plantId => {
      const plant = state.plants.find(p => p.id === plantId);
      if (!plant) return;
      
      totalPrice += plant.price;

      const item = document.createElement("div");
      item.className = "wishlist-item";
      item.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}">
        <div class="wishlist-item-info">
          <h4 class="wishlist-item-name">${plant.name}</h4>
          <span class="wishlist-item-price">$${plant.price.toFixed(2)}</span>
        </div>
        <button class="wishlist-remove-btn" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="width: 18px; height: 18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      `;

      item.querySelector(".wishlist-remove-btn").addEventListener("click", () => {
        toggleWishlist(plantId);
      });

      listContainer.appendChild(item);
    });

    DOM.wishlistBody.appendChild(listContainer);

    DOM.wishlistFooter.innerHTML = `
      <div class="wishlist-summary">
        <span>Est. Portfolio Value:</span>
        <span class="wishlist-total">$${totalPrice.toFixed(2)}</span>
      </div>
      <button class="wishlist-checkout-btn" id="wishlist-checkout-btn">Adopt All Plants</button>
    `;

    document.getElementById("wishlist-checkout-btn").addEventListener("click", () => {
      showToast("Thank you for adopting! Order placed.", "success");
      state.wishlist = [];
      updateWishlistStorage();
      renderPlants();
      renderWishlist();
      setTimeout(closeAllDrawers, 1000);
    });
  }

  // --- EVENT LISTENERS SETUP ---
  function setupEventListeners() {
    // Search
    DOM.searchInput.addEventListener("input", (e) => {
      state.filters.search = e.target.value;
      renderPlants();
    });

    // Category Filter Pills
    DOM.filterPills.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      // Update UI active state
      DOM.filterPills.querySelectorAll(".filter-btn").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");

      // Update State
      state.filters.category = btn.dataset.category;
      renderPlants();
    });

    // Sorting
    DOM.sortSelect.addEventListener("change", (e) => {
      state.filters.sort = e.target.value;
      renderPlants();
    });

    // Drawer Opening/Closing
    DOM.wishlistToggleBtn.addEventListener("click", () => {
      openDrawer(DOM.wishlistDrawer);
    });

    DOM.wishlistCloseBtn.addEventListener("click", closeAllDrawers);
    DOM.detailCloseBtn.addEventListener("click", closeAllDrawers);
    DOM.overlay.addEventListener("click", closeAllDrawers);

    // Escape Key to close drawers
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDrawers();
      }
    });
  }

  // --- INITIALIZATION ---
  function init() {
    setupEventListeners();
    updateWishlistStorage();
    renderPlants();
    renderWishlist();
  }

  init();
});

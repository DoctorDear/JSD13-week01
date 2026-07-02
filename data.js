// Rare and Exotic Plant Database
// This file stores the primary data source using an Array of Objects.

const plants = [
  {
    id: 1,
    name: "Monstera Albo",
    scientificName: "Monstera deliciosa 'Albo Borsigiana'",
    category: "collector",
    difficulty: "Moderate",
    light: "Bright Indirect",
    water: "Every 1-2 weeks",
    price: 145.00,
    rating: 4.9,
    description: "A highly coveted collector's plant featuring stunning blocky and marbled white variegation. Each leaf is a unique living work of art.",
    origin: "Rainforests of Central America",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "High (60%+)",
      temperature: "18°C - 27°C",
      soil: "Aroid mix (bark, perlite, peat)"
    }
  },
  {
    id: 2,
    name: "Begonia Maculata",
    scientificName: "Begonia maculata 'Wightii'",
    category: "moderate",
    difficulty: "Moderate",
    light: "Medium Indirect",
    water: "Keep soil moist",
    price: 32.50,
    rating: 4.7,
    description: "Commonly known as the Polka Dot Begonia, this eye-catching plant features olive green leaves covered with silver spots and deep red undersides.",
    origin: "Tropical forests of Brazil",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "Medium to High (50%+)",
      temperature: "15°C - 22°C",
      soil: "Well-draining potting soil"
    }
  },
  {
    id: 3,
    name: "Anthurium Clarinervium",
    scientificName: "Anthurium clarinervium",
    category: "collector",
    difficulty: "Hard",
    light: "Bright Indirect",
    water: "When top soil is dry",
    price: 85.00,
    rating: 4.8,
    description: "A velvet-leaf beauty with thick, heart-shaped dark green leaves and striking white veins. A true statement piece for plant enthusiasts.",
    origin: "Chiapas, Mexico",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "High (70%+)",
      temperature: "18°C - 26°C",
      soil: "Sphagnum moss and orchid bark mix"
    }
  },
  {
    id: 4,
    name: "Snake Plant Laurentii",
    scientificName: "Sansevieria trifasciata 'Laurentii'",
    category: "easy",
    difficulty: "Easy",
    light: "Low to Bright",
    water: "Every 3-4 weeks",
    price: 24.00,
    rating: 4.6,
    description: "An incredibly resilient plant with upright sword-like leaves banded with yellow. Excellent air purifier and perfect for beginners.",
    origin: "West Africa",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "Average room humidity",
      temperature: "15°C - 30°C",
      soil: "Cactus and succulent mix"
    }
  },
  {
    id: 5,
    name: "Pilea Peperomioides",
    scientificName: "Pilea peperomioides",
    category: "easy",
    difficulty: "Easy",
    light: "Bright Indirect",
    water: "When soil is fully dry",
    price: 18.50,
    rating: 4.5,
    description: "Also known as the Chinese Money Plant, it displays unique round, coin-like leaves on delicate stems. It is known to sprout tiny baby plants regularly.",
    origin: "Yunnan Province, China",
    image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "Moderate room humidity",
      temperature: "13°C - 24°C",
      soil: "Peat-based potting mix with sand"
    }
  },
  {
    id: 6,
    name: "Philodendron Birkin",
    scientificName: "Philodendron 'Birkin'",
    category: "easy",
    difficulty: "Easy",
    light: "Medium Indirect",
    water: "Every 1-2 weeks",
    price: 28.00,
    rating: 4.8,
    description: "A gorgeous designer houseplant featuring dense, dark-green leaves striped with creamy white pinstripes. A slow-growing, compact beauty.",
    origin: "Cultivated Hybrid",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "Medium (50%+)",
      temperature: "18°C - 25°C",
      soil: "Rich organic, fast-draining mix"
    }
  },
  {
    id: 7,
    name: "Calathea Orbifolia",
    scientificName: "Calathea orbifolia",
    category: "moderate",
    difficulty: "Hard",
    light: "Medium Indirect",
    water: "Keep consistently damp",
    price: 39.00,
    rating: 4.4,
    description: "Famous for its oversized, circular leaves striped with pale silver-green bands. This stunning prayer plant moves its leaves up and down at night.",
    origin: "Bolivia and Brazil",
    image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "High (65%+)",
      temperature: "18°C - 24°C",
      soil: "Moisture-retaining aroid mix"
    }
  },
  {
    id: 8,
    name: "Alocasia Dragon Scale",
    scientificName: "Alocasia baginda 'Dragon Scale'",
    category: "collector",
    difficulty: "Hard",
    light: "Bright Indirect",
    water: "When top 2 inches dry",
    price: 55.00,
    rating: 4.9,
    description: "Features thick, textured leaves that resemble dragon scales. With deep veins and a metallic silvery-green sheen, it is a highly prized compact gem.",
    origin: "Borneo Rainforests",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    careGuide: {
      humidity: "High (60%-80%)",
      temperature: "18°C - 27°C",
      soil: "Chunky, aerated orchid mix"
    }
  }
];

// Expose to window for global access
window.plants = plants;

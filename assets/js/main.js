/**
 * MA AASHAPURI FURNITURE - INTERACTIVE LUXURY JAVASCRIPT ENGINE
 * "We Build Your Paper Design in Real Life"
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initComparisonSliders();
  initBlueprintHotspots();
  initCostEstimator();
  initPortfolioFilters();
  initPortfolioModal();
  initConsultationForm();
  initMaterialSwatches();
  initFaqAccordion();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
}

/* ==========================================================================
   2. INTERACTIVE "PAPER TO REALITY" BEFORE/AFTER COMPARISON SLIDER
   ========================================================================== */
function initComparisonSliders() {
  const containers = document.querySelectorAll('.comparison-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const beforeImg = container.querySelector('.comparison-before');
    const innerImg = container.querySelector('.comparison-before .img-inner');
    const handle = container.querySelector('.comparison-slider-handle');

    if (!beforeImg || !handle) return;

    function syncInnerWidth() {
      if (innerImg) {
        innerImg.style.width = `${container.offsetWidth}px`;
      }
    }

    syncInnerWidth();
    window.addEventListener('resize', syncInnerWidth);

    let isSliding = false;

    function setSliderPosition(x) {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isSliding = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSliding) return;
      setSliderPosition(e.clientX);
    });

    // Touch Support
    container.addEventListener('touchstart', (e) => {
      isSliding = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isSliding = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isSliding) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* ==========================================================================
   3. BLUEPRINT HOTSPOTS & CAD INSPECTOR
   ========================================================================== */
const hotspotData = {
  1: {
    title: "Master King-Size Bed with Integrated Fluted Wood",
    category: "Bespoke Carpentry",
    specs: {
      "Blueprint Spec": "Custom 6ft x 6.5ft Floating Frame with LED Underglow",
      "Wood Material": "Grade-A Seasoned Solid Teakwood + IS 710 Marine Ply",
      "Headboard": "Acoustic Fluted Wooden Louvers with Hidden Warm LED Strips",
      "Upholstery": "Belgian Velvet Foam Backrest with Feather Core",
      "Crafting Time": "8 Factory Days (Precision Homag CNC Joined)"
    },
    desc: "Crafted directly from the architect's 2D pencil draft into an acoustic fluted master bed wall with ambient soft illumination."
  },
  2: {
    title: "Floor-to-Ceiling Tinted Glass & Fluted Wardrobe",
    category: "Modular Architecture",
    specs: {
      "Blueprint Spec": "4-Door Soft-Close Sliding Wardrobe (Height: 9.5 ft)",
      "Internal Carcass": "IS 710 BWR Water-Proof Marine Plywood",
      "Door Frames": "Anodized Champagne Gold Aluminium & Fluted Glass",
      "Hardware": "Blum Tandembox with Soft-Damping Suspension",
      "Internal Feature": "Integrated Sensor LED Wardrobe Strips with Motion Sense"
    },
    desc: "Transforms standard bedroom storage into a luxury boutique walk-in closet tailored to exact centimeter tolerances."
  },
  3: {
    title: "Italian Calacatta Marble & Walnut Floating Vanity",
    category: "Luxury Stone & Veneer",
    specs: {
      "Blueprint Spec": "Wall-Mounted Console with Concealed Push-Drawers",
      "Top Surface": "Natural Calacatta Gold Marble Slab with Bookmatched Grain",
      "Cabinet Base": "Smoked Walnut Wood Veneer with PU Matte Finish",
      "Drawers": "Push-to-Open Concealed Hafele Soft-Close Runners",
      "Mirror Detail": "Backlit Anti-Fog Organic Oval Vanity Mirror"
    },
    desc: "Seamless joinery merging organic marble with warm walnut veneer, built precisely to the blueprint's cantilever geometry."
  }
};

function initBlueprintHotspots() {
  const pins = document.querySelectorAll('.hotspot-pin');
  const specTitle = document.getElementById('specTitle');
  const specCategory = document.getElementById('specCategory');
  const specDesc = document.getElementById('specDesc');
  const specList = document.getElementById('specList');

  if (!pins.length || !specTitle) return;

  function updateSpec(id) {
    const data = hotspotData[id];
    if (!data) return;

    pins.forEach(p => p.classList.toggle('active', p.dataset.spot === String(id)));

    specTitle.textContent = data.title;
    specCategory.textContent = data.category;
    specDesc.textContent = data.desc;

    if (specList) {
      specList.innerHTML = Object.entries(data.specs).map(([key, value]) => `
        <li>
          <span>${key}</span>
          <span>${value}</span>
        </li>
      `).join('');
    }
  }

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      updateSpec(pin.dataset.spot);
    });
  });

  // Default initial selection
  updateSpec(1);
}

/* ==========================================================================
   4. DYNAMIC COST ESTIMATOR & PRICE CALCULATOR
   ========================================================================== */
function initCostEstimator() {
  const bhkInputs = document.querySelectorAll('input[name="bhk_type"]');
  const areaSlider = document.getElementById('carpetAreaSlider');
  const areaValueDisplay = document.getElementById('carpetAreaValue');
  const scopeCheckboxes = document.querySelectorAll('input[name="scope"]');
  const materialInputs = document.querySelectorAll('input[name="material_tier"]');

  const sumBhk = document.getElementById('summaryBhk');
  const sumArea = document.getElementById('summaryArea');
  const sumMaterial = document.getElementById('summaryMaterial');
  const sumScope = document.getElementById('summaryScope');
  const totalCostDisplay = document.getElementById('totalEstimatedCost');

  if (!totalCostDisplay) return;

  function calculate() {
    const selectedBhk = document.querySelector('input[name="bhk_type"]:checked')?.value || '2 BHK';
    const area = parseInt(areaSlider?.value || 1050, 10);
    const selectedMaterial = document.querySelector('input[name="material_tier"]:checked')?.value || 'premium';

    // Base rates per sq.ft
    let baseRate = 1200;

    if (selectedMaterial === 'essential') {
      baseRate = 950;
      if (sumMaterial) sumMaterial.textContent = 'Essential (MR Ply & Matte Laminate)';
    } else if (selectedMaterial === 'premium') {
      baseRate = 1450;
      if (sumMaterial) sumMaterial.textContent = 'Premium (IS 710 Ply & Acrylic)';
    } else if (selectedMaterial === 'luxury') {
      baseRate = 2100;
      if (sumMaterial) sumMaterial.textContent = 'Ultra-Luxury (Teak, Veneer & Marble)';
    }

    // Room scope calculation
    let scopeCount = 0;
    let selectedScopes = [];
    scopeCheckboxes.forEach(cb => {
      if (cb.checked) {
        scopeCount++;
        selectedScopes.push(cb.dataset.name || cb.value);
      }
    });

    if (scopeCount === 0) scopeCount = 1;

    let multiplier = 0.45 + (scopeCount * 0.14);
    if (multiplier > 1.0) multiplier = 1.0;

    let rawCost = area * baseRate * multiplier;

    let formattedCost = formatIndianCurrency(Math.round(rawCost));

    if (areaValueDisplay) areaValueDisplay.textContent = `${area} sq.ft`;
    if (sumBhk) sumBhk.textContent = selectedBhk;
    if (sumArea) sumArea.textContent = `${area} sq.ft`;
    if (sumScope) sumScope.textContent = selectedScopes.length ? selectedScopes.join(', ') : 'Modular Woodwork';
    if (totalCostDisplay) totalCostDisplay.textContent = `₹${formattedCost}`;

    // Update Itemized BOM table if present
    updateBOMTable(rawCost);
  }

  function formatIndianCurrency(num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' Lakh';
    }
    return num.toLocaleString('en-IN');
  }

  function updateBOMTable(total) {
    const woodworkCell = document.getElementById('bomWoodwork');
    const surfaceCell = document.getElementById('bomSurface');
    const hardwareCell = document.getElementById('bomHardware');
    const installationCell = document.getElementById('bomInstallation');

    if (woodworkCell) woodworkCell.textContent = `₹${formatIndianCurrency(Math.round(total * 0.58))}`;
    if (surfaceCell) surfaceCell.textContent = `₹${formatIndianCurrency(Math.round(total * 0.22))}`;
    if (hardwareCell) hardwareCell.textContent = `₹${formatIndianCurrency(Math.round(total * 0.12))}`;
    if (installationCell) installationCell.textContent = `₹${formatIndianCurrency(Math.round(total * 0.08))}`;
  }

  bhkInputs.forEach(input => input.addEventListener('change', calculate));
  materialInputs.forEach(input => input.addEventListener('change', calculate));
  scopeCheckboxes.forEach(input => input.addEventListener('change', calculate));
  areaSlider?.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   5. PORTFOLIO FILTER & URL QUERY PARAMS
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  function applyFilter(category) {
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === category));

    portfolioItems.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });

  // Check URL query parameters (e.g. portfolio.html?cat=kitchen)
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat');
  if (cat) {
    applyFilter(cat);
  }
}

/* ==========================================================================
   6. PORTFOLIO PROJECT LIGHTBOX & DETAILS MODAL
   ========================================================================== */
const projectDetails = {
  // 1. Royal Peacock Living
  peacock_living: {
    title: "The Royal Peacock Pavilion Living Lounge",
    category: "Living Rooms & Lounges",
    location: "Luxury High-Rise Residence",
    area: "1,200 sq.ft Living & Dining",
    image: "assets/images/real_work/living_room_curved_sofa_wide.jpg",
    desc: "An opulent living hall showcasing bespoke curved bouclé sofas, hand-painted peacock botanical mural, and a traditional solid brass jhula swing framed by 9 ornamental jharokha mirrors.",
    specs: {
      "Living Seating": "Custom Dual Curved Bouclé Velvet Sofas",
      "Wall Artistry": "Hand-Painted Peacock Arch Mural with Gold Leafing",
      "Traditional Accents": "Hand-Carved Teakwood Swing with Solid Brass Chains",
      "Woodwork Grade": "Grade-A Seasoned Teakwood & IS 710 Marine Plywood",
      "Execution Duration": "35 Handover Days"
    }
  },

  // 2. Real Calacatta Media Wall
  real_marble_tv: {
    title: "Calacatta Gold Marble & Fluted Media Wall",
    category: "Real Built Handover",
    location: "Turnkey Penthouse Project",
    area: "Media Wall & Electric Fireplace",
    image: "assets/images/real_work/real_tv_unit_marble_wide.jpg",
    desc: "Built exactly from architectural 3D blueprint into physical reality. Features bookmatched Calacatta marble slab, fluted warm wood louvers, concealed LED cove illumination, and electric hearth recess.",
    specs: {
      "Original Blueprint": "3D Architectural Render Reference",
      "Backdrop Slab": "Italian Calacatta Gold Natural Polished Marble",
      "Woodwork": "Acoustic Vertical Fluted Oak Slats",
      "Cabinet Console": "Floating Push-to-Open Drawers with Hafele Hardware",
      "Lighting": "Concealed 3000K Warm Ambience Cove LEDs"
    }
  },

  // 3. Real Fluted TV Unit with Cove Glow
  fluted_tv_cove: {
    title: "Fluted Oak Media Wall with Ambience Cove Glow",
    category: "Real Built Handover",
    location: "Modern Villa Residence",
    area: "Entertainment Suite",
    image: "assets/images/real_work/real_tv_unit_fluted_cove_vertical.jpg",
    desc: "A masterwork of vertical woodwork joinery, featuring floor-to-ceiling slatted fluted louvers, cantilevered TV mounting backboard, and warm edge-lit indirect lighting.",
    specs: {
      "Carcass & Core": "IS 710 Boiling Water Proof (BWP) Marine Ply",
      "Finish": "Natural Smoked Oak PU Satin Touch",
      "Cable Management": "100% Concealed In-Wall Conduit Channels",
      "Hardware": "German Hafele Soft-Close Runners",
      "Execution Duration": "14 Factory Days + 2 Installation Days"
    }
  },

  // 4. The Peacock Sanctuary Master Suite
  peacock_bedroom: {
    title: "The Peacock Sanctuary Master Suite",
    category: "Master Bedroom Suites",
    location: "Luxury Master Residence",
    area: "480 sq.ft Master Suite",
    image: "assets/images/real_work/bedroom_peacock_arch_wide.jpg",
    desc: "A regal bedroom suite crafted around an arched peacock mural backdrop, fluted wooden pilasters, integrated bedside floating drawers, and champagne profile sliding wardrobes.",
    specs: {
      "Headboard Frame": "Architectural Arched Wood Carving with Cove LED",
      "Bed Frame": "King Floating Teak Platform with Hydraulic Storage",
      "Wardrobe": "Smooth Sliding Floor-to-Ceiling Anodized Profile",
      "Core Plywood": "100% Termite-Proof Marine Grade BWR Ply",
      "Execution Duration": "28 Days Handover"
    }
  },

  // 5. Arched Vanity & Dressing Alcove
  vanity_dressing: {
    title: "Arched Vanity & Dressing Alcove Atelier",
    category: "Dressing & Vanity Suites",
    location: "Master Suite Walk-In Alcove",
    area: "Integrated Dressing Room",
    image: "assets/images/real_work/bedroom_vanity_mirror_angle.jpg",
    desc: "A dedicated luxury grooming salon featuring a full-length backlit arched mirror, floating cosmetics dresser, brass open display shelves, and integrated warm vanity illumination.",
    specs: {
      "Mirror": "Custom Arched Saint-Gobain 6mm Ultra-Clear Mirror",
      "Dresser Drawers": "Velvet-Lined Jewelry Compartments with Blum Soft-Close",
      "Vertical Shelving": "Champagne Gold Brushed Aluminium Floating Niches",
      "Lighting": "Touch-Sensor Backlit CRI 95+ Vanity Glow",
      "Execution Duration": "10 Factory Days"
    }
  },

  // 6. High-Gloss Emerald Capsule Wardrobe
  capsule_wardrobe: {
    title: "High-Gloss Emerald & Alabaster Capsule Wardrobe",
    category: "Real Built Handover",
    location: "Contemporary Suite",
    area: "Full-Height Custom Wardrobe",
    image: "assets/images/real_work/real_wardrobe_capsule_gloss_vertical.jpg",
    desc: "Completed on-site handover showing high-gloss emerald lacquer doors, arched alcove vanity niche with fluted backplate, and champagne gold longline architectural pull handles.",
    specs: {
      "Finish": "High-Gloss Mirror Polyurethane & Alabaster Acrylic",
      "Alcove Feature": "Fluted Arch Vanity Niche with Hanging Gold Pendant",
      "Hardware": "Blum Clip-Top Soft-Close 110-Degree Hinges",
      "Interior": "Fabric-Textured Scratch-Proof Suede Laminate",
      "Execution Duration": "18 Days"
    }
  },

  // 7. Terracotta Fluted Base Wardrobe
  fluted_wardrobe: {
    title: "Terracotta Fluted & Silk Gloss 4-Door Wardrobe",
    category: "Real Built Handover",
    location: "Modern Bedroom Suite",
    area: "Floor-to-Ceiling Wardrobe",
    image: "assets/images/real_work/real_wardrobe_fluted_base_vertical.jpg",
    desc: "Authentic installation featuring two-tone terracotta fluted lower panels, silk gloss upper shutters, and seamless color-matched bedroom entrance door with matching fluted wainscoting.",
    specs: {
      "Joinery Harmony": "Matching Bedroom Door & Wardrobe Architectural Theme",
      "Lower Section": "CNC Precision Grooved Fluted Terracotta Matte",
      "Upper Shutters": "Silk-Touch Off-White Acrylic on Marine Ply",
      "Door Integration": "Flush Concealed Architectural Pivot Hinges",
      "Execution Duration": "16 Factory Days"
    }
  },

  // 8. Matte Cashmere Modular Kitchen
  cashmere_kitchen: {
    title: "Matte Cashmere Handleless Modular Kitchen",
    category: "Modular Kitchens",
    location: "Luxury Residence",
    area: "Kitchen & Utility",
    image: "assets/images/real_work/kitchen_modular_cooktop.jpg",
    desc: "A sleek European culinary kitchen crafted with handleless Gola profiles, scratch-resistant matte cashmere shutters, composite quartz stone countertop, and built-in hob cooking zone.",
    specs: {
      "Carcass": "100% Waterproof IS 710 Boiling Water Proof (BWP) Marine Ply",
      "Shutters": "Anti-Fingerprint Thermal Healing Matte Acrylic",
      "Channels": "Blum Legrabox Smooth Drawers with 65kg Weight Capacity",
      "Countertop": "20mm Stain-Proof Engineered Quartz Slab",
      "Execution Duration": "21 Factory Days + 3 On-Site Days"
    }
  },

  // 9. Kitchen Pantry & Fridge Station
  kitchen_pantry: {
    title: "Integrated Breakfast Pantry & Refrigerator Station",
    category: "Modular Kitchens",
    location: "Chef's Galley Kitchen",
    area: "Pantry & Tall Unit Section",
    image: "assets/images/real_work/kitchen_pantry_fridge_station.jpg",
    desc: "Ergonomic kitchen tall unit zone with fluted glass crockery display, open coffee niche, seamlessly recessed double-door refrigerator housing, and soft ambient strip lighting.",
    specs: {
      "Tall Unit Carcass": "Calibrated Marine Ply with Moisture Barrier",
      "Display Glass": "German Fluted Profile with Warm Internal Strip Lights",
      "Niche Shelf": "Natural Oak Texture Waterproof Breakfast Station",
      "Lift Systems": "Blum Aventos Soft-Lift Overhead Flaps",
      "Execution Duration": "15 Days"
    }
  },

  // 10. Botanical Arch Entryway Foyer
  botanical_foyer: {
    title: "Botanical Capsule Arch Entryway Foyer",
    category: "Living & Entryways",
    location: "Entrance Foyer",
    area: "Main Entrance Hall",
    image: "assets/images/real_work/entryway_botanical_arch.jpg",
    desc: "An inviting first impression featuring an arched botanical art alcove, recessed shoe credenza, fluted wall cladding, and a flush-mounted door seamlessly matching the paneling.",
    specs: {
      "Paneling": "Flush Architectural Wall Cladding with Hidden Door",
      "Alcove Feature": "Recessed Capsule Arch with Botanical Art Canvas",
      "Cabinet": "Floating Footwear Credenza with Open Sensor LED Base",
      "Core": "IS 710 BWP Marine Grade Core",
      "Execution Duration": "12 Days"
    }
  },

  // 11. Traditional Brass Jhula Lounge
  jhula_living: {
    title: "Traditional Brass Jhula Lounge & Jharokha Mirrors",
    category: "Living Rooms & Lounges",
    location: "Heritage Living Space",
    area: "Family Lounge & Courtyard",
    image: "assets/images/real_work/living_room_jhula_swing_front.jpg",
    desc: "Authentic Indian heirloom craftsmanship featuring a solid teakwood jhula suspended by hand-cast brass link chains, backed by a gallery of 9 arched jharokha mirrors.",
    specs: {
      "Swing Seat": "Solid Kiln-Dried Burma Teakwood with High PU Finish",
      "Chains & Hooks": "100% Solid Cast Brass Chains with Antique Patina",
      "Mirror Wall": "9 Custom Arched Jharokha Wood Framed Mirrors",
      "Weight Rating": "Reinforced Ceiling Anchor Rated up to 450 kg",
      "Execution Duration": "14 Crafting Days"
    }
  },

  // 12. Vastu Backlit Pooja Mandir
  mandir: {
    title: "Backlit CNC Brass Vastu Pooja Mandir",
    category: "Vastu Pooja Mandirs",
    location: "Sacred Room Sanctum",
    area: "Dedicated Pooja Sanctum",
    image: "assets/images/mandir.jpg",
    desc: "Handcrafted strictly to Vastu Shastra principles. Features waterjet-cut brass jali with acrylic diffusion, solid teakwood carved pillars, white Corian sanctum, and hidden pull-out brass diya trays.",
    specs: {
      "Vastu Orientation": "100% Compliant North-East / East Facing",
      "Wood Material": "Grade-A Seasoned CP Teakwood",
      "Jali Work": "CNC Waterjet Solid Brass Sheets with LED Diffusers",
      "Storage": "Concealed Velvet Drawer Liners for Sacred Artifacts",
      "Execution Duration": "16 Factory Days"
    }
  },

  // Category Fallbacks
  living: {
    title: "The Royal Peacock Pavilion Living Lounge",
    category: "Living Rooms & Lounges",
    location: "Luxury High-Rise Residence",
    area: "1,200 sq.ft Living & Dining",
    image: "assets/images/real_work/living_room_curved_sofa_wide.jpg",
    desc: "An opulent living hall showcasing bespoke curved bouclé sofas, hand-painted peacock botanical mural, and a traditional solid brass jhula swing framed by 9 ornamental jharokha mirrors.",
    specs: {
      "Living Seating": "Custom Dual Curved Bouclé Velvet Sofas",
      "Wall Artistry": "Hand-Painted Peacock Arch Mural with Gold Leafing",
      "Joinery": "Grade-A Seasoned Teakwood & IS 710 Marine Plywood",
      "Execution Duration": "35 Handover Days"
    }
  },
  kitchen: {
    title: "Matte Cashmere Handleless Modular Kitchen",
    category: "Modular Kitchens",
    location: "Luxury Residence",
    area: "Kitchen & Utility",
    image: "assets/images/real_work/kitchen_modular_cooktop.jpg",
    desc: "A sleek European culinary kitchen crafted with handleless Gola profiles, scratch-resistant matte cashmere shutters, composite quartz stone countertop, and built-in hob cooking zone.",
    specs: {
      "Carcass": "100% Waterproof IS 710 Boiling Water Proof (BWP) Marine Ply",
      "Shutters": "Anti-Fingerprint Thermal Healing Matte Acrylic",
      "Channels": "Blum Legrabox Smooth Drawers",
      "Execution Duration": "21 Factory Days"
    }
  },
  bedroom: {
    title: "The Peacock Sanctuary Master Suite",
    category: "Master Bedroom Suites",
    location: "Luxury Master Residence",
    area: "480 sq.ft Master Suite",
    image: "assets/images/real_work/bedroom_peacock_arch_wide.jpg",
    desc: "A regal bedroom suite crafted around an arched peacock mural backdrop, fluted wooden pilasters, integrated bedside floating drawers, and champagne profile sliding wardrobes.",
    specs: {
      "Headboard Frame": "Architectural Arched Wood Carving with Cove LED",
      "Bed Frame": "King Floating Teak Platform with Hydraulic Storage",
      "Wardrobe": "Smooth Sliding Floor-to-Ceiling Anodized Profile",
      "Execution Duration": "28 Days Handover"
    }
  },
  wardrobe: {
    title: "High-Gloss Emerald & Alabaster Capsule Wardrobe",
    category: "Bespoke Wardrobes",
    location: "Contemporary Suite",
    area: "Full-Height Custom Wardrobe",
    image: "assets/images/real_work/real_wardrobe_capsule_gloss_vertical.jpg",
    desc: "Completed on-site handover showing high-gloss emerald lacquer doors, arched alcove vanity niche with fluted backplate, and champagne gold longline architectural pull handles.",
    specs: {
      "Finish": "High-Gloss Mirror Polyurethane & Alabaster Acrylic",
      "Alcove Feature": "Fluted Arch Vanity Niche with Hanging Gold Pendant",
      "Hardware": "Blum Clip-Top Soft-Close 110-Degree Hinges",
      "Execution Duration": "18 Days"
    }
  }
};

function initPortfolioModal() {
  const items = document.querySelectorAll('.portfolio-item');
  if (!items.length) return;

  let modalOverlay = document.querySelector('.portfolio-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'portfolio-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="portfolio-modal-card">
        <button class="portfolio-modal-close" aria-label="Close modal">&times;</button>
        <div class="portfolio-modal-body">
          <img src="" class="portfolio-modal-img" alt="Project Preview">
          <div class="portfolio-modal-info">
            <span class="modal-tag" id="modalTag">Category</span>
            <h2 id="modalTitle">Project Title</h2>
            <div class="modal-meta" id="modalMeta">
              <span><i class="fa-solid fa-location-dot"></i> City</span>
              <span><i class="fa-solid fa-ruler-combined"></i> Area</span>
            </div>
            <p class="modal-desc" id="modalDesc">Description</p>
            <ul class="modal-specs-list" id="modalSpecs"></ul>
            <div style="margin-top: auto; display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="contact.html" class="btn btn-primary btn-sm" style="flex: 1;">
                <i class="fa-solid fa-pen-ruler"></i> Request Similar Design
              </a>
              <a href="https://wa.me/917769881990?text=Hi%20Ma%20Aashapuri%20Interior,%20I%20am%20interested%20in%20your%20portfolio%20project." target="_blank" class="btn btn-outline btn-sm">
                <i class="fa-brands fa-whatsapp"></i> Inquire
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = modalOverlay.querySelector('.portfolio-modal-close');
  const modalImg = modalOverlay.querySelector('.portfolio-modal-img');
  const modalTag = modalOverlay.querySelector('#modalTag');
  const modalTitle = modalOverlay.querySelector('#modalTitle');
  const modalMeta = modalOverlay.querySelector('#modalMeta');
  const modalDesc = modalOverlay.querySelector('#modalDesc');
  const modalSpecs = modalOverlay.querySelector('#modalSpecs');

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  items.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const projectKey = item.dataset.project || item.dataset.category || 'living';
      const data = projectDetails[projectKey] || projectDetails[item.dataset.category] || projectDetails.living;

      const imgElement = item.querySelector('img');
      const imgSrc = imgElement ? imgElement.getAttribute('src') : data.image;

      modalImg.src = imgSrc;
      modalTag.textContent = data.category;
      modalTitle.textContent = data.title;
      modalMeta.innerHTML = `
        <span><i class="fa-solid fa-location-dot" style="color: var(--gold-primary);"></i> ${data.location}</span>
        <span><i class="fa-solid fa-ruler-combined" style="color: var(--gold-primary);"></i> ${data.area}</span>
      `;
      modalDesc.textContent = data.desc;

      modalSpecs.innerHTML = Object.entries(data.specs).map(([key, val]) => `
        <li>
          <span>${key}</span>
          <span>${val}</span>
        </li>
      `).join('');

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   7. CONSULTATION FORM & TOAST ALERTS
   ========================================================================== */
function initConsultationForm() {
  const forms = document.querySelectorAll('#consultationForm, .consultation-form');
  if (!forms.length) return;

  forms.forEach(form => {
    // Add file input feedback
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
          showToast(`📎 Blueprint file selected: ${fileInput.files[0].name}`, 'info');
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="client_name"]');
      const phoneInput = form.querySelector('[name="client_phone"]');

      const name = nameInput?.value.trim() || 'Guest';
      const phone = phoneInput?.value.trim() || '';

      if (!name || !phone) {
        showToast('⚠️ Please enter your Name and Mobile Number.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.innerHTML = '<span><i class="fa-solid fa-spinner fa-spin"></i> Analyzing Blueprint...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        showToast(`✨ Thank you ${name}! Your consultation request and blueprint have been received. Our Senior Architect will call you on ${phone}.`, 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 1200);
    });
  });
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ==========================================================================
   8. MATERIAL SWATCHES INTERACTION
   ========================================================================== */
function initMaterialSwatches() {
  const swatches = document.querySelectorAll('.wood-swatch-card');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });
}

/* ==========================================================================
   9. FAQ ACCORDION HANDLER
   ========================================================================== */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasActive = item?.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!wasActive && item) {
        item.classList.add('active');
      }
    });
  });
}

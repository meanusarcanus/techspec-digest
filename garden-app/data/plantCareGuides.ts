export interface AmazonProduct {
  name: string;
  category: string;
  price: string;
  rating: number;
  reviewsCount: number;
  searchQuery: string;
  badge?: string;
  image: string;
  description: string;
}

export interface PlantCareGuide {
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;
  family: string;
  category: 'Indoor Houseplants' | 'Ornamental & Flowering' | 'Edible Gardens & Herbs' | 'Succulents & Rare Tropicals';
  difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Plant Connoisseur';
  lightRequirement: 'Low Light Tolerant' | 'Bright Indirect' | 'Direct Sunlight / Full Sun';
  wateringNeed: 'Dry Out Completely' | 'Top 2 Inches Dry' | 'Consistently Moist';
  humidityRange: '30% - 50% (Standard)' | '50% - 70% (High)' | '70%+ (Greenhouse)';
  petSafe: boolean;
  heroImage: string;
  galleryImages: string[];
  shortHook: string;
  overview: string;
  likes: string[];
  dislikes: string[];
  howToGuide: {
    title: string;
    subtitle: string;
    steps: { stepNumber: number; title: string; instruction: string }[];
  };
  troubleshooting: {
    symptom: string;
    cause: string;
    remedy: string;
  }[];
  soilRecipe: {
    name: string;
    ingredients: string[];
    pHRange: string;
  };
  fertilizerProtocol: string;
  amazonProducts: AmazonProduct[];
}

export const PLANT_CARE_GUIDES: PlantCareGuide[] = [
  {
    id: "plant-01",
    slug: "monstera-deliciosa",
    commonName: "Monstera Deliciosa (Swiss Cheese Plant)",
    scientificName: "Monstera deliciosa Liebm.",
    family: "Araceae",
    category: "Indoor Houseplants",
    difficulty: "Beginner-Friendly",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Top 2 Inches Dry",
    humidityRange: "50% - 70% (High)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "The undisputed queen of indoor jungle foliage with iconic natural leaf fenestrations.",
    overview: "Native to the dense tropical rainforests of southern Mexico and Central America, Monstera deliciosa is a vigorous climbing epiphyte. In home environments, giving it vertical support and dappled sunlight rewards you with dramatic split leaves measuring over two feet wide.",
    likes: [
      "Bright, filtered morning sunlight near east or north-facing windows",
      "Sturdy bendable moss poles or cedar planks for aerial root climbing",
      "Chunky, airy aroid potting mixes containing orchid bark and perlite",
      "Wiping large leaves bi-weekly with damp microfiber cloth to remove dust",
      "Thorough deep drenches followed by complete pot drainage"
    ],
    dislikes: [
      "Standing in stagnant water saucers (leads quickly to Pythium root rot)",
      "Harsh direct midday summer sun that bleaches and scorches green chlorophyll",
      "Dense, suffocating garden soil or moisture-retaining heavy potting mixes",
      "Cold air blasts from air conditioning vents below 60°F (15°C)",
      "Bone-dry winter radiator heat without supplemental humidity"
    ],
    howToGuide: {
      title: "How to Encourage Giant Fenestrations & Air-Layer Propagate",
      subtitle: "Master the exact protocol for split leaves and stem cuttings",
      steps: [
        {
          stepNumber: 1,
          title: "Install Vertical Support",
          instruction: "Insert a damp coco-coir or sphagnum moss pole directly behind the main stem and secure the thickest vine with soft velcro plant ties. As aerial roots emerge, tuck them directly into the moss."
        },
        {
          stepNumber: 2,
          title: "Maximize Ambient Light",
          instruction: "Fenestrations are an evolutionary adaptation to allow sunlight to pass to lower leaves. Position your Monstera 3 to 5 feet from a large window delivering 500+ foot-candles of bright indirect light."
        },
        {
          stepNumber: 3,
          title: "Precision Water with Drainage Check",
          instruction: "Only water when a soil moisture meter reads 2 to 3 at root depth. Drench thoroughly until water streams out of the bottom drainage holes, discarding runoff after 15 minutes."
        },
        {
          stepNumber: 4,
          title: "Propagate via Node Cutting",
          instruction: "Locate an active growth node with an aerial root bump. Cut cleanly 1 inch below the node with sterilized bypass pruning shears. Place in filtered water with rooting hormone until roots reach 3 inches."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Yellowing lower leaves with soft brown mushy stems",
        cause: "Severe overwatering and root asphyxiation",
        remedy: "Unpot immediately, trim black mushy root tips with sterilized shears, spray root ball with 3% hydrogen peroxide, and repot into 50% orchid bark / 30% perlite / 20% peat mix."
      },
      {
        symptom: "Crispy brown edges and weeping leaf tips (guttation)",
        cause: "Low ambient humidity combined with irregular watering spikes",
        remedy: "Group with other tropical plants, place on a pebble humidity tray or run an ultrasonic cool mist humidifier targeting 60% relative humidity."
      },
      {
        symptom: "New leaves emerging solid green without any holes or slits",
        cause: "Insufficient light intensity or lack of vertical support",
        remedy: "Move closer to an east-facing window or install a full-spectrum LED clip-on grow light 18 inches above the canopy."
      }
    ],
    soilRecipe: {
      name: "The Ultimate Chunky Aroid Supermix",
      ingredients: [
        "40% Coarse New Zealand Orchid Bark",
        "25% Horticultural Perlite (#3 Grade)",
        "20% Coco Coir / Peat Moss",
        "10% Worm Castings (Organic Microbial Boost)",
        "5% Horticultural Charcoal (Toxin & Odor Filter)"
      ],
      pHRange: "5.5 - 6.5 (Slightly Acidic)"
    },
    fertilizerProtocol: "Feed monthly during spring and summer with a balanced 20-20-20 water-soluble fertilizer diluted to half strength, supplemented with organic seaweed kelp extract.",
    amazonProducts: [
      {
        name: "Bendable 42-Inch Coco Coir Moss Pole (2-Pack) with Plant Ties",
        category: "Climbing Support",
        price: "$18.99",
        rating: 4.8,
        reviewsCount: 3420,
        searchQuery: "Bendable+Coco+Coir+Moss+Pole+Monstera",
        badge: "Top Pick",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "Flexible natural coco fiber poles allow training your Monstera vertically for massive foliage growth."
      },
      {
        name: "3-in-1 Soil Moisture, Light & pH Plant Meter (No Battery Needed)",
        category: "Monitoring Gear",
        price: "$12.95",
        rating: 4.7,
        reviewsCount: 14850,
        searchQuery: "Soil+Moisture+Meter+Indoor+Plants",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Instantly check root-level moisture to prevent root rot and dial in perfect watering schedules."
      },
      {
        name: "Organic Chunky Aroid Potting Mix (4 Quarts Hand-Blended)",
        category: "Potting Substrate",
        price: "$22.50",
        rating: 4.9,
        reviewsCount: 1890,
        searchQuery: "Chunky+Aroid+Soil+Mix+Monstera+Philodendron",
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
        description: "Pine bark, pumice, and biochar engineered specifically for high oxygenation and fast drainage."
      }
    ]
  },
  {
    id: "plant-02",
    slug: "fiddle-leaf-fig",
    commonName: "Fiddle Leaf Fig (Ficus Lyrata)",
    scientificName: "Ficus lyrata Warb.",
    family: "Moraceae",
    category: "Indoor Houseplants",
    difficulty: "Intermediate",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Top 2 Inches Dry",
    humidityRange: "50% - 70% (High)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "The architectural statement plant prized for dramatic violin-shaped leathery leaves.",
    overview: "Originating in the lowland tropical rainforests of Western Africa, the Fiddle Leaf Fig is revered by interior designers worldwide. While notoriously sensitive to relocation, establishing a consistent watering and light routine rewards you with a lush indoor tree reaching up to 10 feet tall.",
    likes: [
      "Consistent location near an unobstructed south or east-facing window",
      "Wiping leaves monthly with organic neem leaf shine to prevent spider mites",
      "Rotating the pot 90 degrees every week for balanced 360-degree canopy growth",
      "Deep, thorough watering once soil dries halfway down the pot",
      "Warm ambient temperatures between 68°F and 85°F (20°C - 29°C)"
    ],
    dislikes: [
      "Frequent moving or changing rooms (triggers sudden leaf drop)",
      "Cold window drafts, heating vents, and air conditioners blowing on leaves",
      "Sitting in waterlogged saucers or pots lacking drainage holes",
      "Hard chlorinated municipal tap water (causes brown edema spots)",
      "Dust accumulation blocking photosynthesis on thick foliage"
    ],
    howToGuide: {
      title: "How to Stop Leaf Drop & Master the Ficus Watering Rhythm",
      subtitle: "The complete maintenance protocol for vibrant violin foliage",
      steps: [
        {
          stepNumber: 1,
          title: "Anchor in Permanent Bright Light",
          instruction: "Choose a sunlit spot within 3 feet of your brightest window where the plant can see the open sky. Avoid moving the pot once it acclimates."
        },
        {
          stepNumber: 2,
          title: "The Wooden Chopstick Test",
          instruction: "Insert a wooden skewer 4 inches into the root ball. Only water when the skewer emerges completely clean and dry without dark soil crumbs."
        },
        {
          stepNumber: 3,
          title: "Flush with Filtered Water",
          instruction: "Use room-temperature filtered water. Pour evenly around the base until 20% drains into the saucer, then promptly empty the saucer after 20 minutes."
        },
        {
          stepNumber: 4,
          title: "Notching for Branching",
          instruction: "To stimulate lateral branch growth, make a tiny 1/8-inch horizontal cut with a sterile razor just above a leaf node along the main trunk in early spring."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Reddish-brown tiny speckles on brand new unfurling leaves",
        cause: "Edema: Irregular cellular water pressure during leaf formation",
        remedy: "Harmonize watering schedule so soil never fluctuates between bone-dry and drowning; the speckles will fade as the leaf matures."
      },
      {
        symptom: "Large dark brown patches starting in leaf centers and dropping leaves",
        cause: "Root rot from soggy soil or poor drainage",
        remedy: "Ease off watering immediately, check pot drainage, aerate soil with a chopstick, and treat soil with organic bio-fungicide."
      },
      {
        symptom: "Crispy tan edges on bottom leaves curling inward",
        cause: "Under-watering or severely low indoor humidity",
        remedy: "Give a deep thorough soak, mist or run a cool mist humidifier, and keep away from heating ducts."
      }
    ],
    soilRecipe: {
      name: "Fast-Draining Ficus Tree Blend",
      ingredients: [
        "50% Premium Organic Potting Soil",
        "25% Coarse Perlite",
        "15% Pine Bark Fines",
        "10% Horticultural Sand & Pumice"
      ],
      pHRange: "6.0 - 7.0 (Neutral to Slight Acidic)"
    },
    fertilizerProtocol: "Apply high-nitrogen 3-1-2 liquid Fiddle Leaf Fig fertilizer every other watering from March through September.",
    amazonProducts: [
      {
        name: "Premium Fiddle Leaf Fig Tree Slow-Release & Liquid Fertilizer (3-1-2)",
        category: "Plant Nutrition",
        price: "$16.99",
        rating: 4.8,
        reviewsCount: 8200,
        searchQuery: "Fiddle+Leaf+Fig+Plant+Food+Fertilizer",
        badge: "Top Choice",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Specialized NPK 3-1-2 nutrient ratio prevents brown spotting and promotes thick glossy green leaves."
      },
      {
        name: "10-Inch Mid-Century Modern Ceramic Planter with Acacia Wood Stand",
        category: "Pots & Planters",
        price: "$44.99",
        rating: 4.9,
        reviewsCount: 4120,
        searchQuery: "Ceramic+Planter+Pot+Wood+Stand+Indoor+Plants",
        badge: "Designer Pick",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Heavyweight ceramic pot with built-in drainage hole and silicone plug on solid wood riser."
      },
      {
        name: "Cold-Pressed Organic Neem Oil Leaf Shine & Pest Shield Spray (16 oz)",
        category: "Pest Defense",
        price: "$14.50",
        rating: 4.7,
        reviewsCount: 5600,
        searchQuery: "Organic+Cold+Pressed+Neem+Oil+Plant+Spray",
        badge: "Organic",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
        description: "Natural organic cold-pressed formula keeps broad leaves spotless, shiny, and immune to mites."
      }
    ]
  },
  {
    id: "plant-03",
    slug: "calathea-orbifolia",
    commonName: "Calathea Orbifolia (Prayer Plant)",
    scientificName: "Goeppertia orbifolia (Linden) Borchs. & S.Suárez",
    family: "Marantaceae",
    category: "Indoor Houseplants",
    difficulty: "Plant Connoisseur",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Consistently Moist",
    humidityRange: "70%+ (Greenhouse)",
    petSafe: true,
    heroImage: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Stunning silver-striped circular foliage that gracefully folds upward at night in prayer.",
    overview: "Hailing from the lush tropical understory of Bolivia and Brazil, Calathea orbifolia is famous for its oversized round leaves painted with metallic silver-green brushstrokes. 100% non-toxic and pet-safe, it is the crown jewel for collectors who can provide steady moisture and pure water.",
    likes: [
      "Distilled, reverse-osmosis, or collected rainwater exclusively",
      "Consistent relative humidity levels maintained between 60% and 75%",
      "Soft, filtered morning light mimicking deep rainforest shade",
      "Evenly moist, fluffy peat and perlite substrate that never dries out fully",
      "Temperatures steadily between 65°F and 80°F (18°C - 27°C)"
    ],
    dislikes: [
      "Chlorinated tap water, fluoride, and hard mineral salts (cause instant leaf tip crisping)",
      "Allowing the soil to dry out completely into a hard compact brick",
      "Direct afternoon sun rays that bleach delicate silver leaf patterns",
      "Dry forced-air heating and drafty windows in winter",
      "Heavy chemical leaf shine sprays (clogs delicate stomata)"
    ],
    howToGuide: {
      title: "How to Keep Calathea Leaves Crisp-Free & Lush",
      subtitle: "The mineral-free hydration and humidity protocol",
      steps: [
        {
          stepNumber: 1,
          title: "Switch to Pure Distilled Water",
          instruction: "Never use municipal tap water. Calathea leaves cannot process chlorine, fluorine, and hard carbonates, which deposit along leaf margins causing brown crispy edges."
        },
        {
          stepNumber: 2,
          title: "Maintain Micro-Climate Humidity",
          instruction: "Place your Calathea near an ultrasonic cool-mist humidifier set to 65% RH, or position it inside an indoor botanical cabinet with gentle air circulation."
        },
        {
          stepNumber: 3,
          title: "Touch-Test Soil Moisture",
          instruction: "Water whenever the top 1/2 inch of soil feels barely dry to the touch. The goal is a damp, wrung-out sponge consistency throughout the root zone."
        },
        {
          stepNumber: 4,
          title: "Gentle Division at Repotting",
          instruction: "Propagate by gently separating root rhizomes during spring repotting. Ensure each division possesses healthy tuberous roots and at least 3 active stems."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Crispy brown outer leaf margins and curling foliage",
        cause: "Low humidity or high mineral content in tap water",
        remedy: "Flush soil with 1 gallon of distilled water, increase room humidity above 60%, and trim dead brown edges with sharp shears following leaf contours."
      },
      {
        symptom: "Faded, washed-out silver stripes with leaf curling",
        cause: "Too much direct sunlight breaking down delicate leaf pigments",
        remedy: "Move 4 feet back from south/west windows into gentle north or east exposure."
      },
      {
        symptom: "Leaves staying down at night and not folding in prayer",
        cause: "Plant is stressed by extreme drought, pest pressure, or root damage",
        remedy: "Check for spider mites on leaf undersides, hydrate thoroughly, and ensure temperature stays above 65°F."
      }
    ],
    soilRecipe: {
      name: "Moisture-Retentive Calathea Fluff",
      ingredients: [
        "50% Coco Coir & Canadian Peat Moss",
        "25% Horticultural Perlite",
        "15% Worm Castings",
        "10% Small Orchid Bark Fines"
      ],
      pHRange: "6.0 - 6.5"
    },
    fertilizerProtocol: "Feed monthly in active spring/summer with gentle organic fish & seaweed liquid fertilizer diluted to 1/4 strength.",
    amazonProducts: [
      {
        name: "Ultrasonic 4.5L Cool Mist Botanical Humidifier with Smart Auto-Humidity Sensor",
        category: "Humidity Gear",
        price: "$39.99",
        rating: 4.8,
        reviewsCount: 11200,
        searchQuery: "Ultrasonic+Cool+Mist+Humidifier+Plants",
        badge: "Must-Have",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Whisper-quiet top-fill humidifier maintains steady 65% RH to eliminate brown leaf edges."
      },
      {
        name: "ZeroWater 10-Cup 5-Stage Water Filter Pitcher (TDS Meter Included)",
        category: "Water Purification",
        price: "$34.99",
        rating: 4.7,
        reviewsCount: 28400,
        searchQuery: "ZeroWater+Filter+Pitcher+Plants",
        badge: "Pro Water",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
        description: "Removes 99.6% of dissolved minerals, fluoride, and chlorine for pristine Calathea hydration."
      },
      {
        name: "Self-Watering 8-Inch Indoor Planter with Deep Reservoir & Water Level Indicator",
        category: "Pots & Planters",
        price: "$19.99",
        rating: 4.9,
        reviewsCount: 4890,
        searchQuery: "Self+Watering+Planter+Pot+Indoor+Plants",
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Sub-irrigation wicks water evenly from bottom up, ensuring continuous moist soil without root rot."
      }
    ]
  },
  {
    id: "plant-04",
    slug: "snake-plant-sansevieria",
    commonName: "Snake Plant / Mother-in-Law's Tongue",
    scientificName: "Dracaena trifasciata (Prain) Mabb.",
    family: "Asparagaceae",
    category: "Indoor Houseplants",
    difficulty: "Beginner-Friendly",
    lightRequirement: "Low Light Tolerant",
    wateringNeed: "Dry Out Completely",
    humidityRange: "30% - 50% (Standard)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Indestructible architectural air-purifier that thrives on neglect and cleanses indoor air.",
    overview: "Native to tropical West Africa, the Snake Plant is celebrated as one of the hardiest houseplants on earth. It utilizes Crassulacean Acid Metabolism (CAM) to release oxygen at night while tolerating dim corners, erratic watering, and dry indoor air with effortless elegance.",
    likes: [
      "Being ignored for weeks between watering sessions",
      "Snug, tight terracotta pots that allow fast root dry-out",
      "Coarse gritty succulent soil with pumice and perlite",
      "Any lighting from dim bedroom corners to sunny patio spots",
      "Dry room air with zero special humidity requirements"
    ],
    dislikes: [
      "Frequent watering (the #1 killer of snake plants)",
      "Pouring water directly into the center rosette crown (causes rot)",
      "Pots without bottom drainage holes",
      "Freezing temperatures below 50°F (10°C)",
      "Dense clay or peat-heavy soils that hold moisture"
    ],
    howToGuide: {
      title: "How to Water and Propagate Snake Plants Like a Master",
      subtitle: "The ultimate low-maintenance guide to multiplying your collection",
      steps: [
        {
          stepNumber: 1,
          title: "The Zero-Water Rule in Winter",
          instruction: "During winter dormancy, water your Snake Plant only once every 6 to 8 weeks. In warm summer months, water every 3 to 4 weeks once soil is bone dry."
        },
        {
          stepNumber: 2,
          title: "Bottom Watering Method",
          instruction: "Place your pot into a shallow basin with 2 inches of water for 30 minutes. Let capillary action draw moisture from bottom to top, keeping the center rosette completely dry."
        },
        {
          stepNumber: 3,
          title: "Leaf Cutting Propagation",
          instruction: "Cut a mature healthy sword leaf into 3-inch horizontal segments with sterile shears. Let cuttings callous over for 24 hours in shade."
        },
        {
          stepNumber: 4,
          title: "Rooting in Perlite or Water",
          instruction: "Insert calloused cuttings notch-down into damp perlite or 1 inch of water. Roots and new baby pups will emerge within 4 to 6 weeks."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Mushy, slimy, foul-smelling yellow leaves falling over",
        cause: "Bacterial soft rot from overwatering",
        remedy: "Cut away all mushy leaves at soil level, remove plant from soil, cut rotten rhizomes, dust with cinnamon or charcoal, and repot in dry succulent grit."
      },
      {
        symptom: "Wrinkled, puckered, puckered sword blades leaning sideways",
        cause: "Severe prolonged dehydration",
        remedy: "Give a full thorough bottom-soak for 45 minutes; leaves will plump up and firm within 48 hours."
      },
      {
        symptom: "Pale leaves with loss of variegated yellow borders",
        cause: "Low light duration over many months or leaf cuttings lacking original mutation",
        remedy: "Move to brighter location; propagate by rhizome division to preserve yellow variegated stripes."
      }
    ],
    soilRecipe: {
      name: "Desert Grit & Succulent Matrix",
      ingredients: [
        "40% Coarse Pumice / Perlite",
        "30% Bonsai Gritty Mix / Decomposed Granite",
        "20% Organic Cactus Soil",
        "10% Horticultural Charcoal"
      ],
      pHRange: "6.0 - 7.5"
    },
    fertilizerProtocol: "Feed only twice a year in spring and mid-summer with a cactus/succulent fertilizer at 1/2 strength.",
    amazonProducts: [
      {
        name: "Heavy-Duty Unfinished Italian Terracotta Pot (8-Inch) with Saucer",
        category: "Planters",
        price: "$21.99",
        rating: 4.8,
        reviewsCount: 3890,
        searchQuery: "Italian+Terracotta+Pot+Saucer+Indoor+Plant",
        badge: "Porous Pro",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Natural breathable clay evaporates excess moisture quickly to guarantee zero root rot."
      },
      {
        name: "Professional High-Carbon Steel Bypass Pruning Shears (Japanese Blade)",
        category: "Tools",
        price: "$24.95",
        rating: 4.9,
        reviewsCount: 16500,
        searchQuery: "Japanese+High+Carbon+Steel+Pruning+Shears",
        badge: "Top Tool",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
        description: "Razor-sharp Japanese SK5 carbon steel blades make clean surgical cuts for propagation and pruning."
      },
      {
        name: "Organic Fast-Draining Succulent & Cactus Gritty Bonsai Blend (2 Quarts)",
        category: "Substrate",
        price: "$18.50",
        rating: 4.9,
        reviewsCount: 2750,
        searchQuery: "Gritty+Succulent+Cactus+Soil+Mix+Pumice",
        badge: "Ultra Grit",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "Pre-mixed pumice, turface, and pine bark prevents moisture buildup and compact root choking."
      }
    ]
  },
  {
    id: "plant-05",
    slug: "heirloom-tomato",
    commonName: "Heirloom Brandywine Tomato",
    scientificName: "Solanum lycopersicum 'Brandywine'",
    family: "Solanaceae",
    category: "Edible Gardens & Herbs",
    difficulty: "Intermediate",
    lightRequirement: "Direct Sunlight / Full Sun",
    wateringNeed: "Consistently Moist",
    humidityRange: "50% - 70% (High)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "The legendary pink heirloom tomato renowned for deep, complex, wine-like gourmet flavor.",
    overview: "Prized since the late 19th century, Amish heirloom Brandywine tomatoes produce immense 1-pound beefsteak fruits with rich old-fashioned tomato flavor. Thriving in raised beds, fabric grow bags, or sunny backyard gardens, they reward dedicated pruning with bountiful summer harvests.",
    likes: [
      "6 to 8+ hours of direct unfiltered summer sunlight daily",
      "Deep, rich compost and worm-casting amended living soil",
      "Consistent morning drip irrigation at soil level (never wetting foliage)",
      "Sturdy heavy-duty tomato cages or vertical trellis support strings",
      "Calcium-rich organic bone meal and tomato-tone fertilization"
    ],
    dislikes: [
      "Overhead sprinkler watering that splashes soil fungi onto leaves (causes early blight)",
      "Irregular, fluctuating watering that causes blossom end rot and fruit splitting",
      "Crowded spacing with poor air circulation between vines",
      "Cool nighttime temperatures below 55°F (13°C) during fruit set",
      "High synthetic chemical nitrogen that produces massive leaves but zero flowers"
    ],
    howToGuide: {
      title: "How to Prune Suckers & Prevent Blossom End Rot",
      subtitle: "The master gardener protocol for 1-lb beefsteak harvests",
      steps: [
        {
          stepNumber: 1,
          title: "Deep Planting Technique",
          instruction: "When transplanting seedlings, bury the stem deep, leaving only the top two sets of leaves. The buried stem will sprout thousands of adventitious roots, creating a powerhouse root system."
        },
        {
          stepNumber: 2,
          title: "Prune Bottom 12 Inches & Suckers",
          instruction: "Remove all lower leaves touching the ground to stop soil-borne fungal spores. Pinch out intermediate sucker shoots growing in the 45-degree crotch between stem and branch."
        },
        {
          stepNumber: 3,
          title: "Add Calcium & Organic Mulch",
          instruction: "Add 1 cup of gypsum or bone meal to the planting hole. Apply 3 inches of clean straw or shredded wood mulch over soil to lock in moisture and regulate soil temperature."
        },
        {
          stepNumber: 4,
          title: "Consistent Morning Deep Drip",
          instruction: "Water deeply 3 times per week at dawn with drip irrigation or soaker hoses. Avoid late evening watering to keep the canopy bone-dry overnight."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Black sunken leathery spots on the bottom base of green tomatoes",
        cause: "Blossom End Rot caused by calcium deficiency and uneven watering",
        remedy: "Water consistently so soil never dries out, test soil pH (aim for 6.5), and apply organic liquid calcium foliar spray."
      },
      {
        symptom: "Yellowing lower leaves with dark target-ring bullseye spots",
        cause: "Early Blight (Alternaria solani fungal infection)",
        remedy: "Prune off infected foliage with sterile shears, apply organic copper fungicide spray in morning, and mulch soil immediately."
      },
      {
        symptom: "Ripe tomatoes splitting and cracking across top shoulders",
        cause: "Heavy sudden rainstorm after dry spell causing rapid fruit expansion",
        remedy: "Pick tomatoes as soon as they reach 'breaker stage' (half-pink) and let them ripen on the kitchen counter at room temperature."
      }
    ],
    soilRecipe: {
      name: "Organic Raised Bed Living Super-Soil",
      ingredients: [
        "40% Organic Aged Mushroom & Cow Compost",
        "30% Coco Coir / Peat Moss",
        "20% Coarse Perlite / Rice Hulls",
        "10% Worm Castings + Kelp Meal & Bone Meal"
      ],
      pHRange: "6.2 - 6.8"
    },
    fertilizerProtocol: "Feed bi-weekly with organic Tomato-Tone (NPK 3-4-6) combined with liquid kelp and fish emulsion from first flower set through harvest.",
    amazonProducts: [
      {
        name: "Heavy-Duty Galvanized Steel Folding Tomato Cages (4-Pack, 58-Inch)",
        category: "Trellising",
        price: "$49.99",
        rating: 4.8,
        reviewsCount: 5200,
        searchQuery: "Heavy+Duty+Steel+Tomato+Cages+Garden",
        badge: "Heavy Duty",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "Sturdy square steel cages support 20+ lbs of heavy heirloom beefsteak clusters without bending."
      },
      {
        name: "Espoma Organic Tomato-Tone Organic Fertilizer 8 lb (NPK 3-4-6 + Calcium)",
        category: "Fertilizer",
        price: "$21.99",
        rating: 4.9,
        reviewsCount: 14200,
        searchQuery: "Espoma+Organic+Tomato+Tone+Fertilizer",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "All-natural formulation with 8% calcium to prevent blossom end rot and maximize fruit sugar Brix."
      },
      {
        name: "Automatic Drip Irrigation Kit with 1/4-inch Tubing and Adjustable Emitters",
        category: "Irrigation",
        price: "$29.99",
        rating: 4.7,
        reviewsCount: 7800,
        searchQuery: "Drip+Irrigation+Kit+Garden+Raised+Bed",
        badge: "Pro Choice",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
        description: "Delivers precision water directly to plant roots, saving 70% water and eliminating leaf blight."
      }
    ]
  },
  {
    id: "plant-06",
    slug: "japanese-maple",
    commonName: "Japanese Maple (Acer Palmatum)",
    scientificName: "Acer palmatum Thunb.",
    family: "Sapindaceae",
    category: "Ornamental & Flowering",
    difficulty: "Intermediate",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Top 2 Inches Dry",
    humidityRange: "50% - 70% (High)",
    petSafe: true,
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "The quintessential zen tree offering breathtaking cascading scarlet and crimson lace foliage.",
    overview: "Treasured across Asian horticulture for centuries, Japanese Maples are iconic ornamental centerpiece trees. Whether grown in garden landscapes, zen courtyard containers, or trained as miniature bonsai, their graceful tiered branches and fiery autumn transformations inspire tranquility.",
    likes: [
      "Dappled morning sunlight and afternoon shade in hot climates",
      "Rich, acidic, humus-rich soil with superior drainage",
      "Layer of pine needle or bark mulch over the shallow root zone",
      "Protection from strong drying winter winds and scorching summer heat",
      "Pruning during winter dormancy to reveal architectural branching structure"
    ],
    dislikes: [
      "Intense full afternoon sun that crisps delicate laceleaf margins (leaf scorch)",
      "Heavy alkaline waterlogged clay soils with zero aeration",
      "Deep planting (covering the root flare causes trunk decay)",
      "High chemical nitrogen fertilizers that produce weak, floppy leggy growth",
      "Excessive summer pruning when sap flow is high"
    ],
    howToGuide: {
      title: "How to Prune Japanese Maples for Zen Architectural Flow",
      subtitle: "Winter shaping and container cultivation masterclass",
      steps: [
        {
          stepNumber: 1,
          title: "Choose the Perfect Micro-Climate",
          instruction: "Plant under the high canopy of mature deciduous trees or on the east side of a home where it receives morning sun and shelter from harsh western heat."
        },
        {
          stepNumber: 2,
          title: "Protect the Shallow Root Flare",
          instruction: "Plant with the root flare sitting 1 inch above the surrounding soil grade. Apply a 2-inch layer of organic pine bark mulch, keeping 3 inches away from the trunk."
        },
        {
          stepNumber: 3,
          title: "Winter Structural Pruning",
          instruction: "In late winter while dormant, use bypass shears to remove crossing branches, dead wood, and downward vertical growth to create open layered horizontal tiers."
        },
        {
          stepNumber: 4,
          title: "Container Cultivation Setup",
          instruction: "For patio pots, use a frost-proof glazed ceramic planter with large drainage holes filled with 60% potting soil and 40% pine bark grit."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Crispy, curled, dry leaf tips in midsummer",
        cause: "Leaf Scorch from intense wind, hot afternoon sun, or dry soil",
        remedy: "Provide afternoon shade cloth, keep root zone consistently mulched, and deep soak once weekly."
      },
      {
        symptom: "Branches dying back suddenly from tips with black bark streaks",
        cause: "Verticillium Wilt or bacterial blight",
        remedy: "Prune infected branches 6 inches into healthy wood with sterilized shears between cuts, and improve soil drainage."
      },
      {
        symptom: "Faded green summer leaves that fail to turn red in autumn",
        cause: "Excessive shade or excessive nitrogen fertilization",
        remedy: "Move to dappled sun exposure and switch to a low-nitrogen autumn fertilizer formula."
      }
    ],
    soilRecipe: {
      name: "Acidic Japanese Garden Mix",
      ingredients: [
        "40% Aged Pine Bark Fines / Acid Compost",
        "30% High-Grade Topsoil",
        "20% Coarse Pumice / Perlite",
        "10% Peat Moss + Elemental Sulfur"
      ],
      pHRange: "5.5 - 6.5 (Acidic)"
    },
    fertilizerProtocol: "Apply organic slow-release acid-loving plant food (like Holly-Tone) once in early spring as buds swell.",
    amazonProducts: [
      {
        name: "Japanese Bonsai & Precision Branch Pruning Concave Cutters (SK5 Steel)",
        category: "Bonsai Tools",
        price: "$32.99",
        rating: 4.9,
        reviewsCount: 3100,
        searchQuery: "Japanese+Concave+Branch+Cutter+Pruning+Bonsai",
        badge: "Artisan",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "Creates clean spherical cuts that heal flush with tree bark without leaving unsightly scars."
      },
      {
        name: "Espoma Organic Holly-Tone Acid-Loving Plant Fertilizer 4 lb (NPK 4-3-4)",
        category: "Plant Nutrition",
        price: "$16.50",
        rating: 4.8,
        reviewsCount: 9800,
        searchQuery: "Espoma+Holly+Tone+Organic+Fertilizer",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Formulated with elemental sulfur and Bio-tone microbes for vibrant crimson foliage and healthy roots."
      },
      {
        name: "Heavy-Duty Frost-Proof 16-Inch Glazed Ceramic Bonsai & Garden Planter",
        category: "Pots",
        price: "$68.00",
        rating: 4.9,
        reviewsCount: 1420,
        searchQuery: "Glazed+Ceramic+Bonsai+Planter+Pot+Outdoor",
        badge: "Premium",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "High-fired glazed ceramic resists winter frost cracking while insulating delicate root systems."
      }
    ]
  }
,
  {
    id: "plant-07",
    slug: "sweet-basil-culinary",
    commonName: "Genovese Sweet Basil",
    scientificName: "Ocimum basilicum 'Genovese'",
    family: "Lamiaceae",
    category: "Edible Gardens & Herbs",
    difficulty: "Beginner-Friendly",
    lightRequirement: "Direct Sunlight / Full Sun",
    wateringNeed: "Consistently Moist",
    humidityRange: "50% - 70% (High)",
    petSafe: true,
    heroImage: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "The ultimate aromatic kitchen herb for homemade pesto, culinary pizzas, and companion pest deterrence.",
    overview: "Prized across Italian gastronomy, Genovese sweet basil is renowned for its intoxicating fragrance and tender spicy-sweet leaves. Easy to grow in sunny windowsills or raised beds, frequent top pruning turns a single plant into a prolific bushy hedge.",
    likes: [
      "6 to 8 hours of direct sunshine daily",
      "Frequent pinching of the top growing tips to trigger bushiness",
      "Warm ambient temperatures between 70°F and 85°F (21°C - 29°C)",
      "Bottom watering or drip irrigation keeping foliage dry",
      "Harvesting early in the morning when essential oils are peak"
    ],
    dislikes: [
      "Letting flowers bloom (causes leaves to turn bitter and woody)",
      "Cold temperatures below 50°F (10°C) which turn leaves black",
      "Wet soggy soil with poor drainage causing damping-off fungus",
      "Spraying water on leaves in dim light (invites downy mildew)",
      "Harvesting bottom leaves first instead of pruning top crowns"
    ],
    howToGuide: {
      title: "How to Prune Basil for Infinite Summer Bushiness",
      subtitle: "The 4-leaf node pinching technique and water rooting",
      steps: [
        {
          stepNumber: 1,
          title: "The First Pinch at 6 Inches",
          instruction: "When seedlings reach 6 inches tall with 3 sets of true leaves, use clean kitchen shears to snip the center top stem right above the second leaf pair. Two new lateral branches will shoot out."
        },
        {
          stepNumber: 2,
          title: "Continuous Flower Snapping",
          instruction: "Inspect basil crowns weekly. Snap off any emerging flower spikes immediately so the plant channels all its hormonal energy into aromatic essential oils rather than seed production."
        },
        {
          stepNumber: 3,
          title: "Rooting Stem Cuttings in Water",
          instruction: "Take 4-inch stem cuttings, strip bottom leaves, and place in a mason jar on a warm windowsill. Roots appear in 5 days for endless free basil plants."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Yellowing leaves with dirty grey-purple fuzzy spores on undersides",
        cause: "Basil Downy Mildew (Peronospora belbahrii)",
        remedy: "Destroy infected leaves, increase airflow with an oscillating fan, and keep leaves bone dry."
      },
      {
        symptom: "Wilting during midday heat despite wet soil",
        cause: "Fusarium wilt or root rot from compact anaerobic soil",
        remedy: "Repot in fast-draining perlite-rich herb soil and move to morning-only direct sun."
      }
    ],
    soilRecipe: {
      name: "Mediterranean Herb Potting Mix",
      ingredients: ["50% Organic Potting Soil", "30% Perlite / Pumice", "20% Worm Castings + Crushed Oyster Shells"],
      pHRange: "6.0 - 7.0"
    },
    fertilizerProtocol: "Feed every 2 weeks with organic liquid fish and kelp fertilizer at half strength.",
    amazonProducts: [
      {
        name: "Herb Snips & Kitchen Herb Leaf Stripper Shear Set",
        category: "Kitchen Tools",
        price: "$13.99",
        rating: 4.8,
        reviewsCount: 6500,
        searchQuery: "Herb+Snips+Kitchen+Pruning+Shears",
        badge: "Kitchen Pick",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "5-blade herb scissors quickly cut and garnish fresh basil and herbs in seconds."
      },
      {
        name: "Self-Watering Indoor Herb Garden Planter Window Box",
        category: "Planters",
        price: "$27.99",
        rating: 4.7,
        reviewsCount: 3890,
        searchQuery: "Self+Watering+Herb+Planter+Window+Box",
        badge: "Top Pick",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Fits neatly on kitchen windowsills with sub-irrigation wick system for constant fresh herbs."
      }
    ]
  },
  {
    id: "plant-08",
    slug: "phalaenopsis-orchid",
    commonName: "Phalaenopsis Moth Orchid",
    scientificName: "Phalaenopsis Blume",
    family: "Orchidaceae",
    category: "Ornamental & Flowering",
    difficulty: "Beginner-Friendly",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Top 2 Inches Dry",
    humidityRange: "50% - 70% (High)",
    petSafe: true,
    heroImage: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Exotic long-lasting moth blossoms that bloom continuously for up to three months indoors.",
    overview: "Naturally growing as an epiphyte perched on tropical tree trunks across Southeast Asia, the Moth Orchid is surprisingly easy to maintain indoors. With roots adapted to absorb moisture from the air, proper orchid bark and a monthly soaking routine produce breathtaking cascading blooms year after year.",
    likes: [
      "Chunky New Zealand sphagnum moss or fir orchid bark (never potting soil!)",
      "Clear slotted orchid pots that allow roots to photosynthesize",
      "Submerging the entire pot in tepid water for 15 minutes weekly",
      "Gentle east-facing morning light or bright northern windows",
      "A 10-degree night temperature drop in autumn to trigger flower spikes"
    ],
    dislikes: [
      "The 'ice cube myth' (freezing ice shocks tropical orchid roots and damages cells)",
      "Water trapped inside the center crown (causes crown rot overnight)",
      "Direct scorching midday sun that leaves bleached yellow sunburn blisters",
      "Suffocating roots in dense potting soil or standing in water saucers",
      "Dry radiator air below 40% humidity"
    ],
    howToGuide: {
      title: "How to Rebloom Moth Orchids Year After Year",
      subtitle: "The temperature spike and weekly soaking technique",
      steps: [
        {
          stepNumber: 1,
          title: "The 15-Minute Weekly Soak",
          instruction: "Fill a bowl with lukewarm water and submerge the clear orchid pot up to the rim for 15 minutes. Watch the roots transform from silvery-gray to vibrant emerald green."
        },
        {
          stepNumber: 2,
          title: "Drain Completely & Wipe Crown",
          instruction: "Lift pot, allow all excess water to drain out completely, and dab any stray water droplets out of the center leaf crown with a clean tissue."
        },
        {
          stepNumber: 3,
          title: "Triggering Autumn Bloom Spikes",
          instruction: "In autumn, expose the orchid to nighttime temperatures around 60°F (15°C) for 3 weeks. The temperature drop triggers a fresh green flower spike from between lower leaves."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Silvery gray shriveled roots and limp leathery leaves",
        cause: "Dehydration from infrequent watering or old broken-down bark",
        remedy: "Give a 20-minute lukewarm soak, mist aerial roots, and repot in fresh airy orchid bark."
      },
      {
        symptom: "Yellowing leaves falling from the center crown with black mush",
        cause: "Crown Rot from water sitting inside the top leaf crease",
        remedy: "Dry immediately with cotton swab, pour 3% hydrogen peroxide into crown, and keep water away from crown."
      }
    ],
    soilRecipe: {
      name: "Premium Epiphytic Orchid Bark",
      ingredients: ["70% New Zealand Pinus Radiata Bark", "20% Long-Fiber Sphagnum Moss", "10% Horticultural Charcoal & Sponge Rock"],
      pHRange: "5.5 - 6.5"
    },
    fertilizerProtocol: "Feed 'weakly, weekly' with balanced 20-20-20 orchid fertilizer diluted to 1/4 strength, skipping every 4th watering to flush salts.",
    amazonProducts: [
      {
        name: "Better-Gro Special Orchid Mix & Chunky Fir Bark (4 Quarts)",
        category: "Substrate",
        price: "$11.99",
        rating: 4.8,
        reviewsCount: 12500,
        searchQuery: "Better+Gro+Special+Orchid+Bark+Mix",
        badge: "Orchid Pro",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Western fir bark, hardwood charcoal, and coarse perlite promotes fast root aeration."
      },
      {
        name: "Clear Slotted Orchid Pots with Drainage Holes (5-Pack with Saucers)",
        category: "Pots",
        price: "$16.99",
        rating: 4.9,
        reviewsCount: 4200,
        searchQuery: "Clear+Slotted+Orchid+Pots+Plastic",
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Allows sunlight to reach root systems and lets you visually inspect root moisture levels."
      }
    ]
  },
  {
    id: "plant-09",
    slug: "string-of-pearls",
    commonName: "String of Pearls (Curio Rowleyanus)",
    scientificName: "Curio rowleyanus (H.Jacobsen) P.V.Heath",
    family: "Asteraceae",
    category: "Succulents & Rare Tropicals",
    difficulty: "Intermediate",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Dry Out Completely",
    humidityRange: "30% - 50% (Standard)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Whimsical cascading succulent featuring succulent green pearls that spill over hanging baskets.",
    overview: "Native to dry arid cliffs of southwest Africa, String of Pearls stores water in tiny spherical bead-like leaves equipped with a translucent epidermal window slit that channels light deep into the leaf. Cascading gracefully over shelves, it is an eye-catching collector succulent.",
    likes: [
      "Bright indirect sunlight hitting the TOP of the pot crown directly",
      "Shallow terracotta hanging pots with quick drainage",
      "Gritty mineral-rich cactus soil with 60% pumice and grit",
      "Bottom-soak watering only when pearls begin to pucker and soften",
      "Good gentle room ventilation"
    ],
    dislikes: [
      "Watering from the top over the delicate pearl crown (triggers stem rot)",
      "Dark hanging spots where the top of the pot receives zero direct light",
      "Deep heavy plastic pots that hold soggy soil for weeks",
      "Overwatering while pearls are still plump and translucent",
      "Frost and cold drafts below 50°F (10°C)"
    ],
    howToGuide: {
      title: "How to Keep String of Pearls Thick, Lush & Rot-Free",
      subtitle: "The top-lighting and epidermal window watering guide",
      steps: [
        {
          stepNumber: 1,
          title: "Light the Top of the Pot",
          instruction: "Hang or place your pot where sunlight hits the soil surface directly. If only the trailing strings receive light while the pot top is in shade, the crown will thin out and rot."
        },
        {
          stepNumber: 2,
          title: "Read the Epidermal Window",
          instruction: "Look at the dark green translucent slit on each pearl. When well-watered, the slit is narrow and the pearl is round. When the slit widens and pearls feel soft, it is time to bottom water."
        },
        {
          stepNumber: 3,
          title: "Coil Cuttings on Soil to Thicken",
          instruction: "To create a fuller basket, take trailing strands and coil them directly across bare soil on top of the pot, securing with bobby pins. Roots sprout from every node within 14 days."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Mushy brown translucent pearls popping like jelly",
        cause: "Overwatering and crown rot",
        remedy: "Stop watering immediately, cut away rotten strands, and take healthy green cuttings to reroot in dry gritty soil."
      },
      {
        symptom: "Shriveled, wrinkled, deflated pearls",
        cause: "Under-watering or dried-out root hairs",
        remedy: "Bottom-soak the pot in 2 inches of water for 30 minutes; pearls will plump up firm in 24 hours."
      }
    ],
    soilRecipe: {
      name: "Gritty Succulent Hanging Mix",
      ingredients: ["50% Coarse Pumice / Turface", "30% Cactus Potting Soil", "20% Coarse Perlite"],
      pHRange: "6.0 - 7.0"
    },
    fertilizerProtocol: "Feed twice during spring and summer with succulent fertilizer diluted to 1/4 strength.",
    amazonProducts: [
      {
        name: "Boho Macrame Hanging Planter Basket with 7-Inch Terracotta Pot",
        category: "Hanging Pots",
        price: "$22.99",
        rating: 4.8,
        reviewsCount: 7100,
        searchQuery: "Macrame+Hanging+Planter+Terracotta+Pot",
        badge: "Boho Pick",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Handwoven natural cotton macrame holder displays cascading pearl vines gracefully near windows."
      }
    ]
  },
  {
    id: "plant-10",
    slug: "meyer-lemon-tree",
    commonName: "Improved Meyer Lemon Citrus Tree",
    scientificName: "Citrus x meyeri",
    family: "Rutaceae",
    category: "Edible Gardens & Herbs",
    difficulty: "Intermediate",
    lightRequirement: "Direct Sunlight / Full Sun",
    wateringNeed: "Top 2 Inches Dry",
    humidityRange: "50% - 70% (High)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Sweet, juicy culinary citrus with heavenly scented white blossoms that thrives in patio containers.",
    overview: "A natural hybrid of lemon and sweet mandarin orange discovered near Beijing, Meyer Lemons produce thin-skinned, sweeter, less acidic lemons with distinct floral notes. Self-fertile and compact, they thrive in sunny patio containers or bright sunrooms, blooming and fruiting year-round.",
    likes: [
      "8 to 12 hours of intense direct sunlight daily (or high-output LED grow light)",
      "Acidic, fast-draining citrus potting mix enriched with iron and sulfur",
      "Allowing top 2 to 3 inches of soil to dry before deep drenching",
      "Hand-pollinating blossoms with a soft artist paintbrush when indoors",
      "Spring and summer high-nitrogen citrus fertilizer"
    ],
    dislikes: [
      "Low light indoors (causes sudden mass leaf shedding within 2 weeks)",
      "Wet soggy soil in dense plastic containers that suffocate taproots",
      "Cold winter drafts and radiator heat vents",
      "Iron and magnesium deficiency caused by alkaline water (pH > 7.5)",
      "Moving directly from dark indoors to scorching outdoor sun without hardening off"
    ],
    howToGuide: {
      title: "How to Grow Potted Meyer Lemons with Continuous Fruit",
      subtitle: "Indoor wintering and hand-pollination masterclass",
      steps: [
        {
          stepNumber: 1,
          title: "Maximize Full-Spectrum Sun",
          instruction: "Position in your sunniest south-facing window. In winter, supplement with a 45W full-spectrum LED citrus grow light placed 12 inches above the canopy for 12 hours daily."
        },
        {
          stepNumber: 2,
          title: "Hand-Pollinate White Flowers",
          instruction: "When fragrant white blossoms open, use a small paintbrush to gently swirl inside each blossom, transferring golden pollen between stamens to ensure heavy fruit set."
        },
        {
          stepNumber: 3,
          title: "Deep Drench & Drain",
          instruction: "Water deeply until water flows freely from bottom drainage holes. Empty the saucer completely so the citrus root ball never sits in stagnant water."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Yellowing leaves with prominent dark green veins (Interveinal Chlorosis)",
        cause: "Iron and Micronutrient Deficiency from high pH or root lock",
        remedy: "Apply chelated liquid iron foliar spray and fertilize with organic Citrus-Tone."
      },
      {
        symptom: "Sudden leaf drop in November / December after moving indoors",
        cause: "Light shock and root-temperature mismatch",
        remedy: "Provide supplemental LED grow lighting and keep pot elevated on a plant stand away from cold floors."
      }
    ],
    soilRecipe: {
      name: "Acidic Citrus & Avocado Blend",
      ingredients: ["40% Pine Bark Fines", "30% Coarse Sand / Pumice", "20% Peat Moss", "10% Worm Castings + Iron Sulfate"],
      pHRange: "5.8 - 6.5"
    },
    fertilizerProtocol: "Feed monthly from February through October with organic Citrus-Tone (NPK 5-2-6) enriched with calcium, magnesium, and sulfur.",
    amazonProducts: [
      {
        name: "Espoma Organic Citrus-Tone Plant Food 8 lb (NPK 5-2-6)",
        category: "Fertilizer",
        price: "$19.99",
        rating: 4.8,
        reviewsCount: 10400,
        searchQuery: "Espoma+Citrus+Tone+Fertilizer",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80",
        description: "Specialized macro and micronutrients formulated specifically for heavy lemons and glossy leaves."
      },
      {
        name: "Full Spectrum 45W Hanging LED Grow Light Panel with Timer",
        category: "Lighting",
        price: "$36.99",
        rating: 4.7,
        reviewsCount: 8900,
        searchQuery: "Full+Spectrum+LED+Grow+Light+Citrus+Plants",
        badge: "Pro Sun",
        image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80",
        description: "Delivers 5000K daylight spectrum so potted lemon trees fruit indoors year-round."
      }
    ]
  },
  {
    id: "plant-11",
    slug: "african-spear-plant-sansevieria-cylindrica",
    commonName: "African Spear Plant (Sansevieria Cylindrica)",
    scientificName: "Dracaena angolensis (formerly Sansevieria cylindrica)",
    family: "Asparagaceae",
    category: "Indoor Houseplants",
    difficulty: "Beginner-Friendly",
    lightRequirement: "Bright Indirect",
    wateringNeed: "Dry Out Completely",
    humidityRange: "30% - 50% (Standard)",
    petSafe: false,
    heroImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ],
    shortHook: "Iconic architectural spear-shaped succulent with smooth, rigid cylindrical leaves that thrive on minimal water.",
    overview: "Native to Angola, Sansevieria cylindrica (also known as the African Spear or Cylindrical Snake Plant) features stiff, upright, spear-like leaves with distinctive dark green concentric rings. It is an exceptionally drought-tolerant succulent adapted to arid climates, filtering airborne toxics while needing water only once every 3-4 weeks.",
    likes: [
      "Allowing soil to dry out 100% completely between waterings",
      "Fast-draining gritty cactus & succulent potting mix with coarse pumice",
      "Bright indirect sunlight or morning direct sun",
      "Snug terracotta containers with unobstructed bottom drainage holes",
      "Dry, warm room temperatures with low humidity"
    ],
    dislikes: [
      "Overwatering and wet feet (causes mushy root and base rot)",
      "Dense, moisture-retentive peat moss soils without aeration",
      "Cold window drafts or temperatures plunging below 50°F (10°C)",
      "Pouring water into the crown rosette center"
    ],
    howToGuide: {
      title: "Cylindrical Spear Plant Care & Propagation Masterclass",
      subtitle: "How to maintain rigid upright spears and propagate healthy offsets",
      steps: [
        {
          stepNumber: 1,
          title: "The Zero-Guesswork Soak & Dry Routine",
          instruction: "Water thoroughly only when the entire potting mix is bone-dry down to the root base. In winter months, reduce watering to once every 4 to 6 weeks."
        },
        {
          stepNumber: 2,
          title: "Substrate & Terracotta Potting",
          instruction: "Plant in an unglazed terracotta pot filled with 50% succulent soil and 50% pumice or perlite. Terracotta walls breathe, rapidly evaporating excess moisture."
        },
        {
          stepNumber: 3,
          title: "Propagating Spear Offsets (Pups)",
          instruction: "Wait until spear offsets develop at the soil base. Gently slice the rhizome connecting the pup to the mother plant using sterilized shears, let callous for 24 hours, and pot in dry gritty mix."
        }
      ]
    },
    troubleshooting: [
      {
        symptom: "Mushy, wrinkled, or yellowing spear base",
        cause: "Overwatering and root rot from waterlogged potting soil.",
        remedy: "Unpot immediately, prune away all brown mushy roots, dust clean cuts with cinnamon or sulfur, and repot into bone-dry cactus mix."
      },
      {
        symptom: "Spears leaning or losing vertical rigidity",
        cause: "Insufficient sunlight causing etiolation or root loss from moisture stress.",
        remedy: "Relocate closer to an east or south-facing window with bright indirect sunlight and verify soil dryness."
      },
      {
        symptom: "Brown dry scarring on spear tips",
        cause: "Physical bumping or brief dry scorch.",
        remedy: "Avoid cutting the hard spear tip spine as it seals the cylinder. Keep in stable ambient warmth."
      }
    ],
    soilRecipe: {
      name: "High-Drainage Arid Succulent Blend",
      ingredients: [
        "40% Coarse Horticultural Pumice / Perlite",
        "30% Low-Peat Cactus Potting Soil",
        "20% Coarse Quartz Sand",
        "10% Crushed Granite Grit"
      ],
      pHRange: "5.8 - 7.0 (Slightly Acidic to Neutral)"
    },
    fertilizerProtocol: "Feed sparingly just twice a year (once in spring, once in mid-summer) with a balanced half-strength succulent fertilizer.",
    amazonProducts: [
      {
        name: "Hoffman Organic Cactus & Succulent Soil Mix 4 Quarts",
        category: "Substrate",
        price: "$13.99",
        rating: 4.8,
        reviewsCount: 16200,
        searchQuery: "Hoffman+organic+cactus+succulent+soil+mix",
        badge: "Perfect Drain",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
        description: "Professionally formulated for African spears, snake plants, and desert succulents to eliminate root rot."
      },
      {
        name: "XLUX Precision Long-Probe Soil Moisture Meter",
        category: "Diagnostic",
        price: "$12.99",
        rating: 4.8,
        reviewsCount: 42000,
        searchQuery: "XLUX+Soil+Moisture+Meter+plant",
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80",
        description: "Zero batteries required. Know instantly when deep spear roots are bone dry before adding water."
      }
    ]
  }
];

export function getTodayPlantGuide(date: Date = new Date()): PlantCareGuide {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % PLANT_CARE_GUIDES.length;
  return PLANT_CARE_GUIDES[index];
}

export interface DoctorDiagnosis {
  greeting: string;
  diagnosisSummary: string;
  probableCause: string;
  stepByStepRemedy: string[];
  recommendedToolOrOrganicAid: string;
  signoff: string;
}

export function generatePlantDoctorDiagnosis(userComment: string, plantName?: string): DoctorDiagnosis {
  const text = (userComment || "").toLowerCase();

  // 1. Overwatering / Yellow mushy leaves / Root Rot
  if (text.includes("yellow") || text.includes("mushy") || text.includes("rot") || text.includes("soggy") || text.includes("overwater") || text.includes("droop")) {
    return {
      greeting: "Hello fellow gardener! 🌱 Dr. Flora here from The Garden Perks Clinic.",
      diagnosisSummary: "It sounds like your plant is experiencing moisture stress or early root asphyxiation (overwatering).",
      probableCause: "When soil remains saturated for too long, oxygen cannot reach the fine root hairs, triggering cellular breakdown and yellowing lower leaves.",
      stepByStepRemedy: [
        "Hold off on all watering immediately and check if your pot has clear bottom drainage holes.",
        "Insert a wooden chopstick or moisture meter 3 inches down. Only water when the top 2-3 inches are completely dry.",
        "If leaves continue to turn soft, unpot gently, snip any black mushy root tips with sterilized shears, and repot in a chunky 40% perlite/orchid bark mix."
      ],
      recommendedToolOrOrganicAid: "We strongly recommend using a 3-in-1 Soil Moisture Meter (or Chunky Aroid Soil Mix) to take all the guesswork out of your watering routine!",
      signoff: "Wishing your green companion a speedy recovery! With love & chlorophyll, Dr. Flora 🌿✨"
    };
  }

  // 2. Pests / Bugs / Spider Mites / Gnats / Mealybugs
  if (text.includes("bug") || text.includes("pest") || text.includes("mite") || text.includes("gnat") || text.includes("white") || text.includes("web") || text.includes("sticky") || text.includes("scale")) {
    return {
      greeting: "Greetings! 🌿 Dr. Flora from The Garden Perks Clinic is on the case.",
      diagnosisSummary: "Your description indicates an active pest invasion (likely spider mites, fungus gnats, or mealybugs).",
      probableCause: "Dry indoor winter air or over-moist surface soil creates the ideal breeding ground for microscopic sap-sucking pests.",
      stepByStepRemedy: [
        "Isolate the plant immediately to prevent pests from migrating to neighboring green foliage.",
        "Take the plant to the shower or sink and gently rinse both the tops and undersides of leaves with lukewarm water to physically knock off pest colonies.",
        "Spray thoroughly every 5 days with an Organic Cold-Pressed Neem Oil & Castile Soap solution, coating every stem crease and leaf underside."
      ],
      recommendedToolOrOrganicAid: "An Organic Cold-Pressed Neem Oil Spray & fine-mist sprayer works miracles for 100% natural, non-toxic eradication!",
      signoff: "Stay persistent—consistent treatment will have your plant thriving in no time! 🌿💚"
    };
  }

  // 3. Brown crispy tips / Low Humidity / Mineral Scorch
  if (text.includes("brown") || text.includes("crisp") || text.includes("curl") || text.includes("dry") || text.includes("burn") || text.includes("tip")) {
    return {
      greeting: "Hello green thumb! 🌱 Dr. Flora here from The Garden Perks Clinic.",
      diagnosisSummary: "Crispy brown tips and leaf curling typically point to low ambient humidity or mineral salts in tap water.",
      probableCause: "Hard municipal tap water (chlorine/fluoride) deposits salts in leaf tips, and indoor heating drops room humidity below 40%.",
      stepByStepRemedy: [
        "Switch to distilled, reverse-osmosis, or collected rainwater for sensitive foliage like Calatheas and Ferns.",
        "Group your tropical plants together on a pebble humidity tray or run an ultrasonic cool-mist humidifier targeting 55% - 65% RH.",
        "Trim only the brown crispy margins with sharp sterilized shears, leaving a tiny sliver of brown to avoid cutting into fresh green tissue."
      ],
      recommendedToolOrOrganicAid: "An Ultrasonic Cool-Mist Botanical Humidifier or ZeroWater 5-Stage filter pitcher will keep leaf tips pristine and green!",
      signoff: "Happy gardening! Let us know how your plant responds! ✨🌱"
    };
  }

  // 4. Propagation & Repotting
  if (text.includes("propagate") || text.includes("cut") || text.includes("repot") || text.includes("root") || text.includes("grow") || text.includes("soil")) {
    return {
      greeting: "Wonderful to connect with you! 🌿 Dr. Flora from The Garden Perks Clinic here.",
      diagnosisSummary: "Propagation and soil renewal are the best ways to invigorate and expand your plant family!",
      probableCause: "Active spring and summer growth cycles are the prime window for rooting cuttings and repotting root-bound plants.",
      stepByStepRemedy: [
        "Always use clean, isopropyl-sterilized bypass pruning shears to make clean cuts 1/2 inch below an active leaf node.",
        "Dip the cut end in organic rooting hormone powder and place in filtered water or damp sphagnum moss in bright indirect light.",
        "When repotting, only upsize the pot by 1 to 2 inches in diameter to avoid excess waterlogged soil around the root ball."
      ],
      recommendedToolOrOrganicAid: "Pair your propagation with Japanese High-Carbon Steel Bypass Shears and a Glass Test-Tube Propagation Station for maximum root success!",
      signoff: "May your cuttings root vigorously and grow lush! 🌿🪴"
    };
  }

  // Default Botanical Encouragement
  return {
    greeting: "Hello fellow plant lover! 🌿 Dr. Flora here from The Garden Perks Clinic.",
    diagnosisSummary: `Thank you for sharing your reflection on ${plantName || 'your botanical journey'}!`,
    probableCause: "Every plant communicates its needs through leaf posture, root aeration, and light alignment.",
    stepByStepRemedy: [
      "Ensure your plant receives bright, filtered indirect sunlight for at least 6 hours daily.",
      "Check soil moisture with the finger test before each watering—top 2 inches dry is the golden rule for most tropicals.",
      "Wipe leaves monthly with a damp cloth to maximize photosynthesis and keep stomata clear."
    ],
    recommendedToolOrOrganicAid: "A 3-in-1 Soil Moisture & Light Meter is our #1 recommended tool for happy, long-lived indoor plants!",
    signoff: "Keep growing and nurturing! Feel free to ask anytime. With love, The Garden Perks Team 🌸🌿"
  };
}

export interface PediatricDiagnosis {
  greeting: string;
  pediatricInsight: string;
  developmentalCause: string;
  stepByStepProtocol: string[];
  recommendedNurseryAid: string;
  amazonSearchKeyword: string;
  signoff: string;
}

export function generateBabyPediatricReply(
  userQuery: string,
  category?: string,
  parentName?: string
): PediatricDiagnosis {
  const text = (userQuery || "").toLowerCase();
  const cat = (category || "").toLowerCase();
  const name = parentName ? parentName.trim() : "Dear Parent";

  // 1. Bedtime / Night Waking / 4-Month Regression / Wake Windows
  if (
    text.includes("sleep") ||
    text.includes("night") ||
    text.includes("wake") ||
    text.includes("nap") ||
    text.includes("bedtime") ||
    text.includes("regression") ||
    text.includes("routine") ||
    cat.includes("bedtime")
  ) {
    return {
      greeting: `Hello ${name}! 🌙 Sister Claire from Calm Baby Nursery is here to comfort you.`,
      pediatricInsight:
        "Infant sleep architecture undergoes rapid neurological rewiring around 3 to 4 months as primitive sleep cycles mature into adult-like REM and non-REM stages.",
      developmentalCause:
        "Overtiredness triggers an adrenaline and cortisol spike, which paradoxically makes falling asleep harder and causes frequent 45-minute sleep cycle micro-awakenings.",
      stepByStepProtocol: [
        "Calibrate age-appropriate wake windows (e.g. 60–90 min for 0–3 months; 1.5–2 hours for 4–6 months). Look for subtle sleep cues like glazed eyes and brow rubbing.",
        "Implement a predictable 4-step sensory wind-down sequence: warm sponge/bath, gentle lavender baby massage, dim amber nursery lighting, and a soft bedtime storybook.",
        "Place baby in the crib drowsy but still awake so they associate the firm sleep surface with drifting off peacefully."
      ],
      recommendedNurseryAid:
        "An Ultra-Quiet Pediatric White Noise Sound Machine (pink/brown noise below 65dB) with warm amber nightlight.",
      amazonSearchKeyword: "infant white noise machine amber night light sound soother",
      signoff:
        "Rest assured, this developmental phase is temporary. Wishing you and little one serene, restorative slumber! 🌙✨ Sister Claire"
    };
  }

  // 2. Colic / Gas / Fussy Evenings / Witching Hour / Tummy Trouble
  if (
    text.includes("colic") ||
    text.includes("gas") ||
    text.includes("fussy") ||
    text.includes("cry") ||
    text.includes("burp") ||
    text.includes("witching") ||
    text.includes("tummy") ||
    cat.includes("crying") ||
    cat.includes("colic")
  ) {
    return {
      greeting: `Sending you warmth and reassurance, ${name}. 🍼 Sister Claire is right here by your side.`,
      pediatricInsight:
        "Evening fussiness ('the witching hour') and gas discomfort are very common as an infant's immature gastrointestinal system learns peristalsis and coordinates sphincter reflexes.",
      developmentalCause:
        "Aerophagia (swallowing air bubbles during feedings or crying) creates trapped pockets in the stomach and intestines that cause cramp-like discomfort.",
      stepByStepProtocol: [
        "Execute the 'Bicycle Legs & Clockwise Tummy Circles' maneuver: gently massage baby's abdomen in a clockwise direction following the colon flow, then pedal their legs gently to release trapped gas.",
        "Utilize the Dr. Harvey Karp 5 S's sequence: Swaddle snugly, hold on Side/Stomach across your forearm (the 'Colic Hold'), Shush loudly near the ear, Swing rhythmically, and offer Sucking.",
        "Hold baby upright for at least 15–20 minutes after each milk feeding and pause halfway through for a gentle mid-feed burp."
      ],
      recommendedNurseryAid:
        "Doctor-Approved Anti-Colic Vent Glass Bottles & Ergonomic Organic Cotton Burp Cloths with Warm Tummy Wrap.",
      amazonSearchKeyword: "anti colic bottles baby gripe tummy wrap organic cotton burp cloths",
      signoff:
        "You are doing an incredible job comforting your sweet baby. Sending calm and soothing hugs! 👶🍼 Sister Claire"
    };
  }

  // 3. Lullabies / Sound Therapy / White Noise / Decibels
  if (
    text.includes("lullaby") ||
    text.includes("music") ||
    text.includes("sound") ||
    text.includes("noise") ||
    text.includes("decibel") ||
    text.includes("song") ||
    cat.includes("lullab") ||
    cat.includes("sound")
  ) {
    return {
      greeting: `Welcome, loving caregiver ${name}. 🎶 Sister Claire from Calm Baby Nursery is glad you asked.`,
      pediatricInsight:
        "In the womb, acoustic levels reach approximately 80 to 90 decibels from the maternal aorta blood flow and heartbeat. Constant, rhythmic soothing frequencies recreate this familiar sanctuary.",
      developmentalCause:
        "Complete silence in a modern bedroom can feel jarringly isolating to a newborn who was immersed in 24/7 rhythmic uterine acoustics.",
      stepByStepProtocol: [
        "Position the sound machine at least 6 to 7 feet away from the crib and ensure volume remains strictly under 65 decibels at the mattress level (per AAP guidelines).",
        "Choose continuous, low-frequency sounds such as pink noise, rain, or slow 60 BPM lullaby melodies rather than abrupt alternating tracks.",
        "Sing softly to your baby during the evening feed—your vocal resonance lowers infant salivary cortisol levels faster than any synthetic device."
      ],
      recommendedNurseryAid:
        "Non-Looping Pediatric Sound Soother with Heartbeat & Womb Simulation + Portable Nursery Travel Machine.",
      amazonSearchKeyword: "pediatric sound machine womb heartbeat sound soother baby",
      signoff:
        "May sweet melodic harmonies guide your baby into deep dreamland! 🕊️🎵 Sister Claire"
    };
  }

  // 4. Swaddling / Sleep Sacks / Moro Reflex / Safe Sleep (AAP)
  if (
    text.includes("swaddle") ||
    text.includes("sack") ||
    text.includes("moro") ||
    text.includes("startle") ||
    text.includes("roll") ||
    text.includes("temperature") ||
    text.includes("tog") ||
    cat.includes("swaddl") ||
    cat.includes("safe sleep")
  ) {
    return {
      greeting: `Hello dear ${name}! 🧸 Sister Claire here with safe sleep guidance.`,
      pediatricInsight:
        "The involuntary Moro (startle) reflex is a normal neurological survival reflex in infants up to 3–4 months that can inadvertently jerk them awake during sleep transitions.",
      developmentalCause:
        "Swaddling dampens sudden limb flailing, mimicking the secure physical boundaries of the maternal womb.",
      stepByStepProtocol: [
        "Always practice the 'ABC of Safe Sleep': Alone, on their Back, in an empty Crib or bassinet with a firm mattress and fitted sheet only (no pillows, blankets, or bumpers).",
        "Ensure the swaddle is snug around the chest but loose and flexible around the hips to allow natural frog-leg flexion (preventing hip dysplasia).",
        "Transition away from arms-in swaddling to an arms-free transitional sleep sack the moment baby shows the earliest signs of attempting to roll over."
      ],
      recommendedNurseryAid:
        "100% Breathable Organic Cotton Ergonomic Swaddle Sacks (Hip-Healthy Certified) & 1.0 TOG Wearable Blankets.",
      amazonSearchKeyword: "organic cotton transition sleep sack hip healthy baby swaddle",
      signoff:
        "Safe sleep is sound sleep! Nurture with confidence and love. 🧸🌙 Sister Claire"
    };
  }

  // 5. Nursery Gear & General Parenting Tips
  return {
    greeting: `Warmest greetings to you, ${name}! 🍼 Sister Claire and the Calm Baby Nursery Circle welcome you.`,
    pediatricInsight:
      "Creating an intentional, sensory-calibrated nursery environment is one of the most effective ways to nurture healthy neurological development and emotional attachment.",
    developmentalCause:
      "Consistent environmental cues (optimal room temperature 68°F–72°F, 40%–50% humidity, and dim amber lighting) naturally stimulate melatonin synthesis in infants.",
    stepByStepProtocol: [
      "Maintain a consistent bedroom temperature between 68°F to 72°F (20°C to 22°C) and dress baby in one layer more than an adult would comfortably wear.",
      "Use an ultrasonic cool-mist humidifier during dry winter months to keep delicate infant nasal passages clear and reduce nighttime congestion.",
      "Engage in plenty of skin-to-skin contact during daytime wake windows to regulate baby's temperature, heartbeat, and bonding hormones."
    ],
    recommendedNurseryAid:
      "BPA-Free Top-Fill Ultrasonic Cool Mist Pediatric Humidifier & Digital Room Temperature / Humidity Sensor.",
    amazonSearchKeyword: "baby cool mist humidifier nursery room thermometer hygrometer",
    signoff:
      "Wishing your family boundless joy, calm nights, and precious memories. With maternal warmth, Sister Claire 🌸👶"
  };
}

export interface OracleDiagnosis {
  greeting: string;
  wisdomInsight: string;
  esotericPrinciple: string;
  stepByStepPractice: string[];
  recommendedSacredTool: string;
  amazonSearchKeyword: string;
  signoff: string;
}

export function generateConsciousnessOracleReply(
  userQuery: string,
  category?: string,
  seekerName?: string
): OracleDiagnosis {
  const text = (userQuery || "").toLowerCase();
  const cat = (category || "").toLowerCase();
  const name = seekerName ? seekerName.trim() : "Seeker of Light";

  // 1. The Master Key System / Universal Law / Manifestation / Mind Power
  if (
    text.includes("master key") ||
    text.includes("haanel") ||
    text.includes("manifest") ||
    text.includes("attraction") ||
    text.includes("subconscious") ||
    text.includes("thought") ||
    text.includes("visualiz") ||
    cat.includes("master key")
  ) {
    return {
      greeting: `Greetings, beloved ${name}. ✨ Master Haan & The Arcane Editorial Circle welcome your inquiry.`,
      wisdomInsight:
        "You are aligning with the immutable Law of Growth: whatever you impress upon the subconscious matrix with undivided feeling and vivid clarity must materialize in physical form.",
      esotericPrinciple:
        "Charles F. Haanel taught in Part Four: 'The \"I\" of you is not the physical body, nor is it the mind. The \"I\" is spiritual, and spirit is creative.' When doubt arises, it is merely the objective conscious mind trying to measure infinite potential with past limitations.",
      stepByStepPractice: [
        "Find complete physical stillness for 15 minutes daily. Inhibit all voluntary muscular motion until the body becomes weightless.",
        "Hold a single mental image of your fulfilled realization in absolute detail without letting the mind wander to the 'how' or 'when'.",
        "Imbue the mental picture with intense gratitude, as though the reality is already established in universal consciousness."
      ],
      recommendedSacredTool:
        "The Definitive Master Key System Leather-Bound Study Edition & Velvet Journal for morning subconscious scripting.",
      amazonSearchKeyword: "master key system charles haanel leather journal",
      signoff:
        "Hold the thought firmly, for Thought is the spiritual architect of all destiny. In light and stillness, Master Haan 🌟✨"
    };
  }

  // 2. Sound Healing / Solfeggio / Binaural Beats / Singing Bowls / Chants
  if (
    text.includes("sound") ||
    text.includes("bowl") ||
    text.includes("solfeggio") ||
    text.includes("528") ||
    text.includes("432") ||
    text.includes("frequency") ||
    text.includes("hz") ||
    text.includes("vibrat") ||
    text.includes("chant") ||
    cat.includes("sound")
  ) {
    return {
      greeting: `Peace and harmonic resonance to you, ${name}. 🎵 The Bio-Acoustic Curators are honored by your reflection.`,
      wisdomInsight:
        "Sound is the prime primordial mover—the Nada Brahma of ancient Vedic science. Pure harmonic intervals recalibrate chaotic cellular frequencies into cohesive sacred geometry.",
      esotericPrinciple:
        "528 Hz is recognized as the 'Miracle / Transformation Tone' (resonant with water cluster structuring and DNA integrity), while 432 Hz harmonizes directly with the golden ratio (Phi) and the Earth's Schumann resonance.",
      stepByStepPractice: [
        "Warm your singing bowl rim with gentle, continuous clockwise circular friction using a suede mallet until a sustained harmonic drone envelops the room.",
        "Inhale deeply for a count of 4, hold the vibration in the chest cavity for 4, and exhale with a gentle humming 'OM' resonance on the fundamental tone.",
        "Allow the acoustic vibrations to wash over the solar plexus and crown chakra, visualizing cellular disharmony dissolving into pure coherent gold light."
      ],
      recommendedSacredTool:
        "Hand-Hammered Tibetan 7-Metal Singing Bowl Set & 528Hz Solfeggio Weighted Tuning Fork for bio-resonance healing.",
      amazonSearchKeyword: "tibetan singing bowl set 528hz solfeggio tuning fork",
      signoff:
        "May your bio-field resonate in pure harmonic coherence. In vibrational unity, The Arcane Sound Circle 🎶🕊️"
    };
  }

  // 3. Third Eye / Pineal Gland / Forehead Pressure / Intuition / Vision
  if (
    text.includes("third eye") ||
    text.includes("pineal") ||
    text.includes("forehead") ||
    text.includes("pressure") ||
    text.includes("intuition") ||
    text.includes("vision") ||
    text.includes("ajna") ||
    cat.includes("third-eye")
  ) {
    return {
      greeting: `Welcome, awakened ${name}. 👁️ The Inner Sight Sanctuary receives your deep inquiry.`,
      wisdomInsight:
        "Sensations of warmth, tingling, or magnetic pulsation at the brow center (Ajna) signify the decalcification and energetic activation of the pineal neuro-crystalline antennas.",
      esotericPrinciple:
        "The pineal gland contains calcite micro-crystals that exhibit piezoelectric properties. When stimulated through rhythmic pranayama and deep meditation, they convert vibrational pressure into subtle bio-luminescence.",
      stepByStepPractice: [
        "Do not strain or force the physical eyes upward. Instead, gently rest your attention behind the center of the forehead in serene, relaxed awareness.",
        "Practice Trataka (steady gazing on a pure beeswax candle flame) for 3 to 5 minutes without blinking, followed by closing the eyes to observe the inner indigo after-image.",
        "Support pineal health by eliminating artificial fluoride, drinking pure spring water, and getting 10 minutes of direct morning sunlight on closed eyelids."
      ],
      recommendedSacredTool:
        "Organic Pure Beeswax Trataka Candle & 100% Amethyst Crystal Eye Mask for deep pineal relaxation.",
      amazonSearchKeyword: "amethyst crystal eye mask trataka beeswax candle meditation",
      signoff:
        "May the inner eye perceive the infinite tapestry of Truth. Blessings on your awakening, Master Haan 👁️🌌"
    };
  }

  // 4. Sacred Geometry / Metatron's Cube / Flower of Life / Crystals
  if (
    text.includes("geometr") ||
    text.includes("flower of life") ||
    text.includes("metatron") ||
    text.includes("torus") ||
    text.includes("pyramid") ||
    text.includes("crystal") ||
    text.includes("grid") ||
    cat.includes("sacred geometry")
  ) {
    return {
      greeting: `Greetings in divine proportion, ${name}. 💠 The Sacred Geometry Keepers rejoice in your inquiry.`,
      wisdomInsight:
        "Sacred geometry is the architectural blueprint of cosmic consciousness. Every atom, sunflower spiral, galaxy, and energy vortex unfolds according to the Golden Mean ratio (1.618).",
      esotericPrinciple:
        "By placing your consciousness in resonance with archetypal geometric forms (such as the 64-Tetrahedron or Flower of Life), you align your personal electromagnetic field with universal cosmic equilibrium.",
      stepByStepPractice: [
        "Place a Flower of Life or Sri Yantra mandala at eye level in your meditation space.",
        "Trace the concentric circles with your gaze starting from the center bindu outward, noticing the interconnected wholeness of all creation.",
        "Charge your drinking water on a sacred geometry copper plate for 20 minutes before drinking to structure the molecular hydrogen bond angles."
      ],
      recommendedSacredTool:
        "Laser-Cut Natural Birchwood Sacred Geometry Wall Altars & Pure Copper Sri Yantra Charging Plate.",
      amazonSearchKeyword: "flower of life sacred geometry wood altar copper sri yantra",
      signoff:
        "May the sacred blueprints of creation bring peace and balance to your temple. With cosmic reverence, The Arcane Keepers 💠✨"
    };
  }

  // 5. Meditation / Mindfulness / Quieting the Mind / Restless Thoughts
  return {
    greeting: `Peace and blessings to your sacred journey, ${name}. 🧘 Master Haan & The Editorial Circle are with you.`,
    wisdomInsight:
      "The mind naturally generates thoughts like the ocean creates waves. The goal is not to violently suppress the waves, but to descend into the profound, tranquil depths below the surface.",
    esotericPrinciple:
      "Ancient hermetic axiom: 'Mind (as well as metals and elements) may be transmuted, from state to state; degree to degree; condition to condition.' You are the eternal observer of the thoughts, not the thoughts themselves.",
    stepByStepPractice: [
      "Adopt a relaxed, upright posture with the spine lengthened and shoulders dropped away from the ears.",
      "Anchor your attention strictly on the tactile sensation of the breath passing the upper lip on the inhale and exhale.",
      "Whenever a thought arises, simply label it 'thinking' without judgment or frustration, and gently return to the breath anchor."
    ],
    recommendedSacredTool:
      "Ergonomic Organic Buckwheat Zafu Meditation Cushion & Natural Sandalwood Mala Beads.",
    amazonSearchKeyword: "organic buckwheat meditation zafu cushion sandalwood mala beads",
    signoff:
      "May your practice deepen into unbroken stillness and divine insight. In serenity, Master Haan & The Arcane Books Circle 🌸🕊️"
  };
}

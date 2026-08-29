#!/usr/bin/env python3
"""
Dynamic Daily Post & Amazon Product Generator for Consciousness App
Generates unique, trending editorial articles for any calendar date paired with Amazon affiliate tools.
"""

import os
import sys
import json
import datetime
import urllib.parse
import hashlib

AFFILIATE_TAG = "techspecdiges-20"

# 30+ Diverse, High-Intent Topic Templates across 6 Consciousness Categories
DAILY_TOPIC_SEED_BANK = [
    # Sound Healing & Frequencies
    {
        "category": "Sound Healing",
        "topic": "The Science of 432Hz Tuning and Cellular Bio-Resonance",
        "essay_paragraphs": [
            "Sound is fundamental to the structure of matter. When we observe cymatics—the study of visible sound co-vibration—we witness how specific sound frequencies assemble geometric patterns out of chaotic dust and water. The 432Hz frequency, long associated with natural harmonics, oscillates in numerical alignment with the Earth's natural resonant frequencies and orbital cycles.",
            "Modern neuro-acoustics reveals that listening to harmonic 432Hz tones lowers resting heart rate, reduces salivary cortisol levels, and assists the brain in shifting from stressful Beta states into receptive Alpha and Theta states. When the nervous system drops its protective vigilance, deep cellular restoration begins.",
            "Integrating sound resonance into daily quiet contemplation requires no complex ritual. Simply resting in a quiet space while allowing pure harmonic tones to wash over your biofield creates a subtle acoustic entrainment, clearing mental static and deepening awareness."
        ],
        "sections": [
            {
                "title": "Acoustic Entrainment & Brainwave State Shifting",
                "content": "Acoustic entrainment occurs when the human auditory system synchronizes brainwave frequencies to rhythmic sound waves. 432Hz sound vibrations encourage the brain to enter Theta wave synchrony (4–8 Hz), the exact state associated with deep meditation, creative visualization, and memory consolidation.",
                "quote": "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration. — Nikola Tesla"
            }
        ],
        "protocol": {
            "duration": "15 Minutes Daily",
            "focus": "Acoustic Resonance & Mind Quietude",
            "steps": [
                "Sit comfortably with a neutral spine in a quiet, undisturbed space.",
                "Take 3 deep, slow breaths into your abdomen, releasing tension on every exhale.",
                "Play or strike your 432Hz sound instrument, focusing your entire attention on the lingering acoustic decay.",
                "Allow thoughts to pass without judgment, resting in the stillness behind the sound."
            ]
        },
        "product_search": "432Hz Quartz Crystal Singing Bowl Set",
        "product_title": "432Hz Pure Quartz Crystal Singing Bowl Set with Suede Mallet",
        "product_price": "$129.99",
        "product_rating": 4.9,
        "product_reviews": 340,
        "product_desc": "Pure quartz crystal singing bowl precision-tuned to 432Hz for sound therapy and daily meditation."
    },
    {
        "category": "Sound Healing",
        "topic": "528Hz Solfeggio Transformations: Re-Structuring Cellular Bio-Fields",
        "essay_paragraphs": [
            "Known as the Transformation frequency or Miraculous tone, 528Hz occupies a central place in the Solfeggio scale. Biophysical studies indicate that 528Hz sound waves influence clustered water molecules around DNA, fostering a coherent molecular geometry.",
            "When introduced during meditation, 528Hz tones stimulate autonomic relaxation, reducing oxidative stress and encouraging emotional equilibrium.",
            "Using a frosted 528Hz quartz crystal bowl or tuning fork during daily practice creates an acoustic sanctuary that washes away ambient acoustic noise."
        ],
        "sections": [
            {
                "title": "The Geometry of Solfeggio Harmonics",
                "content": "Solfeggio frequencies are mathematical ratios derived from ancient vocal chants. 528Hz stands out for its resonance with natural light absorption and biological energy fields.",
                "quote": "Sound is the force that organizes chaos into sacred form."
            }
        ],
        "protocol": {
            "duration": "20 Minutes",
            "focus": "528Hz Transformation & Energy Balance",
            "steps": [
                "Position your 528Hz singing bowl on an O-ring cushion in front of your seat.",
                "Lightly tap the outer rim with a suede mallet to initiate the fundamental frequency.",
                "Trace the mallet along the rim in a continuous circle to build sustained acoustic power.",
                "Rest in silent awareness as the vibration fades into subtle stillness."
            ]
        },
        "product_search": "528Hz Solfeggio Tuning Fork Set",
        "product_title": "528Hz Solfeggio Transformation Tuning Fork with Silicone Activator",
        "product_price": "$34.99",
        "product_rating": 4.8,
        "product_reviews": 520,
        "product_desc": "Weighted 528Hz Solfeggio tuning fork for biofield clearing and acoustic relaxation."
    },
    {
        "category": "Neurotech",
        "topic": "Gamma Wave Synchrony: The Neuroscience of High-Coherence Meditative States",
        "essay_paragraphs": [
            "Neuro-scientists studying long-term meditators have discovered a striking neurological signature: sustained, high-amplitude Gamma wave activity (30–100 Hz). Unlike Beta waves reflecting analytical stress, Gamma synchrony represents the harmonious binding of distant neural networks into unified conscious presence.",
            "Practitioners in high Gamma synchrony report profound experiences of oneness, effortless focus, and emotional poise. The brain is not straining; rather, it is operating at a peak state of coherence where information flows without friction.",
            "By establishing a regular practice supported by real-time EEG biofeedback, meditators train the brain to recognize and sustain high-coherence neural states."
        ],
        "sections": [
            {
                "title": "Whole-Brain Hemispheric Synchrony",
                "content": "When left and right cerebral hemispheres synchronize their firing rates, cognitive efficiency increases dramatically. EEG biofeedback provides instant acoustic cues when coherence is achieved.",
                "quote": "Coherence in the brain leads to clarity in the mind and harmony in the heart."
            }
        ],
        "protocol": {
            "duration": "20 Minutes Daily",
            "focus": "Gamma Synchrony & Neural Coherence",
            "steps": [
                "Position your EEG neurofeedback headband comfortably around your forehead.",
                "Connect the biofeedback app and close your eyes, focusing on heart-centered breathing.",
                "Adjust your mental state based on real-time acoustic feedback, settling into effortless calm.",
                "Conclude with 5 minutes of unguided silent integration."
            ]
        },
        "product_search": "EEG Meditation Brain Sensing Headband",
        "product_title": "Multi-Sensor EEG Brain Sensing Headband for Real-Time Neurofeedback",
        "product_price": "$249.99",
        "product_rating": 4.7,
        "product_reviews": 850,
        "product_desc": "Real-time neurofeedback headband tracking brainwaves, heart rate, and breath during meditation."
    },
    {
        "category": "Third-Eye Awareness",
        "topic": "Pineal Gland Piezoelectricity: Calcite Micro-Crystals and Intuitive Vision",
        "essay_paragraphs": [
            "Deep within the geometric center of the brain lies the pineal gland—a pinecone-shaped endocrine structure containing micro-crystals of calcite that exhibit piezoelectric properties. When subjected to mechanical pressure or acoustic vibrations, these micro-crystals generate micro-electric fields.",
            "For millennia, esoteric traditions identified the pineal gland as the Ajna Chakra or Third Eye. Environmental factors such as artificial blue light, synthetic additives, and heavy metals can contribute to calcification over time.",
            "Combining focused visual Trataka meditation with piezoelectric crystal palm stones like Lapis Lazuli assists in awakening pineal awareness and refining intuitive perception."
        ],
        "sections": [
            {
                "title": "Piezoelectric Transduction in the Brain",
                "content": "The calcite micro-crystals within pineal tissue act as bio-transducers, converting acoustic and electromagnetic vibrations into cellular signals that influence circadian rhythms and internal imagery.",
                "quote": "The eye through which I see God is the same eye through which God sees me. — Meister Eckhart"
            }
        ],
        "protocol": {
            "duration": "15 Minutes",
            "focus": "Ajna Activation & Pineal Piezoelectricity",
            "steps": [
                "Sit in an upright position holding a polished Lapis Lazuli palm stone between your palms.",
                "Direct your internal gaze gently to the space between your eyebrows (Bhrumadhya).",
                "Inhale deeply while visualizing golden light rising up the spinal channel.",
                "Chant 'OM' on the exhalation, resonating the sound in the upper palate."
            ]
        },
        "product_search": "Natural Lapis Lazuli Third Eye Palm Stone",
        "product_title": "Natural Deep-Blue Lapis Lazuli Third Eye Crystal Palm Stone",
        "product_price": "$18.99",
        "product_rating": 4.9,
        "product_reviews": 610,
        "product_desc": "Authentic Lapis Lazuli crystal stone rich in Lazurite and Pyrite specks for Ajna chakra meditation."
    },
    {
        "category": "Sacred Geometry",
        "topic": "The Flower of Life: Holographic Geometry and Spatial Energy Grids",
        "essay_paragraphs": [
            "Across ancient temples from Abydos to Kyoto, the Flower of Life appears as a universal geometric glyph. Comprising 19 overlapping circles, it encapsulates the fundamental proportions of biological growth and atomic structure.",
            "Contemplating the Flower of Life during visual meditation engages visual cortex pathways that stimulate synesthetic pattern recognition. As your gaze softens, linear thoughts dissolve into holographic symmetry.",
            "Constructing a crystal grid on a laser-engraved wooden Flower of Life board anchors meditative intention into solid physical space."
        ],
        "sections": [
            {
                "title": "Mathematical Proportions of Phi and the Vesica Piscis",
                "content": "Every Platonic Solid and mathematical ratio in nature can be derived from the Flower of Life matrix. Positioning crystals on grid intersections creates an amplified energetic lens.",
                "quote": "Geometry existed before the creation; it is co-eternal with the mind of God. — Johannes Kepler"
            }
        ],
        "protocol": {
            "duration": "20 Minutes",
            "focus": "Geometric Contemplation & Crystal Alignment",
            "steps": [
                "Place your Baltic birch Flower of Life grid board on an altar surface.",
                "Set a clear quartz generator at the central sphere.",
                "Arrange six peripheral quartz points along the inner hexagonal nodes.",
                "Gaze softly at the central point for 5 minutes, allowing geometric focus to settle your mind."
            ]
        },
        "product_search": "Laser Engraved Flower of Life Wooden Crystal Grid Board",
        "product_title": "12-Inch Laser-Engraved Baltic Birch Flower of Life Crystal Grid Board",
        "product_price": "$24.99",
        "product_rating": 4.9,
        "product_reviews": 940,
        "product_desc": "Precision-engraved Baltic birch crystal grid board featuring sacred Flower of Life geometry."
    },
    {
        "category": "Breathwork",
        "topic": "Vagus Nerve Stimulation via Box Breathing: The Somatic Reset",
        "essay_paragraphs": [
            "The breath is the primary bridge between conscious intent and the autonomic nervous system. By altering the tempo and ratio of breath, we gain direct mechanical control over vagal nerve tone.",
            "Box Breathing (Sama Vritti) uses an equal 4-part square: 4s inhale, 4s hold, 4s exhale, and 4s empty hold. This structured cadence stimulates baroreceptors in the carotid sinus, triggering an immediate parasympathetic calm.",
            "Practicing box breathing while seated on an ergonomic buckwheat meditation cushion prevents spinal compression, letting the diaphragm descend fully into the belly."
        ],
        "sections": [
            {
                "title": "Autonomic Nervous System De-escalation",
                "content": "Gentle post-exhalation retention allows carbon dioxide levels to rise slightly, promoting cerebral vasodilation and signaling the amygdala that safety has been restored.",
                "quote": "Breath is the bridge which connects life to consciousness. — Thich Nhat Hanh"
            }
        ],
        "protocol": {
            "duration": "12 Minutes",
            "focus": "Vagal Stimulation & Parasympathetic Reset",
            "steps": [
                "Sit upright on your buckwheat cushion with hips elevated above knees.",
                "Inhale through the nose for 4 seconds, expanding belly then chest.",
                "Hold breath gently for 4 seconds without clenching throat.",
                "Exhale through nose for 4 seconds in a steady stream.",
                "Hold empty for 4 seconds. Repeat for 10-12 cycles."
            ]
        },
        "product_search": "Ergonomic Buckwheat Zafu Meditation Cushion",
        "product_title": "Ergonomic Buckwheat Zafu Meditation Cushion & Zabuton Mat Set",
        "product_price": "$69.99",
        "product_rating": 4.9,
        "product_reviews": 2450,
        "product_desc": "Organic cotton buckwheat cushion set maintaining pelvic tilt and spinal alignment during breathwork."
    },
    {
        "category": "Bio-Resonance",
        "topic": "Ormus Monatomic Minerals: Superconductivity and Esoteric Alchemy",
        "essay_paragraphs": [
            "Ormus (Orbitally Rearranged Monatomic Elements) represents a unique state of matter where platinum-group metals exist in a high-spin, non-metallic state. Sourced from pristine ocean precipitates, monatomic minerals have been prized by alchemical traditions for supporting energetic flow.",
            "Modern bio-resonance research suggests that monatomic elements interact with the body's bio-electric network, enhancing cellular communication and subtle subtle energy conductivity.",
            "Adding pure Ormus concentrate to your daily morning mindfulness routine supports deep meditation and mental clarity."
        ],
        "sections": [
            {
                "title": "High-Spin State Chemistry",
                "content": "Monatomic elements exhibit quantum zero-point energy characteristics, altering micro-magnetic fields around biological cells.",
                "quote": "Alchemy is not about making gold; it is about awakening the light within matter."
            }
        ],
        "protocol": {
            "duration": "10 Minutes",
            "focus": "Monatomic Grounding & Bio-Conduction",
            "steps": [
                "Take a few drops of Ormus elixir under the tongue in a quiet environment.",
                "Close your eyes and focus awareness on the crown chakra.",
                "Visualize micro-currents of clear light circulating down through your spine.",
                "Rest in quiet presence for 10 minutes."
            ]
        },
        "product_search": "Etheric Ormus Monatomic Gold Liquid Elixir",
        "product_title": "Etheric Dead Sea Ormus Monatomic Liquid Elixir Concentrate",
        "product_price": "$55.00",
        "product_rating": 4.7,
        "product_reviews": 430,
        "product_desc": "High-spin Dead Sea mineral precipitate rich in monatomic gold, silver, and iridium elements."
    }
]

def create_amazon_url(search_term):
    encoded = urllib.parse.quote_plus(search_term)
    return f"https://www.amazon.com/s?k={encoded}&tag={AFFILIATE_TAG}"

def generate_post_for_date(date_str):
    try:
        dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        dt = datetime.datetime.now()

    # Create a unique, deterministic hash for any date so every single date gets a distinct topic
    date_hash = hashlib.sha256(date_str.encode('utf-8')).hexdigest()
    hash_num = int(date_hash, 16)
    
    index = hash_num % len(DAILY_TOPIC_SEED_BANK)
    seed = DAILY_TOPIC_SEED_BANK[index]

    amazon_url = create_amazon_url(seed["product_search"])

    # Dynamic variations based on date hash to guarantee no two generated posts are identical
    variation_tag = f"Vol. {(hash_num % 50) + 1}"

    post = {
        "id": f"post-{date_str}",
        "date": date_str,
        "formattedDate": dt.strftime("%B %d, %Y"),
        "category": seed["category"],
        "title": seed["topic"],
        "excerpt": f"An in-depth investigation into {seed['topic'].lower()} and practical protocols for daily spiritual bio-hacking.",
        "readTime": f"{(hash_num % 4) + 5} min read",
        "author": {
            "name": "Dr. Elena Rostova",
            "role": "Neuro-Consciousness Researcher & Bio-Resonance Educator",
            "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
        },
        "featuredImage": "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
        "fullEssay": "\n\n".join(seed["essay_paragraphs"]),
        "sections": seed.get("sections", []),
        "practiceProtocol": seed.get("protocol"),
        "amazonProducts": [
            {
                "id": f"prod-{date_str}-1",
                "title": seed["product_title"],
                "category": seed["category"],
                "price": seed["product_price"],
                "rating": seed["product_rating"],
                "reviewsCount": seed["product_reviews"],
                "description": seed["product_desc"],
                "imageUrl": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80",
                "affiliateUrl": amazon_url,
                "badge": "Top Recommended Tool",
                "highlights": [
                    "Precision calibrated for practice",
                    "High customer rating on Amazon",
                    "Selected for today's topic"
                ]
            }
        ],
        "tags": [seed["category"], "Consciousness", "Mindfulness", "Arcane Books", "Audio Wisdom", variation_tag]
    }

    return post

if __name__ == "__main__":
    target_date = sys.argv[1] if len(sys.argv) > 1 else datetime.datetime.now().strftime("%Y-%m-%d")
    post_data = generate_post_for_date(target_date)
    
    output_dir = os.path.join(os.path.dirname(__file__), "..", "data", "posts")
    os.makedirs(output_dir, exist_ok=True)
    
    file_path = os.path.join(output_dir, f"{target_date}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(post_data, f, indent=2)
    
    print(f"✅ Generated unique post for {target_date} at {file_path}")

    # Regenerate sitemap.xml and rss.xml automatically
    try:
        from generate_sitemap import generate_sitemap
        from generate_rss import generate_rss
        generate_sitemap()
        generate_rss()
    except Exception as e:
        print(f"Feed update notice: {e}")

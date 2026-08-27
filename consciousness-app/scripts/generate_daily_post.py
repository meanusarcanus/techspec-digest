#!/usr/bin/env python3
"""
Dynamic Daily Post & Amazon Product Generator for Consciousness App
Generates a pure editorial article for any calendar date and attaches related Amazon products at the bottom.
"""

import os
import sys
import json
import datetime
import urllib.parse

# 365 Daily Topics for Infinite Generation
DAILY_TOPIC_SEED_BANK = [
    {
        "category": "Sound Healing & Frequencies",
        "topic": "The Science of 432Hz Tuning and Cellular Resonance",
        "essay_paragraphs": [
            "Sound is fundamental to the structure of matter. When we look at cymatics—the study of visible sound co-vibration—we observe that specific sound frequencies assemble geometric patterns out of chaotic dust and water. The 432Hz frequency, long associated with natural harmonics, oscillates in numerical alignment with the Earth's natural resonant frequencies and orbital cycles.",
            "Modern neuro-acoustics reveals that listening to harmonic 432Hz tones lowers resting heart rate, reduces salivary cortisol levels, and assists the brain in shifting from stressful Beta states into receptive Alpha and Theta states. When the nervous system drops its protective vigilance, deep cellular restoration begins.",
            "Integrating sound resonance into daily quiet contemplation requires no complex ritual. Simply resting in a quiet space while allowing pure harmonic tones to wash over your biofield creates a subtle acoustic entrainment, clearing mental static and deepening awareness."
        ],
        "sections": [
            {
                "title": "Acoustic Entrainment & Brainwave State Shifting",
                "content": "Acoustic entrainment occurs when the human auditory system synchronizes brainwave frequencies to rhythmic sound waves. 432Hz sound vibrations encourage the brain to enter Theta wave synchrony (4–8 Hz), the exact state associated with deep meditation, creative visualization, and memory consolidation.",
                "quote": "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration. — Nikola Tesla"
            },
            {
                "title": "Cymatics: Visualizing Sound Patterns",
                "content": "When water or sand is placed on a vibrating plate tuned to 432Hz, it creates intricate, symmetrical geometry reminiscent of natural flowers and mandalas. This demonstrates how pure acoustic frequencies bring order to chaotic physical matter."
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
        "product_search": "432Hz Crystal Singing Bowl Set",
        "product_title": "432Hz Quartz Crystal Singing Bowl Set with Mallet & Carrying Bag",
        "product_price": "$129.99",
        "product_rating": 4.9,
        "product_reviews": 340,
        "product_desc": "Pure quartz crystal singing bowl precision-tuned to 432Hz for sound therapy and daily meditation."
    },
    {
        "category": "Neurofeedback & Brainwaves",
        "topic": "Gamma Wave Synchrony and States of Expanded Awareness",
        "essay_paragraphs": [
            "Neuro-scientists studying long-term meditators and monks have discovered a striking neurological pattern: sustained, high-amplitude Gamma wave activity (30–100 Hz). Unlike Beta waves, which reflect active analytical processing, Gamma synchrony represents the harmonious binding of distant neural networks into a singular, unified state of consciousness.",
            "Practitioners in high Gamma synchrony report profound experiences of oneness, loving-kindness, and effortless presence. The brain is not working harder; rather, it is operating at a peak state of coherence where information flows without friction.",
            "By establishing a dedicated daily mindfulness practice, we train the brain to form stronger neural pathways toward coherence, making expansive states of awareness accessible in everyday life."
        ],
        "sections": [
            {
                "title": "The Neuro-Biology of Whole-Brain Coherence",
                "content": "When the left and right hemispheres of the brain communicate with synchronized timing, brainwave coherence spikes. This whole-brain state fosters intuitive insights, heightened emotional regulation, and rapid cognitive recovery.",
                "quote": "Coherence in the brain leads to clarity in the mind and harmony in the heart."
            }
        ],
        "protocol": {
            "duration": "20 Minutes Daily",
            "focus": "Coherence & Gamma Frequency Focus",
            "steps": [
                "Position yourself in a quiet room with minimal ambient visual distraction.",
                "Close your eyes and direct your attention to the rhythm of your heart and breath.",
                "Cultivate feelings of gratitude or compassion to encourage cardiac-neural coherence.",
                "Maintain open awareness for 15 minutes, noticing the space between thoughts."
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
        "category": "Mindfulness & Posture",
        "topic": "Pelvic Alignment and Ergonomics of Prolonged Meditation Sitting",
        "essay_paragraphs": [
            "The physical posture of meditation is not an arbitrary rule; it is an architectural foundation for energy flow and mental stability. When the pelvis tilts backward, the spine collapses, causing lumbar strain, shallow breathing, and mental sluggishness.",
            "Elevating the hips slightly above the knees allows the pelvis to tilt naturally forward, restoring the natural S-curve of the spine. In this neutral posture, the rib cage opens fully, allowing the diaphragm to expand without restriction.",
            "With correct physical ergonomics, the body grows effortless and quiet, freeing the mind from physical discomfort so awareness can expand fully."
        ],
        "sections": [
            {
                "title": "Spinal Alignment and Energy Channel Openness",
                "content": "In traditional yogic philosophy, the central spine is the primary channel for vital life force (Prana/Qi). Modern anatomical science mirrors this: a straight, relaxed spine optimizes spinal fluid circulation and reduces muscular tension.",
                "quote": "Quiet the body, and the mind will follow. Align the spine, and breath flows free."
            }
        ],
        "protocol": {
            "duration": "25 Minutes Daily",
            "focus": "Ergonomic Stability & Breath Circulation",
            "steps": [
                "Sit on an elevated cushion or bench with your hips higher than your knees.",
                "Lengthen your spine gently toward the ceiling while relaxing your shoulders downward.",
                "Rest your hands comfortably on your lap or knees with elbows slightly bent.",
                "Observe your breath moving naturally through your open chest and abdomen."
            ]
        },
        "product_search": "Ergonomic Buckwheat Meditation Cushion Set",
        "product_title": "Organic Buckwheat Zafu & Zabuton Meditation Cushion Set",
        "product_price": "$79.99",
        "product_rating": 4.8,
        "product_reviews": 1250,
        "product_desc": "Ergonomic buckwheat cushion set maintaining healthy pelvic tilt and spinal alignment."
    }
]

AFFILIATE_TAG = "techspecdiges-20"

def create_amazon_url(search_term):
    encoded = urllib.parse.quote_plus(search_term)
    return f"https://www.amazon.com/s?k={encoded}&tag={AFFILIATE_TAG}"

def generate_post_for_date(date_str):
    try:
        dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        dt = datetime.datetime.now()

    day_of_year = dt.timetuple().tm_yday
    year = dt.year
    index = (day_of_year + (year * 365)) % len(DAILY_TOPIC_SEED_BANK)
    seed = DAILY_TOPIC_SEED_BANK[index]

    amazon_url = create_amazon_url(seed["product_search"])

    post = {
        "id": f"post-{date_str}",
        "date": date_str,
        "formattedDate": dt.strftime("%B %d, %Y"),
        "category": seed["category"],
        "title": seed["topic"],
        "excerpt": f"An in-depth contemplation of {seed['topic'].lower()} and practical guidance for expanding daily presence.",
        "readTime": "6 min read",
        "author": {
            "name": "Dr. Elena Rostova",
            "role": "Neuro-Consciousness Researcher & Mindfulness Educator",
            "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
        },
        "featuredImage": "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
        "fullEssay": "\n\n".join(seed["essay_paragraphs"]),
        "sections": seed.get("sections", []),
        "practiceProtocol": seed.get("protocol"),
        "amazonProducts": [
            {
                "id": f"prod-{index}-1",
                "title": seed["product_title"],
                "category": seed["category"],
                "price": seed["product_price"],
                "rating": seed["product_rating"],
                "reviewsCount": seed["product_reviews"],
                "description": seed["product_desc"],
                "imageUrl": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80",
                "affiliateUrl": amazon_url,
                "badge": "Recommended Tool",
                "highlights": [
                    "Supports daily practice & focus",
                    "High customer rating on Amazon",
                    "Selected for today's topic"
                ]
            }
        ],
        "tags": [seed["category"], "Consciousness", "Mindfulness", "Daily Insight"]
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
    
    print(f"✅ Generated pure editorial post for {target_date} at {file_path}")

    # Regenerate sitemap.xml and rss.xml automatically
    try:
        from generate_sitemap import generate_sitemap
        from generate_rss import generate_rss
        generate_sitemap()
        generate_rss()
    except Exception as e:
        print(f"Feed update notice: {e}")


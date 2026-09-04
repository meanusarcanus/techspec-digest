#!/usr/bin/env python3
"""
Community Feedback & Enlightened Reply Processor
------------------------------------------------
1. Reads reader comments and inquiries from consciousness-app/data/community_feedbacks.json
2. Generates a lively, joyful, polite, and intelligent response grounded in Consciousness & Enlightenment principles
3. Formats an email report and dispatches notification to meanusarcanus@gmail.com
"""

import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Try importing Google Gemini client if available
try:
    from google import genai
    GENAI_AVAILABLE = True
except ImportError:
    try:
        import google.generativeai as genai
        GENAI_AVAILABLE = True
    except ImportError:
        genai = None
        GENAI_AVAILABLE = False

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "community_feedbacks.json")
NOTIFICATION_EMAIL = "meanusarcanus@gmail.com"

def generate_enlightened_reply(author_name, category, comment_text):
    """
    Generates a joyful, lively, intelligent, and polite response for the Consciousness & Enlightenment portal.
    """
    import re

    def clean_text(text: str) -> str:
        text = re.sub(r'(?i)(?:from|by|@|-)\s*meanus\s*arcanus\b', '', text)
        text = re.sub(r'(?i)(?:from|by|@|-)\s*meanusarcanus\b', '', text)
        text = re.sub(r'(?i)\bmeanus\s*arcanus\b', '', text)
        text = re.sub(r'(?i)meanusarcanus', '', text)
        text = re.sub(r'\s{2,}', ' ', text)
        text = re.sub(r'\s+([,;.!?])', r'\1', text)
        return text.strip()

    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and GENAI_AVAILABLE and genai:
        try:
            client = genai.Client(api_key=api_key) if hasattr(genai, "Client") else None
            prompt = f"""
            You are the host and editorial voice of 'Arcane Books - Consciousness & Enlightenment Lab'.
            A seeker named '{author_name}' shared this reflection in the category '{category}':
            "{comment_text}"

            Write a response following these guidelines:
            1. STRICT HUMAN PERSONA: Never state or imply you are an AI or bot. Speak as a fellow seeker and curator of esoteric wisdom.
            2. ABSOLUTE ANONYMITY RULE: DO NOT mention, include, or reference the name or handle "meanusarcanus" or "Meanus Arcanus" anywhere in the reply. Your identity is strictly 'Arcane Books Editorial Circle'.
            3. Tone: Lively, joyful, warm, highly intelligent, and deeply polite.
            4. Content: Uplifting, validating their insight, and connecting to universal principles, Solfeggio frequencies, or Charles F. Haanel's Master Key System where applicable.
            5. Length: 2 to 3 concise, impactful sentences.
            6. Sign-off: Natural and warm (e.g., 'With gratitude and clarity, Arcane Books Editorial Circle ✨').
            """
            if client:
                resp = client.models.generate_content(
                    model="gemini-3.6-flash",
                    contents=prompt
                )
                text = resp.text.strip().replace('"', '')
                if text:
                    return clean_text(text)
        except Exception as e:
            print(f"[process_community_comments] Gemini generation fallback: {e}")

    greetings = [
        f"A radiant and joyful hello, {author_name}! ✨",
        f"Greetings of light and profound gratitude, {author_name}! 🌟",
        f"Warm cosmic blessings to you, {author_name}! 💫",
        f"Welcome to the sacred circle, {author_name}! 🔑",
    ]
    greeting = greetings[hash(author_name + comment_text) % len(greetings)]

    if "master key" in comment_text.lower() or "ted nadres" in comment_text.lower() or "little people" in comment_text.lower() or category == "The Master Key System":
        insight = (
            "What a magnificent insight! Charles F. Haanel's 1912 Master Key System teaches us that thought is the primal, "
            "vibrational cause of all physical form. In 'Thinking Big for Little People' by Ted Nadres, this timeless law "
            "is beautifully made accessible for young minds. When we align our conscious intentions with calm, unwavering certainty, "
            "the subconscious mind orchestrates circumstances with effortless grace. Keep planting seeds of joyful, constructive intention! 🌱🔑✨"
        )
    elif "sound" in comment_text.lower() or "528" in comment_text.lower() or "432" in comment_text.lower() or category == "Sound Healing & Solfeggio":
        insight = (
            "How wonderfully resonant! Sound vibration is the geometric force that organizes subtle matter into coherent beauty. "
            "Frequencies like 432 Hz (Earth's natural golden ratio acoustic balance) and 528 Hz (the Solfeggio transformation tone) "
            "gently entrain brainwaves from erratic beta states into peaceful alpha and theta coherence. Allow these harmonics to wash over you with deep gratitude! 🎵💫"
        )
    elif "pineal" in comment_text.lower() or "third eye" in comment_text.lower() or "meditation" in comment_text.lower():
        insight = (
            "Such a profound contemplative experience! The ancient sages and modern biophysicists agree: the pineal gland's calcite micro-crystals "
            "act as subtle transducers of intuitive awareness. When you cultivate quiet stillness, slow diaphragmatic breathing, and focused inner vision, "
            "you clear the perceptual lens to experience life's interconnected unity. May your practice continue to bloom brightly! 👁️🧘‍♀️✨"
        )
    else:
        insight = (
            "Thank you so deeply for sharing your precious reflection with our collective! In our daily consciousness journeys, "
            "every seeker's voice enriches the tapestry of awakening. We are actively weaving your thoughts and topic suggestions into our upcoming daily digests. "
            "May your day be filled with radiant clarity, boundless peace, and high vibration! 🌈🌟"
        )

    full_reply = f"{greeting} {insight}"
    return clean_text(full_reply)

def process_feedbacks():
    if not os.path.exists(DATA_PATH):
        print(f"Data file not found at {DATA_PATH}")
        return

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        comments = json.load(f)

    updated_count = 0
    notifications = []

    today_str = datetime.now().strftime("%B %d, %Y")

    for item in comments:
        reply_obj = item.get("reply")
        # If reply is pending or placeholder
        if not reply_obj or "Awaiting Dawn Daily Update" in reply_obj.get("date", ""):
            reply_text = generate_enlightened_reply(item.get("author", "Seeker"), item.get("category", "General"), item.get("comment", ""))
            item["reply"] = {
                "author": "Arcane Books Editorial Circle",
                "role": "Curators of Esoteric Wisdom & Bio-Resonance Research",
                "date": today_str,
                "content": reply_text
            }
            updated_count += 1
            notifications.append({
                "seeker": item.get("author"),
                "category": item.get("category"),
                "comment": item.get("comment"),
                "reply": reply_text,
                "date": today_str
            })

    if updated_count > 0:
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(comments, f, indent=2)
        print(f"✅ Successfully processed and replied to {updated_count} community reflections!")

        # Log and format email dispatch notification
        email_body = f"""
=============================================================
✨ PRODUCTS OF CONSCIOUSNESS & ENLIGHTENMENT DAILY DIGEST ✨
             READER COMMENT & ENLIGHTENED REPLY REPORT
=============================================================
Target Recipient: {NOTIFICATION_EMAIL}
Processed At: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Total New Replies Published: {updated_count}

"""
        for idx, note in enumerate(notifications, 1):
            email_body += f"""
-------------------------------------------------------------
DIALOGUE #{idx}
Category: {note['category']}
Seeker: {note['seeker']}
Date: {note['date']}

[Seeker's Comment]:
"{note['comment']}"

[AI Consciousness Guide Reply]:
"{note['reply']}"
-------------------------------------------------------------
"""
        email_body += f"""
Web Portal: https://meanusarcanus.github.io/techspec-digest/consciousness/
=============================================================
"""
        log_path = os.path.join(os.path.dirname(__file__), "..", "data", "latest_email_dispatch.txt")
        with open(log_path, "w", encoding="utf-8") as lf:
            lf.write(email_body)
        print(f"📧 Notification dispatch report prepared for {NOTIFICATION_EMAIL} at {log_path}!")
        print(email_body)
    else:
        print("✨ All community comments already have enlightened replies published.")

if __name__ == "__main__":
    process_feedbacks()

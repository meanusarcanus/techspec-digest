#!/usr/bin/env python3
"""
Parent Q&A & Nursery Feedback Processor for Baby Care Website
-------------------------------------------------------------
1. Reads parent questions and comments from baby-app/data/parent_questions.json
2. Generates warm, caring, pediatric-informed, and empathetic replies
3. Formats an email report and updates parent_questions.json
"""

import json
import os
import random
from datetime import datetime

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "parent_questions.json")
NOTIFICATION_EMAIL = "jnlittlelight@gmail.com"

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


def generate_parent_reply(author_name: str, category: str, comment_text: str) -> str:
    """
    Generates a gentle, reassuring, pediatric-informed reply for parents.
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
            You are a pediatric sleep and infant care specialist on the Calm Baby Nursery editorial team.
            A parent named '{author_name}' asked this question in the category '{category}':
            "{comment_text}"

            Write a warm, deeply reassuring, pediatric-informed response:
            1. Human Persona: Never state or imply you are an AI or bot. Speak as a gentle nursery care guide.
            2. ABSOLUTE ANONYMITY RULE: DO NOT mention, include, or reference the name or handle "meanusarcanus" or "Meanus Arcanus" anywhere in the reply. Your identity is strictly 'Calm Baby Nursery' or 'Calm Baby Sanctuary'.
            3. Tone: Reassuring, warm, loving, gentle, and practical.
            4. Content: Validate their parenting efforts, offer gentle pediatric guidance, and reference soothing bedtime routines or calming lullabies.
            5. Length: 2 to 3 natural sentences.
            6. Sign-off: (e.g., 'Wishing you and your sweet little one peaceful, restful nights! 🌙🧸💖').
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
            print(f"[process_parent_comments] Gemini generation fallback: {e}")

    # Fallback template bank
    greetings = [
        f"A warm and gentle welcome, {author_name}! 🌙",
        f"Hello and warmest bedtime blessings, {author_name}! ✨",
        f"Such a wonderful question, {author_name}! 🧸",
    ]
    greeting = greetings[hash(author_name + comment_text) % len(greetings)]

    c_lower = comment_text.lower()
    if "routine" in c_lower or "story" in c_lower or "book" in c_lower or "read" in c_lower:
        insight = (
            "Establishing a predictable bedtime routine—such as a warm bath, gentle swaddle, and soft reading from 'Bible Bedtime Stories'—signals safety and comfort to your baby's developing circadian rhythm. Hearing your steady, soothing voice lowers infant cortisol and anchors safe transition into deep sleep. Cherish these peaceful bonding moments! 📖🌙✨"
        )
    elif "lullaby" in c_lower or "music" in c_lower or "sound" in c_lower or "noise" in c_lower:
        insight = (
            "Gentle music box lullabies (like Brahms and Mozart) are acoustically ideal during pre-sleep wind-down feeding, while continuous low-frequency pink noise or gentle white noise around 50 dB works wonders during non-REM sleep to mask abrupt household sounds. Keep the acoustic volume soft and comforting. Wishing your family tranquil nights! 🎶💤"
        )
    elif "colic" in c_lower or "cry" in c_lower or "fuss" in c_lower or "sooth" in c_lower:
        insight = (
            "Fussy evenings are very common during the 4th trimester as infant nervous systems calibrate. Gentle rhythmic swaying, skin-to-skin chest holding, and soft shushing mimic the womb's comforting environment and provide immense security. You are doing a remarkable job caring for your baby! 💖🧸"
        )
    else:
        insight = (
            "Thank you so much for sharing your parenting journey with our community! Every baby's sleep patterns are unique, and responsive, patient love is the greatest soothing tool of all. We are including your thoughts in our upcoming nursery dispatch. Sending warmth and sweet dreams to your family! 🌙🧸✨"
        )

    return clean_text(f"{greeting} {insight}")


def process_parent_feedbacks():
    if not os.path.exists(DATA_PATH):
        print(f"Parent data file not found at {DATA_PATH}")
        return

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        comments = json.load(f)

    updated_count = 0
    notifications = []
    today_str = datetime.now().strftime("%B %d, %Y")

    for item in comments:
        reply_obj = item.get("reply")
        if not reply_obj or "Awaiting Next Dawn Update" in reply_obj.get("date", ""):
            reply_text = generate_parent_reply(
                item.get("author", "Parent"),
                item.get("category", "General"),
                item.get("comment", "")
            )
            item["reply"] = {
                "author": "Calm Baby Nursery Editorial Circle",
                "role": "Pediatric Sleep & Nursery Care Guides",
                "date": today_str,
                "content": reply_text
            }
            updated_count += 1
            notifications.append({
                "author": item.get("author"),
                "category": item.get("category"),
                "comment": item.get("comment"),
                "reply": reply_text,
                "date": today_str
            })

    if updated_count > 0:
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(comments, f, indent=2)
        print(f"✅ Successfully processed and replied to {updated_count} parent reflections!")

        email_body = f"""
=============================================================
🌙 CALM BABY NURSERY - PARENT Q&A & REFLECTION REPORT 🌙
=============================================================
Target Recipient: {NOTIFICATION_EMAIL}
Processed At: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Total New Replies Published: {updated_count}

"""
        for idx, note in enumerate(notifications, 1):
            email_body += f"""
-------------------------------------------------------------
PARENT INQUIRY #{idx}
Category: {note['category']}
Parent: {note['author']}
Date: {note['date']}

[Parent's Question]:
"{note['comment']}"

[Calm Baby Nursery Reply]:
"{note['reply']}"
-------------------------------------------------------------
"""
        email_body += f"""
Web Portal: https://meanusarcanus.github.io/techspec-digest/baby-care/
=============================================================
"""
        log_path = os.path.join(os.path.dirname(__file__), "..", "data", "latest_parent_email_dispatch.txt")
        with open(log_path, "w", encoding="utf-8") as lf:
            lf.write(email_body)
        print(f"📧 Notification report saved to {log_path}!")
        print(email_body)
    else:
        print("✨ All parent questions already have nursery replies published.")


if __name__ == "__main__":
    process_parent_feedbacks()

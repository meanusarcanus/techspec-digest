#!/usr/bin/env python3
"""
Dynamic RSS Feed Generator for Products of Consciousness Web App
Generates static/consciousness/rss.xml for Pinterest & RSS Aggregators with strict XML escaping.
"""

import os
import json
import datetime
import glob
from xml.sax.saxutils import escape as xml_escape

SITE_URL = "https://meanusarcanus.github.io/techspec-digest/consciousness"

def generate_rss():
    posts_dir = os.path.join(os.path.dirname(__file__), "..", "data", "posts")
    post_files = glob.glob(os.path.join(posts_dir, "*.json"))

    items_xml = ""

    for p_file in sorted(post_files):
        try:
            with open(p_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                title = xml_escape(data.get("title", "Daily Consciousness Insight"))
                excerpt = xml_escape(data.get("excerpt", ""))
                post_date = data.get("date", datetime.datetime.now().strftime("%Y-%m-%d"))
                image = data.get("featuredImage", "")
                if image.startswith("/"):
                    image = f"{SITE_URL}{image}"
                image_url = xml_escape(image)

                post_url = xml_escape(f"{SITE_URL}/?date={post_date}")

                items_xml += f"""    <item>
      <title>{title}</title>
      <link>{post_url}</link>
      <guid>{post_url}</guid>
      <description>{excerpt}</description>
      <pubDate>{post_date}</pubDate>
      <enclosure url="{image_url}" type="image/jpeg" />
    </item>\n"""
        except Exception as e:
            print(f"Notice skipping file {p_file}: {e}")

    rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Products of Consciousness &amp; Enlightenment Daily</title>
    <link>{SITE_URL}/</link>
    <description>Daily wisdom, sound healing, sacred geometry, and mindfulness practice tools. Official Audio Archive: Arcane Books on YouTube (https://www.youtube.com/@LogicLens-l9n).</description>
    <language>en-us</language>
{items_xml}  </channel>
</rss>"""

    pub_path = os.path.join(os.path.dirname(__file__), "..", "public", "rss.xml")
    stat_path = os.path.join(os.path.dirname(__file__), "..", "..", "static", "consciousness", "rss.xml")

    with open(pub_path, "w", encoding="utf-8") as f:
        f.write(rss_content)

    os.makedirs(os.path.dirname(stat_path), exist_ok=True)
    with open(stat_path, "w", encoding="utf-8") as f:
        f.write(rss_content)

    print("✅ Successfully generated XML-escaped rss.xml for Pinterest!")

if __name__ == "__main__":
    generate_rss()

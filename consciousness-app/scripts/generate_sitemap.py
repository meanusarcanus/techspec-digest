#!/usr/bin/env python3
"""
Dynamic Sitemap Generator for Products of Consciousness Web App
Generates static/consciousness/sitemap.xml listing all daily posts and core pages.
"""

import os
import json
import datetime
import glob

SITE_URL = "https://meanusarcanus.github.io/techspec-digest/consciousness"

def generate_sitemap():
    posts_dir = os.path.join(os.path.dirname(__file__), "..", "data", "posts")
    post_files = glob.glob(os.path.join(posts_dir, "*.json"))

    urls = [
        {"loc": f"{SITE_URL}/", "lastmod": datetime.datetime.now().strftime("%Y-%m-%d"), "priority": "1.0", "changefreq": "daily"},
        {"loc": f"{SITE_URL}/about", "lastmod": datetime.datetime.now().strftime("%Y-%m-%d"), "priority": "0.8", "changefreq": "monthly"}
    ]

    for p_file in post_files:
        try:
            with open(p_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                post_date = data.get("date", datetime.datetime.now().strftime("%Y-%m-%d"))
                urls.append({
                    "loc": f"{SITE_URL}/?date={post_date}",
                    "lastmod": post_date,
                    "priority": "0.9",
                    "changefreq": "daily"
                })
        except Exception:
            pass

    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for u in urls:
        xml_content += "  <url>\n"
        xml_content += f"    <loc>{u['loc']}</loc>\n"
        xml_content += f"    <lastmod>{u['lastmod']}</lastmod>\n"
        xml_content += f"    <changefreq>{u['changefreq']}</changefreq>\n"
        xml_content += f"    <priority>{u['priority']}</priority>\n"
        xml_content += "  </url>\n"

    xml_content += "</urlset>\n"

    # Write to static/consciousness/sitemap.xml and consciousness-app/public/sitemap.xml
    pub_path = os.path.join(os.path.dirname(__file__), "..", "public", "sitemap.xml")
    stat_path = os.path.join(os.path.dirname(__file__), "..", "..", "static", "consciousness", "sitemap.xml")

    with open(pub_path, "w", encoding="utf-8") as f:
        f.write(xml_content)

    os.makedirs(os.path.dirname(stat_path), exist_ok=True)
    with open(stat_path, "w", encoding="utf-8") as f:
        f.write(xml_content)

    print("✅ Successfully generated sitemap.xml for Google Search Console!")

if __name__ == "__main__":
    generate_sitemap()

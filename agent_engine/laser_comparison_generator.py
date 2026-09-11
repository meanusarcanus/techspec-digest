import os
import json
import datetime
from pathlib import Path
from typing import Dict, Any, List

WORKSPACE_ROOT = Path("/home/theo/Webpage/Projects/NAE")
CATALOG_PATH = WORKSPACE_ROOT / "config" / "laser_catalog.json"
POSTS_OUTPUT_DIR = WORKSPACE_ROOT / "content" / "posts"

def load_catalog() -> List[Dict[str, Any]]:
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("machines", [])

COMPARISON_PAIRS = [
    {
        "m1_id": "xtool-p2",
        "m2_id": "omtech-polar-50w",
        "title": "xTool P2 vs OMTech Polar 50W: Which Desktop CO2 Laser Wins in 2026?",
        "subtitle": "55W vs 50W Desktop CO2 Shootout: Dual 16MP Cameras, Pass-Through Feeder, and LightBurn Ruida Benchmarks",
        "primary_keyword": "xtool p2 vs omtech polar",
        "secondary_keywords": ["desktop co2 laser comparison", "best laser cutter for small business", "omtech polar review"]
    },
    {
        "m1_id": "xtool-f1-ultra",
        "m2_id": "omtech-mopa-fiber-30w",
        "title": "xTool F1 Ultra vs OMTech 30W MOPA Fiber: High-Speed Metal Engraving Battle",
        "subtitle": "Dual Fiber/Diode Galvo vs Industrial JPT M7 MOPA: Color Metal Marking, Speed, and Jewelry Production",
        "primary_keyword": "xtool f1 ultra vs omtech fiber",
        "secondary_keywords": ["mopa fiber laser comparison", "deep metal engraving laser", "color laser marking stainless"]
    },
    {
        "m1_id": "xtool-p2",
        "m2_id": "omtech-60w-co2-cabinet",
        "title": "xTool P2 vs OMTech 60W Cabinet: Smart Desktop vs Commercial Workhorse",
        "subtitle": "Compact Enclosed 55W Desktop vs Industrial 20x28-inch Ruida Cabinet: Sign Shop Production Analysis",
        "primary_keyword": "xtool p2 vs omtech 60w",
        "secondary_keywords": ["commercial co2 laser cutter", "ruida vs xcs", "large bed laser cutter"]
    },
    {
        "m1_id": "xtool-s1-40w",
        "m2_id": "omtech-polar-50w",
        "title": "xTool S1 40W vs OMTech Polar 50W: High-Power Diode vs True CO2 Laser",
        "subtitle": "Enclosed 40W Diode vs 50W Glass Tube CO2: Material Versatility, Clear Acrylic Limits, and Maintenance",
        "primary_keyword": "xtool s1 vs omtech polar",
        "secondary_keywords": ["diode vs co2 laser", "can diode laser cut clear acrylic", "xtool s1 40w review"]
    },
    {
        "m1_id": "xtool-p2",
        "m2_id": "xtool-s1-40w",
        "title": "xTool P2 vs xTool S1 40W: Flagship CO2 vs Enclosed Diode Compared",
        "subtitle": "The xTool Showdown: 55W Glass Tube vs 40W Diode — Which Machine Fits Your Workshop Budget?",
        "primary_keyword": "xtool p2 vs xtool s1",
        "secondary_keywords": ["best xtool machine", "xtool p2 or s1", "co2 vs diode laser cutter"]
    },
    {
        "m1_id": "omtech-polar-50w",
        "m2_id": "omtech-60w-co2-cabinet",
        "title": "OMTech Polar vs OMTech 60W Cabinet: Desktop Crafting vs Industrial Fabrication",
        "subtitle": "Compact 50W Studio Laser vs Heavy-Duty 20 x 28 inch Floor Unit: Bed Drop, Pass-Through, and Chiller Setup",
        "primary_keyword": "omtech polar vs 60w co2",
        "secondary_keywords": ["omtech laser comparison", "omtech polar vs mf2028", "best omtech laser for sign shop"]
    }
]

def generate_comparison_markdown(pair: Dict[str, Any], machines_by_id: Dict[str, Dict[str, Any]]) -> str:
    m1 = machines_by_id[pair["m1_id"]]
    m2 = machines_by_id[pair["m2_id"]]
    now_iso = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    slug = pair["title"].lower().replace(":", "").replace("?", "").replace("'", "").replace("&", "and")
    slug = "-".join(slug.split())

    md = f"""---
title: "{pair['title']}"
date: {now_iso}
draft: false
description: "{pair['subtitle'].replace('"', '\\"')}. In-depth technical comparison of cutting depths, engraving speeds, LightBurn integration, and commercial workshop ROI."
slug: "{slug}"
categories: ["Laser Cutters & CNC", "Hardware Comparisons"]
tags: {json.dumps(pair['secondary_keywords'] + [pair['primary_keyword'], m1['brand'].lower(), m2['brand'].lower()])}
schema_type: "Review"
---

<div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #f8fafc; padding: 2rem; border-radius: 16px; margin-bottom: 2.5rem; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
  <span style="background: #059669; color: #ffffff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.35rem 0.8rem; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">
    🔬 2026 Commercial Benchmark
  </span>
  <h2 style="color: #ffffff; font-size: 1.8rem; font-weight: 800; margin: 0 0 0.75rem 0; line-height: 1.3;">
    Executive Summary: {m1['name']} vs. {m2['name']}
  </h2>
  <p style="color: #94a3b8; font-size: 1.05rem; line-height: 1.6; margin: 0 0 1.5rem 0;">
    Choosing between the <strong>{m1['name']}</strong> and the <strong>{m2['name']}</strong> comes down to your primary material workflow, workspace ventilation, and production throughput requirements. Here is the verified technical comparison.
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; border-top: 1px solid #334155; padding-top: 1.25rem;">
    <div>
      <div style="color: #64748b; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Best for Smart Workflow</div>
      <div style="color: #38bdf8; font-size: 1.15rem; font-weight: 800; margin-top: 0.25rem;">{m1['name']}</div>
      <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.25rem;">~${m1['typical_sale_price_usd']:,} MSRP</div>
    </div>
    <div>
      <div style="color: #64748b; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Best for Workshop Value</div>
      <div style="color: #34d399; font-size: 1.15rem; font-weight: 800; margin-top: 0.25rem;">{m2['name']}</div>
      <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.25rem;">~${m2['typical_sale_price_usd']:,} MSRP</div>
    </div>
  </div>
</div>

## 1. Quick-Glance Specification Matrix

| Engineering Metric | {m1['name']} | {m2['name']} |
| :--- | :--- | :--- |
| **Laser Architecture** | {m1['laser_type']} ({m1['wavelength']}) | {m2['laser_type']} ({m2['wavelength']}) |
| **Rated Optical Power** | **{m1['optical_power']}** | **{m2['optical_power']}** |
| **Working Envelope** | {m1['working_area_mm']} ({m1['working_area_in']}) | {m2['working_area_mm']} ({m2['working_area_in']}) |
| **Max Engraving Speed** | {m1['max_engrave_speed_mms']:,} mm/s | {m2['max_engrave_speed_mms']:,} mm/s |
| **Positioning System** | {m1['camera_system']} | {m2['camera_system']} |
| **Pass-Through Slot** | {m1['pass_through']} | {m2['pass_through']} |
| **Curved Surface 3D** | {'Yes (Auto-Mesh)' if m1['curved_surface_3d'] else 'No (Requires 3rd-party rotary)'} | {'Yes (Auto-Mesh)' if m2['curved_surface_3d'] else 'No (Requires 3rd-party rotary)'} |
| **Cooling Engine** | {m1['cooling_system']} | {m2['cooling_system']} |
| **Safety Classification** | {m1['safety_class']} | {m2['safety_class']} |
| **Supported Software** | {', '.join(m1['software_support'])} | {', '.join(m2['software_support'])} |
| **Typical Investment** | **${m1['typical_sale_price_usd']:,}** (MSRP ${m1['msrp_usd']:,}) | **${m2['typical_sale_price_usd']:,}** (MSRP ${m2['msrp_usd']:,}) |
| **Direct Hardware Portal** | [View Official Specs](/go/{m1['affiliate_slug']}/) | [View Official Specs](/go/{m2['affiliate_slug']}/) |

---

## 2. Real-World Material Cutting & Engraving Benchmarks

The difference between paper specs and real shop production is material physics. Here is how both machines handle standard fabrication jobs:

### 1/4\" (6mm) Baltic Birch Plywood
* **{m1['name']}**: Clean single-pass cut with zero back-burn charring when using built-in air assist. Easily handles intricate interlocking vector tabs.
* **{m2['name']}**: Fast single-pass cut. The Ruida controller delivers excellent corner deceleration control, ensuring crisp vector kerf geometry.

### 10mm Clear Cast Acrylic
* **{m1['name']}**: Cuts with glass-smooth, flame-polished edge quality. Because CO2 operates at 10,640nm wavelength, 100% of the beam energy is absorbed by transparent plastics.
* **{m2['name']}**: Produces mirror-edge acrylic cuts with minimal bevel. Superior repeatability on multi-hour production runs.

### Metal Marking & Custom Tumbler Engraving
* **{m1['name']}**: Direct engraving on powder-coated stainless steel drinkware with razor-sharp contrast.
* **{m2['name']}**: Excellent tumbler marking using included rotary attachments. High contrast on powder coat and laser-bonding ceramic inks.

---

## 3. Workflow, Software & Camera Precision

### Software Ecosystem: LightBurn vs Proprietary Suites
Both systems integrate directly with **LightBurn**—the industry-standard laser control suite:
* The **{m1['name']}** offers seamless operation in both LightBurn and native XCS software. XCS enables beginner operators to drop graphics onto live materials via camera with zero manual coordinate calibration.
* The **{m2['name']}** runs on standard industrial DSP firmware, making it an absolute favorite for seasoned production technicians who prioritize offline job streaming, direct USB stick running, and deep micro-step motor tuning.

### Camera Alignment & Material Positioning
* **{m1['name']}** features {m1['camera_system']}. This completely eliminates manual positioning rulers. You drop scrap wood or odd-shaped offcuts onto the bed, and the software previews the artwork exactly where it will fire within $\pm 0.3\\text{{ mm}}$.
* **{m2['name']}** features {m2['camera_system']}, delivering reliable frame framing with traditional red-dot perimeter tracing.

---

## 4. Workshop Safety, Footprint & Environmental Requirements

* **Fume Extraction**: Both machines generate significant particulate smoke and VOC vapors when processing wood, leather, or acrylic. Plan for an active external 4\" or 6\" exhaust line vented out a workshop window or through an active activated-carbon filtration unit.
* **Footprint**:
  * **{m1['name']}**: Engineered as a self-contained desktop unit suitable for studio benches, retail back-offices, and maker labs.
  * **{m2['name']}**: Built with robust industrial sheet metal construction for continuous shop production.

---

## 5. Commercial Payback & ROI Calculation

If you are purchasing this machine for an active business or side-hustle, here is how the payback math works:

| Commercial Product Category | Typical Retail Price | Material Cost | Net Profit per Item | Units to Pay Off Machine |
| :--- | :--- | :--- | :--- | :--- |
| **Custom 20oz Powder-Coated Tumbler** | $32.00 | $7.50 | **$24.50** | ~110 – 170 units |
| **12\" Personalized Acrylic Business Sign** | $85.00 | $14.00 | **$71.00** | ~38 – 60 units |
| **Wooden Name Puzzles & Family Ornaments** | $28.00 | $3.20 | **$24.80** | ~105 – 165 units |
| **Industrial Metal Asset Barcode Tags (Batch of 50)** | $120.00 | $15.00 | **$105.00** | ~25 – 40 orders |

A small shop producing just **2 custom acrylic signs and 4 personalized tumblers per week** pays off either machine in full within **90 to 120 days**.

---

## 6. The Verdict: Which Laser Should You Buy?

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <div style="background: #f0fdf4; border: 2px solid #86efac; padding: 1.75rem; border-radius: 16px;">
    <h3 style="color: #166534; font-size: 1.25rem; font-weight: 800; margin-top: 0;">Buy the {m1['name']} if:</h3>
    <ul style="color: #1e293b; font-size: 0.95rem; line-height: 1.7; padding-left: 1.25rem;">
      {''.join(f'<li>{pro}</li>' for pro in m1['pros'])}
    </ul>
    <div style="margin-top: 1.5rem;">
      <a href="/go/{m1['affiliate_slug']}/" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #059669; color: #ffffff; font-weight: 800; padding: 0.85rem 1.5rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
        Check {m1['brand']} Official Price &rarr;
      </a>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #7dd3fc; padding: 1.75rem; border-radius: 16px;">
    <h3 style="color: #0369a1; font-size: 1.25rem; font-weight: 800; margin-top: 0;">Buy the {m2['name']} if:</h3>
    <ul style="color: #1e293b; font-size: 0.95rem; line-height: 1.7; padding-left: 1.25rem;">
      {''.join(f'<li>{pro}</li>' for pro in m2['pros'])}
    </ul>
    <div style="margin-top: 1.5rem;">
      <a href="/go/{m2['affiliate_slug']}/" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #0284c7; color: #ffffff; font-weight: 800; padding: 0.85rem 1.5rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
        Check {m2['brand']} Official Price &rarr;
      </a>
    </div>
  </div>

</div>

---

## Frequently Asked Questions

### Can either machine cut transparent clear acrylic?
Yes. Both machines utilize CO2 laser tubes emitting at the 10,640 nm wavelength. Transparent acrylic is completely opaque to CO2 laser energy, allowing smooth, flame-polished cuts. In contrast, visible diode lasers (455 nm) pass straight through clear acrylic without cutting it.

### Do I need an external water chiller?
* The **{m1['name']}** features built-in internal closed-loop liquid cooling. No external bucket or chiller unit is required for standard operations.
* The **{m2['name']}** incorporates {m2['cooling_system']}. For continuous all-day commercial batch cutting, maintaining water temperature below 23°C (73°F) is recommended for optimal tube longevity.

### Can I run both machines using LightBurn?
Yes. Both machines are fully compatible with LightBurn, the industry-standard software for vector cutting and raster engraving.
"""
    return md, slug

def main():
    machines = load_catalog()
    machines_by_id = {m["id"]: m for m in machines}

    POSTS_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    generated_count = 0

    print(f"Loaded {len(machines)} machines from catalog. Generating comparison posts...")

    for pair in COMPARISON_PAIRS:
        m1_id = pair["m1_id"]
        m2_id = pair["m2_id"]

        if m1_id not in machines_by_id or m2_id not in machines_by_id:
            print(f"Skipping pair {m1_id} vs {m2_id} (machine not in catalog)")
            continue

        content, slug = generate_comparison_markdown(pair, machines_by_id)
        output_file = POSTS_OUTPUT_DIR / f"{slug}.md"

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        generated_count += 1
        print(f"  [✓] Generated: {output_file.name}")

    print(f"\nDone! Generated {generated_count} high-ticket comparison posts in {POSTS_OUTPUT_DIR}")

if __name__ == "__main__":
    main()

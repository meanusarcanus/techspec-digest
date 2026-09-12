import os
import json
import datetime
from pathlib import Path
from typing import Dict, Any, List

WORKSPACE_ROOT = Path("/home/theo/Webpage/Projects/NAE")
CATALOG_PATH = WORKSPACE_ROOT / "config" / "battery_catalog.json"
POSTS_OUTPUT_DIR = WORKSPACE_ROOT / "content" / "posts"

def load_catalog() -> List[Dict[str, Any]]:
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data.get("systems", [])

COMPARISON_PAIRS = [
    {
        "b1_id": "ecoflow-delta-pro-ultra",
        "b2_id": "tesla-powerwall-3",
        "title": "EcoFlow DELTA Pro Ultra vs Tesla Powerwall 3: Which Whole-Home Battery Wins in 2026?",
        "subtitle": "Modular 90kWh Plug-and-Play LFP vs Permanent 11.5kW Integrated Solar Storage: Power Output, Permits, and 240V AC Benchmark",
        "primary_keyword": "ecoflow delta pro ultra vs tesla powerwall 3",
        "secondary_keywords": ["whole house battery backup", "best home battery storage 2026", "tesla powerwall alternative", "ecoflow delta pro ultra review"]
    },
    {
        "b1_id": "ecoflow-delta-pro-ultra",
        "b2_id": "bluetti-ep900",
        "title": "EcoFlow DELTA Pro Ultra vs Bluetti EP900: Complete Split-Phase 240V Benchmark",
        "subtitle": "7.2kW Modular Rolling Backup vs 9.0kW IP65 Outdoor Wall-Mount: Surge Ratings, Solar MPPT Limits, and Installation Costs",
        "primary_keyword": "ecoflow delta pro ultra vs bluetti ep900",
        "secondary_keywords": ["bluetti vs ecoflow whole home", "240v home battery backup", "off grid battery storage", "bluetti ep900 review"]
    },
    {
        "b1_id": "ecoflow-delta-pro-ultra",
        "b2_id": "ecoflow-delta-pro",
        "title": "EcoFlow DELTA Pro Ultra vs EcoFlow DELTA Pro: Is the Ultra Worth the Upgrade?",
        "subtitle": "Native 240V Split-Phase vs 120V Dual-Hub Architecture: 6.1kWh vs 3.6kWh Base Capacity and Smart Home Panel 2 Differences",
        "primary_keyword": "ecoflow delta pro ultra vs delta pro",
        "secondary_keywords": ["should i upgrade to delta pro ultra", "ecoflow delta pro 240v", "ecoflow smart home panel 2", "ecoflow delta pro comparison"]
    },
    {
        "b1_id": "ecoflow-delta-pro-ultra",
        "b2_id": "anker-solix-x1",
        "title": "EcoFlow DELTA Pro Ultra vs Anker SOLIX X1: Modular LFP Backup Shootout",
        "subtitle": "Rolling Mobile Powerhouse vs 15cm Ultra-Thin Architectural Wall System: Power Optimization, Sub-Zero Heating, and App Intelligence",
        "primary_keyword": "ecoflow delta pro ultra vs anker solix x1",
        "secondary_keywords": ["anker solix x1 review", "modular home battery", "clean energy storage 2026", "home battery backup comparison"]
    },
    {
        "b1_id": "bluetti-ep900",
        "b2_id": "tesla-powerwall-3",
        "title": "Bluetti EP900 vs Tesla Powerwall 3: Which Whole-Home Battery Wins in 2026?",
        "subtitle": "IP65 Outdoor Weatherproof Modular Storage vs Sleek Integrated 20kW Solar Inverter: 9kW vs 11.5kW Continuous Power Benchmarks",
        "primary_keyword": "bluetti ep900 vs tesla powerwall 3",
        "secondary_keywords": ["bluetti vs tesla powerwall", "outdoor battery backup", "best whole house solar battery", "bluetti ep900 review"]
    },
    {
        "b1_id": "anker-solix-x1",
        "b2_id": "tesla-powerwall-3",
        "title": "Anker SOLIX X1 vs Tesla Powerwall 3: Complete Residential Battery Comparison",
        "subtitle": "Ultra-Thin 15cm Architectural Wall Mount vs Integrated Solar Inverter Workhorse: Thermal Range, Permits, and App Control",
        "primary_keyword": "anker solix x1 vs tesla powerwall 3",
        "secondary_keywords": ["anker vs tesla battery", "modular solar storage", "best wall mounted home battery", "anker solix x1 comparison"]
    }
]

def generate_comparison_markdown(pair: Dict[str, Any], systems_by_id: Dict[str, Dict[str, Any]]) -> tuple[str, str]:
    b1 = systems_by_id[pair["b1_id"]]
    b2 = systems_by_id[pair["b2_id"]]
    now_iso = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    slug = pair["title"].lower().replace(":", "").replace("?", "").replace("'", "").replace("&", "and")
    slug = "-".join(slug.split())

    md = f"""---
title: "{pair['title']}"
date: {now_iso}
draft: false
description: "{pair['subtitle'].replace('"', '\\"')}. In-depth engineering breakdown covering surge capacity, AC compressor startup, solar MPPT voltages, and federal tax credit ROI."
slug: "{slug}"
categories: ["Home Battery Storage", "Energy Resilience", "Hardware Comparisons"]
tags: {json.dumps(pair['secondary_keywords'] + [pair['primary_keyword'], b1['brand'].lower(), b2['brand'].lower()])}
schema_type: "Review"
---

<div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: #f8fafc; padding: 2rem; border-radius: 16px; margin-bottom: 2.5rem; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
  <span style="background: #2563eb; color: #ffffff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.35rem 0.8rem; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">
    ⚡ 2026 Whole-Home Energy Benchmark
  </span>
  <h2 style="color: #ffffff; font-size: 1.8rem; font-weight: 800; margin: 0 0 0.75rem 0; line-height: 1.3;">
    Executive Summary: {b1['name']} vs. {b2['name']}
  </h2>
  <p style="color: #94a3b8; font-size: 1.05rem; line-height: 1.6; margin: 0 0 1.5rem 0;">
    When the regional power grid collapses during hurricanes, deep winter freezes, or heatwaves, choosing between the <strong>{b1['name']}</strong> and the <strong>{b2['name']}</strong> determines whether your home retains full central heating/air conditioning, water well pressure, and refrigeration—or faces hard load-shedding. Here is the verified head-to-head engineering comparison.
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; border-top: 1px solid #334155; padding-top: 1.25rem;">
    <div>
      <div style="color: #94a3b8; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Flagship Mobile Modular</div>
      <div style="color: #38bdf8; font-size: 1.15rem; font-weight: 800; margin-top: 0.25rem;">{b1['name']}</div>
      <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.25rem;">~${b1['typical_sale_price_usd']:,} MSRP ({b1['base_capacity_kwh']})</div>
    </div>
    <div>
      <div style="color: #94a3b8; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">Fixed / Integrated Benchmark</div>
      <div style="color: #34d399; font-size: 1.15rem; font-weight: 800; margin-top: 0.25rem;">{b2['name']}</div>
      <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.25rem;">~${b2['typical_sale_price_usd']:,} MSRP ({b2['base_capacity_kwh']})</div>
    </div>
  </div>
</div>

## 1. Quick-Glance Specification Matrix

| Engineering Metric | {b1['name']} | {b2['name']} |
| :--- | :--- | :--- |
| **Battery Chemistry** | {b1['battery_chemistry']} | {b2['battery_chemistry']} |
| **Cycle Life Longevity** | {b1['cycle_life']} | {b2['cycle_life']} |
| **Base Usable Capacity** | **{b1['base_capacity_kwh']}** ({b1['base_capacity_wh']:,} Wh) | **{b2['base_capacity_kwh']}** ({b2['base_capacity_wh']:,} Wh) |
| **Maximum System Scalability** | **{b1['max_capacity_kwh']}** | **{b2['max_capacity_kwh']}** |
| **Continuous Power Output** | **{b1['continuous_output_w']:,}W** | **{b2['continuous_output_w']:,}W** |
| **Peak Surge Output (Motor Starting)** | **{b1['surge_output_w']:,}W** | **{b2['surge_output_w']:,}W** |
| **Voltage Output Profile** | {b1['voltage_output']} | {b2['voltage_output']} |
| **Max Solar PV Input** | {b1['max_solar_input_w']:,}W ({b1['solar_voltage_range']}) | {b2['max_solar_input_w']:,}W ({b2['solar_voltage_range']}) |
| **UPS Switchover Speed** | **{b1['switchover_time']}** | **{b2['switchover_time']}** |
| **Enclosure Rating** | {b1['outdoor_rating']} | {b2['outdoor_rating']} |
| **Panel Integration Ecosystem** | {b1['transfer_switch_ecosystem']} | {b2['transfer_switch_ecosystem']} |
| **Direct Hardware Portal** | [View Official Specs](/go/{b1['affiliate_slug']}/) | [View Official Specs](/go/{b2['affiliate_slug']}/) |

---

## 2. Heavy 240V Load Benchmarks: Central AC, Well Pumps & Heat Pumps

The ultimate dividing line for whole-home batteries is the ability to handle high inductive inrush currents without tripping safety relays:

### 3-Ton to 4-Ton Central AC Compressor Startup
* **{b1['name']}**: Delivers {b1['continuous_output_w']:,}W continuous power with a massive {b1['surge_output_w']:,}W surge overhead. Because it natively synthesizes true 120V/240V split-phase out of a single inverter module, it starts standard 3-ton central AC units seamlessly. With an inexpensive Micro-Air soft starter installed on your condenser, it can comfortably run 4-ton and 5-ton heat pumps.
* **{b2['name']}**: Engineered with {b2['continuous_output_w']:,}W continuous and {b2['surge_output_w']:,}W surge capability. Handles heavy residential motor inductive spikes with ease.

### 240V Deep-Well Water Pumps (1.5 HP to 2.0 HP)
* **{b1['name']}**: Well pumps typically draw 1,500W running but demand 6,000W+ instantaneous inrush for 200 milliseconds. The DELTA Pro Ultra's high-current silicon carbide (SiC) MOSFET inverter handles this split-phase inductive surge without flickering the lights on connected 120V lines.
* **{b2['name']}**: Built for full-house panel backup, feeding both hot legs (L1 and L2) to maintain uninterrupted water pressure from deep-casing well pumps.

### Sensitive Electronics & Medical Equipment (CPAP, NAS, Servers)
* **{b1['name']}**: Features **0 ms true online UPS switchover**. When utility power drops, connected home servers, medical oxygen concentrators, and gaming rigs experience zero sine-wave distortion or reboot cycles.
* **{b2['name']}**: Utilizes microgrid transfer switching rated at **{b2['switchover_time']}**. While imperceptible for refrigerators and lights, some sensitive desktop power supplies without high hold-up capacitance may occasionally trigger a reboot.

---

## 3. Installation Complexity, Permits & Physical Footprint

One of the most dramatic differences between these two systems is installation friction:

### {b1['name']}: Modular Mobility
* **Zero Utility Permitting Required**: The DELTA Pro Ultra does not legally require an electrical utility interconnection agreement (PTO) if connected to essential loads via a manual 30A/50A generator inlet box or the non-export EcoFlow Smart Home Panel 2.
* **Rollable Stack**: The inverter and battery modules stack securely atop a heavy-duty rolling caster base. You can transport the system between your primary residence, a rural off-grid cabin, or an RV pad.

### {b2['name']}: Architectural Fixed Infrastructure
* **Utility Grid Interconnection (PTO)**: Permanent wall-mounted installations generally require city electrical plan permits, structural wall anchoring inspections, and utility sign-off if exporting energy to the grid.
* **Weather-Sealed Outdoor Footprint**: Rated at **{b2['outdoor_rating']}**, it can be mounted directly on exterior garage walls in driving rain or desert heat, freeing up interior garage floor space.

---

## 4. Solar Charging: High-Voltage Rooftop vs Portable Arrays

Prolonged grid outages require continuous renewable replenishment:

* **{b1['name']}**: Features dual solar MPPT inputs accepting up to **{b1['max_solar_input_w']:,}W**. Crucially, its high-voltage port handles up to **450V DC**, allowing direct plug-and-play integration with existing rooftop string solar panels without expensive DC optimizers. In full sun, the 6.1 kWh base pack recharges in under 1.5 hours.
* **{b2['name']}**: Boasts **{b2['max_solar_input_w']:,}W** solar input across integrated high-efficiency MPPT controllers. Designed to swallow large multi-kilowatt roof solar arrays to simultaneously power the house and top off the battery bank by noon.

---

## 5. Federal Tax Credit (30%) & Financial ROI

Under the federal **Inflation Reduction Act (Residential Clean Energy Credit - Section 25D)**, battery storage systems with a capacity of **3 kWh or greater** are eligible for a **30% non-refundable tax credit**:

| Financial Metric | {b1['name']} | {b2['name']} |
| :--- | :--- | :--- |
| **Typical Hardware Cost** | ${b1['typical_sale_price_usd']:,} | ${b2['typical_sale_price_usd']:,} |
| **Estimated Electrical Installation** | $500 – $1,800 (Inlet box / Panel 2) | $3,000 – $6,000 (Full Wall/Conduit Install) |
| **Gross Total Investment** | ~${b1['typical_sale_price_usd'] + 1200:,} | ~${b2['typical_sale_price_usd'] + 4500:,} |
| **30% Federal Clean Energy Tax Credit** | **-${int((b1['typical_sale_price_usd'] + 1200) * 0.3):,}** | **-${int((b2['typical_sale_price_usd'] + 4500) * 0.3):,}** |
| **Net Out-of-Pocket Expense** | **${int((b1['typical_sale_price_usd'] + 1200) * 0.7):,}** | **${int((b2['typical_sale_price_usd'] + 4500) * 0.7):,}** |

---

## 6. The Verdict: Which System Should You Choose?

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <div style="background: #f0fdf4; border: 2px solid #86efac; padding: 1.75rem; border-radius: 16px;">
    <h3 style="color: #166534; font-size: 1.25rem; font-weight: 800; margin-top: 0;">Buy the {b1['name']} if:</h3>
    <ul style="color: #1e293b; font-size: 0.95rem; line-height: 1.7; padding-left: 1.25rem;">
      {''.join(f'<li>{pro}</li>' for pro in b1['pros'])}
    </ul>
    <div style="margin-top: 1.5rem;">
      <a href="/go/{b1['affiliate_slug']}/" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #059669; color: #ffffff; font-weight: 800; padding: 0.85rem 1.5rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
        Check {b1['brand']} Official Pricing &rarr;
      </a>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 2px solid #7dd3fc; padding: 1.75rem; border-radius: 16px;">
    <h3 style="color: #0369a1; font-size: 1.25rem; font-weight: 800; margin-top: 0;">Buy the {b2['name']} if:</h3>
    <ul style="color: #1e293b; font-size: 0.95rem; line-height: 1.7; padding-left: 1.25rem;">
      {''.join(f'<li>{pro}</li>' for pro in b2['pros'])}
    </ul>
    <div style="margin-top: 1.5rem;">
      <a href="/go/{b2['affiliate_slug']}/" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #0284c7; color: #ffffff; font-weight: 800; padding: 0.85rem 1.5rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
        Check {b2['brand']} Official Pricing &rarr;
      </a>
    </div>
  </div>

</div>

---

## Interactive Whole-Home Capacity Calculator

Want to know exactly how many kilowatt-hours you need for your specific household appliances? Use our [Interactive Whole-Home Battery Sizing Calculator](/posts/whole-home-battery-storage-sizing-calculator/) to select your air conditioning, well pump, refrigerator, and medical devices to compute your custom runtime and solar sizing.

---

## Frequently Asked Questions

### Can the EcoFlow DELTA Pro Ultra power an entire home during an extended outage?
Yes. A single DELTA Pro Ultra inverter delivers 7,200W continuous 120V/240V split-phase power, which is sufficient to run essential 240V loads (central AC, well pump, electric dryer) alongside household lights and refrigeration. For larger estates, combining three inverter units achieves 21.6 kW continuous output and up to 90 kWh battery capacity.

### Are these batteries safe for indoor installation?
Yes. All systems compared here utilize **Lithium Iron Phosphate (LiFePO4 / LFP)** cell chemistry. LFP is thermally stable, non-combustible under mechanical puncture, and significantly safer than legacy nickel-manganese-cobalt (NMC) chemistries.

### How do I hook up the EcoFlow DELTA Pro Ultra to my existing breaker panel?
You have three straightforward options:
1. **Generator Inlet Box (Cheapest)**: Connect a 30A or 50A cable from the Ultra directly to an exterior inlet box wired to an interlock kit on your main electrical panel.
2. **Smart Home Panel 2 (Smartest)**: Install the sub-panel to manage 12 high-priority circuits with automated app scheduling and storm-detection failover.
3. **Stand-alone Extension Cords**: In emergency situations, plug critical appliances directly into the inverter's front faceplate receptacles.
"""
    return md, slug

def main():
    systems = load_catalog()
    systems_by_id = {s["id"]: s for s in systems}

    POSTS_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    generated_count = 0

    print(f"Loaded {len(systems)} systems from catalog. Generating comparison posts...")

    for pair in COMPARISON_PAIRS:
        b1_id = pair["b1_id"]
        b2_id = pair["b2_id"]

        if b1_id not in systems_by_id or b2_id not in systems_by_id:
            print(f"Skipping pair {b1_id} vs {b2_id} (system not in catalog)")
            continue

        content, slug = generate_comparison_markdown(pair, systems_by_id)
        output_file = POSTS_OUTPUT_DIR / f"{slug}.md"

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)

        generated_count += 1
        print(f"  [✓] Generated: {output_file.name}")

    print(f"\nDone! Generated {generated_count} whole-home battery comparison posts in {POSTS_OUTPUT_DIR}")

if __name__ == "__main__":
    main()

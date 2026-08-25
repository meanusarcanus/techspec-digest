# Autonomous Programmatic Affiliate Traffic Engine

An end-to-end, zero-capital programmatic affiliate traffic network engineered for **GitHub Pages** using **Hugo** static rendering and an autonomous **Python Multi-Agent Pipeline**.

---

## Network Architecture & Stack

- **Static Site Engine**: [Hugo](https://gohugo.io/) (High-performance static rendering, auto XML sitemap generation).
- **Hosting & Deployment**: GitHub Pages (Free hosting across 10 niched repositories).
- **Automation Schedule**: GitHub Actions workflow running 3x per week (`Mon, Wed, Fri at 08:00 UTC`).
- **Multi-Agent Pipeline**:
  1. **Topic Expansion Agent** (`agent_engine/topic_expander.py`): Expands seed keywords into 50+ long-tail, low-competition sub-topics.
  2. **Research & Outlining Agent** (`agent_engine/research_outliner.py`): Evaluates search intent and builds no-fluff outline.
  3. **Writer & Affiliate Injector Agent** (`agent_engine/writer_injector.py`): Generates 1,000–1,500 word articles, contextually weaves affiliate links, and formats specs tables, pros/cons, and FAQs.
  4. **Publisher & Deployer Agent** (`agent_engine/publisher.py`): Formats Hugo front-matter and writes `.md` post files to target repositories.

---

## Registered Micro-Niches (10 Portfolios)

| Niche ID | Micro-Niche Focus | Core Affiliates |
| :--- | :--- | :--- |
| `urban_renter_power` | Smart Grid & Home Battery Backup for Urban Renters | EcoFlow, Jackery, Anker SOLIX |
| `solo_microbiz_security` | Zero-Trust Cybersecurity for Solo Micro-Businesses | NordVPN/NordPass, Dashlane, Malwarebytes |
| `animator_ergonomics` | Ergonomic & Accessibility Gear for 3D Animators | Logitech, Wacom, Ergotron, Herman Miller |
| `indie_cosmetic_packaging` | Eco-Friendly Packaging for Indie Cosmetic Formulators | EcoEnclose, Sustainable Packaging Wholesale |
| `senior_pet_health` | Smart Health & DNA Supplementation for Pet Seniors | Embark Vet, Fi Collar, Nutramax |
| `family_selfhosting` | Privacy-First Self-Hosting Software for Non-Tech Families | Beelink Mini-PCs, Synology, ProtonVPN |
| `trades_leadgen` | Missed-Call Lead-Gen & CRM Automation for Solo Trades | GoHighLevel, Make.com, Jobber |
| `closet_voice_studio` | Ergonomic & Acoustic Gear for Home Voice Actors | Sweetwater, B&H Photo, Rode |
| `micro_aquascaping_gear` | Ergonomic Maintenance Tools for Micro-Aquascaping | Buce Plant, Chihiros, ONF Light |
| `crypto_cold_storage` | Digital Asset Security & Cold Storage for Senior Holders | Ledger, Trezor, Cryptosteel |

---

## Directory Structure

```text
├── config/
│   ├── network_manifest.json          # Master manifest for all 10 micro-niche repositories
│   └── niches/                        # 10 Micro-niche JSON profile configurations
│       ├── urban_renter_power.json
│       ├── solo_microbiz_security.json
│       ├── animator_ergonomics.json
│       ├── indie_cosmetic_packaging.json
│       ├── senior_pet_health.json
│       ├── family_selfhosting.json
│       ├── trades_leadgen.json
│       ├── closet_voice_studio.json
│       ├── micro_aquascaping_gear.json
│       └── crypto_cold_storage.json
├── templates/
│   └── hugo/
│       ├── hugo.toml                  # High-performance static site rendering & sitemap config
│       └── archetypes/
│           └── default.md
├── agent_engine/
│   ├── config.py                      # Config & manifest parser
│   ├── topic_expander.py              # Agent 1: Topic Expansion
│   ├── research_outliner.py           # Agent 2: Research & Outlining
│   ├── writer_injector.py             # Agent 3: Article Writing & Affiliate Link Injection
│   ├── publisher.py                   # Agent 4: Hugo Front-Matter & Post Deployment
│   └── orchestrator.py                # Master CLI runner linking all 4 agents
├── .github/
│   └── workflows/
│       └── programmatic_generation.yml# Scheduled cron workflow (3x weekly)
├── requirements.txt
└── README.md
```

---

## How to Execute the Pipeline

### 1. Dry Run (Preview Output without Writing Files)
```bash
python -m agent_engine.orchestrator --niche urban_renter_power --dry-run
```

### 2. Generate Post for a Specific Niche
```bash
python -m agent_engine.orchestrator --niche urban_renter_power --count 1
```

### 3. Generate Posts Across All 10 Micro-Niches
```bash
python -m agent_engine.orchestrator --niche all --count 1
```

---

## Setting up API Secrets in GitHub Actions

Add the following environment secret to your GitHub Repository settings (`Settings -> Secrets and variables -> Actions`):
- `GEMINI_API_KEY`: Your Gemini API key for automated LLM content generation.

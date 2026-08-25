import os
import json
import logging
from typing import List, Dict, Any

logger = logging.getLogger("agent_engine.topic_expander")

class TopicExpansionAgent:
    """
    Agent 1: Topic Expansion Agent
    Takes seed keywords, core angle, and niche profile, then expands them into 
    50 hyper-specific, long-tail, low-competition sub-topics.
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")

    def expand_topics(self, niche_config: Dict[str, Any], count: int = 50) -> List[Dict[str, str]]:
        niche_name = niche_config.get("name", "")
        core_angle = niche_config.get("core_angle", "")
        seed_keywords = niche_config.get("seed_keywords", [])
        seed_topics = niche_config.get("seed_topics", [])

        if self.api_key:
            try:
                return self._expand_with_llm(niche_name, core_angle, seed_keywords, count)
            except Exception as e:
                logger.warning(f"LLM topic expansion failed: {e}. Falling back to programmatic expander.")

        return self._programmatic_expansion(niche_config, seed_topics, count)

    def _expand_with_llm(self, niche_name: str, core_angle: str, seed_keywords: List[str], count: int) -> List[Dict[str, str]]:
        from google import genai
        client = genai.Client(api_key=self.api_key)

        prompt = f"""
You are Lead SEO Architect specializing in hyper-specific, low-competition long-tail affiliate content strategy.

Niche: {niche_name}
Core Angle: {core_angle}
Seed Keywords: {", ".join(seed_keywords)}

Generate exactly {count} hyper-specific, long-tail, low-competition article topics.
Each topic MUST target high-intent buyers looking for specific solutions, comparisons, calculations, or setup guides.

Return ONLY a JSON array of objects with the keys:
- "title": The catchy, high-CTR article title.
- "target_keyword": The primary long-tail keyword targeted.
- "intent": One of ["transactional", "informational_comparison", "how_to_setup", "problem_solution"].

Example Output:
[
  {{
    "title": "Best Portable Power Station for Apartment Balcony Solar Charging in Winter",
    "target_keyword": "apartment balcony solar power station winter charging",
    "intent": "informational_comparison"
  }}
]
"""
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={"response_mime_type": "application/json"}
        )
        data = json.loads(response.text)
        if isinstance(data, list):
            return data[:count]
        return data.get("topics", [])[:count]

    def _programmatic_expansion(self, niche_config: Dict[str, Any], seed_topics: List[str], count: int) -> List[Dict[str, str]]:
        """Programmatic fallback engine to ensure 50 topics are available even without API access."""
        topics = []
        
        # Include seed topics first
        for st in seed_topics:
            topics.append({
                "title": st,
                "target_keyword": st.lower(),
                "intent": "problem_solution"
            })

        keywords = niche_config.get("seed_keywords", ["best setup"])
        modifiers = [
            ("Best {kw} for Small Spaces (2026 Review & Setup)", "informational_comparison"),
            ("How to Choose the Right {kw} Without Overspending", "problem_solution"),
            ("{kw}: Step-by-Step Installation & Maintenance Guide", "how_to_setup"),
            ("Top 5 {kw} Alternatives Tested for Durability", "transactional"),
            ("Common Mistakes When Buying {kw} and How to Avoid Them", "problem_solution"),
            ("Comprehensive Specs Comparison: {kw} Buying Matrix", "informational_comparison"),
            ("Budget vs Premium {kw}: Is the High-End Version Worth It?", "transactional"),
            ("How to Optimize Your {kw} Workflow for Maximum Efficiency", "how_to_setup"),
            ("{kw} Real-World Stress Test: Long-Term Performance Review", "transactional")
        ]

        for kw in keywords:
            for template, intent in modifiers:
                if len(topics) >= count:
                    break
                formatted_title = template.format(kw=kw.title())
                topics.append({
                    "title": formatted_title,
                    "target_keyword": kw.lower(),
                    "intent": intent
                })
            if len(topics) >= count:
                break

        return topics[:count]

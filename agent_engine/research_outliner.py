import os
import json
import logging
from typing import Dict, Any

logger = logging.getLogger("agent_engine.research_outliner")

class ResearchOutlinerAgent:
    """
    Agent 2: Research & Outlining Agent
    Evaluates searcher intent and generates a zero-fluff, comprehensive article outline
    tailored to answer user questions instantly while establishing search engine trust.
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")

    def build_outline(self, topic: Dict[str, str], niche_config: Dict[str, Any]) -> Dict[str, Any]:
        title = topic.get("title", "")
        keyword = topic.get("target_keyword", "")
        intent = topic.get("intent", "problem_solution")

        if self.api_key:
            try:
                return self._outline_with_llm(title, keyword, intent, niche_config)
            except Exception as e:
                logger.warning(f"LLM outline build failed: {e}. Falling back to template outliner.")

        return self._template_outline(title, keyword, intent, niche_config)

    def _outline_with_llm(self, title: str, keyword: str, intent: str, niche_config: Dict[str, Any]) -> Dict[str, Any]:
        from google import genai
        client = genai.Client(api_key=self.api_key)

        prompt = f"""
You are Lead Content Architect & Search Intent Researcher.

Article Title: "{title}"
Target Keyword: "{keyword}"
User Intent: {intent}
Niche: {niche_config.get('name')}
Core Angle: {niche_config.get('core_angle')}

Create a zero-fluff, high-converting article outline structured to provide immediate answers.
The outline must include:
1. Executive Summary & Direct Answer (for Google Featured Snippet)
2. Detailed Technical Breakdown / Problem Analysis
3. Technical Specifications & Dimension Comparison Matrix
4. Step-by-Step Selection or Setup Blueprint
5. Tailored Pros & Cons Section
6. Real-World Frequently Asked Questions (FAQ) with Schema structure

Return JSON:
{{
  "title": "{title}",
  "meta_description": "Compress 140 chars description...",
  "executive_summary_prompt": "Specific instant answer guidance...",
  "sections": [
    {{"heading": "H2 Heading", "subsections": ["H3 Sub 1", "H3 Sub 2"], "key_takeaways": "..."}}
  ],
  "faq_topics": ["Question 1?", "Question 2?", "Question 3?"],
  "specs_matrix_fields": ["Field 1", "Field 2", "Field 3"]
}}
"""
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)

    def _template_outline(self, title: str, keyword: str, intent: str, niche_config: Dict[str, Any]) -> Dict[str, Any]:
        required_sections = niche_config.get("formatting_constraints", {}).get("required_sections", [])
        sections = []

        for sec in required_sections:
            sections.append({
                "heading": sec,
                "subsections": [f"Key Factors in {sec}", f"Practical Application & Best Practices"],
                "key_takeaways": f"In-depth analysis of {sec} targeting '{keyword}'."
            })

        return {
            "title": title,
            "meta_description": f"In-depth guide on {title}. Learn key specifications, pros and cons, expert setup steps, and top contextual recommendations.",
            "executive_summary_prompt": f"Directly answer '{keyword}' in 2 sentences.",
            "sections": sections,
            "faq_topics": [
                f"How does {keyword} compare to traditional alternatives?",
                f"What are the safety and compliance standards for {keyword}?",
                f"What is the expected maintenance schedule or lifespan?"
            ],
            "specs_matrix_fields": ["Model / Product", "Primary Material / Specs", "Key Advantage", "Price / Value Rating"]
        }

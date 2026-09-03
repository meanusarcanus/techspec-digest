import os
import sys
import json
import argparse
import datetime
import logging
from pathlib import Path
from typing import Dict, Any, List, Optional

from agent_engine.config import ConfigLoader
from agent_engine.orchestrator import MultiAgentOrchestrator

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("agent_engine.topic_rotator")

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

class TopicRotatorEngine:
    def __init__(self, catalog_path: Optional[Path] = None):
        self.catalog_path = catalog_path or (WORKSPACE_ROOT / "config" / "topic_catalog.json")
        if not self.catalog_path.exists():
            raise FileNotFoundError(f"Topic catalog not found at {self.catalog_path}")
        with open(self.catalog_path, "r", encoding="utf-8") as f:
            self.catalog = json.load(f)
        self.topics = self.catalog.get("topics", [])
        self.orchestrator = MultiAgentOrchestrator()

    def list_topics(self) -> List[Dict[str, Any]]:
        return self.topics

    def get_scheduled_topic(self, date: Optional[datetime.date] = None) -> Dict[str, Any]:
        if not self.topics:
            raise ValueError("No topics found in catalog.")
        if date is None:
            date = datetime.date.today()

        day_of_year = date.timetuple().tm_yday
        topic_index = day_of_year % len(self.topics)
        return self.topics[topic_index]

    def find_topic_by_identifier(self, identifier: str) -> Optional[Dict[str, Any]]:
        ident_clean = identifier.lower().strip().replace("&", "and").replace(" ", "_")
        for topic in self.topics:
            t_id = topic["id"].lower().replace("&", "and")
            t_name = topic["name"].lower().replace("&", "and")
            if ident_clean in t_id or ident_clean in t_name or identifier.lower() == topic["name"].lower():
                return topic
        return None

    def execute_topic_niches(self, topic: Dict[str, Any], posts_per_niche: int = 1) -> Dict[str, List[str]]:
        topic_name = topic["name"]
        niches = topic.get("niches", [])
        logger.info("=" * 60)
        logger.info(f"🎯 CHOSEN TOPIC: {topic_name.upper()}")
        logger.info(f"📦 Generating content for {len(niches)} new micro-niches: {niches}")
        logger.info("=" * 60)

        published_map = {}
        for niche_id in niches:
            try:
                published_files = self.orchestrator.run_for_niche(niche_id, posts_count=posts_per_niche)
                published_map[niche_id] = published_files
            except Exception as e:
                logger.error(f"Error executing niche {niche_id}: {e}", exc_info=True)
                published_map[niche_id] = []

        logger.info(f"✅ Finished topic publication for '{topic_name}'. Total niches updated: {len(published_map)}.")
        return published_map

def main():
    parser = argparse.ArgumentParser(description="Twice-Weekly Master Topic Rotator & Content Publisher")
    parser.add_argument("--topic", type=str, default="auto", help="Choose specific topic or 'auto' for schedule")
    parser.add_argument("--posts-per-niche", type=int, default=1, help="Number of posts per niche (default: 1)")
    parser.add_argument("--list-topics", action="store_true", help="List all 10 master topics and their 3 niches")
    parser.add_argument("--schedule-run", action="store_true", help="Run the automated scheduled topic for today")

    args = parser.parse_args()
    engine = TopicRotatorEngine()

    if args.list_topics:
        print("\n=== 10 MASTER TOPICS & 30 MICRO-NICHES ===")
        for i, t in enumerate(engine.list_topics(), 1):
            print(f"{i}. {t['name']} [{t['id']}]")
            for n in t['niches']:
                print(f"    └── {n}")
        print()
        return

    if args.schedule_run or args.topic == "auto":
        target_topic = engine.get_scheduled_topic()
        logger.info(f"Scheduled topic auto-selected: '{target_topic['name']}'")
    else:
        target_topic = engine.find_topic_by_identifier(args.topic)
        if not target_topic:
            logger.error(f"Topic not found matching '{args.topic}'. Use --list-topics to see available topics.")
            sys.exit(1)

    engine.execute_topic_niches(target_topic, posts_per_niche=args.posts_per_niche)

if __name__ == "__main__":
    main()

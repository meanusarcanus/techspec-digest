import os
import sys
import argparse
import logging
from typing import List, Dict, Any

from agent_engine.config import ConfigLoader
from agent_engine.topic_expander import TopicExpansionAgent
from agent_engine.research_outliner import ResearchOutlinerAgent
from agent_engine.writer_injector import WriterInjectorAgent
from agent_engine.publisher import PublisherAgent

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("agent_engine.orchestrator")

class MultiAgentOrchestrator:
    def __init__(self, dry_run: bool = False):
        self.dry_run = dry_run
        self.config_loader = ConfigLoader()
        self.manifest = self.config_loader.load_manifest()

        # Initialize agents
        self.topic_agent = TopicExpansionAgent()
        self.outline_agent = ResearchOutlinerAgent()
        self.writer_agent = WriterInjectorAgent()
        self.publisher_agent = PublisherAgent()

    def run_for_niche(self, niche_id: str, posts_count: int = 1) -> List[str]:
        logger.info(f"=== Starting Multi-Agent Pipeline for Niche: '{niche_id}' (Count: {posts_count}) ===")
        
        niche_config = self.config_loader.load_niche_config(niche_id)
        repo_manifest = self._find_repo_manifest(niche_id)

        # Step 1: Topic Expansion Agent
        logger.info("[Agent 1/4] Expanding Seed Topics...")
        topics = self.topic_agent.expand_topics(niche_config, count=posts_count * 5)
        
        published_files = []
        selected_topics = topics[:posts_count]

        for idx, topic in enumerate(selected_topics, 1):
            logger.info(f"\n--- Processing Post {idx}/{posts_count}: '{topic.get('title')}' ---")

            # Step 2: Research & Outlining Agent
            logger.info("[Agent 2/4] Building Intent-Focused Outline...")
            outline = self.outline_agent.build_outline(topic, niche_config)

            # Step 3: Writer & Affiliate Injector Agent
            logger.info("[Agent 3/4] Writing Markdown Article & Injecting Affiliate Links...")
            article_body = self.writer_agent.generate_article(topic, outline, niche_config)

            # Step 4: Publisher & Deployer Agent
            logger.info("[Agent 4/4] Formatting Hugo Front-Matter & Publishing...")
            pub_path = self.publisher_agent.publish_post(
                article_body=article_body,
                topic=topic,
                outline=outline,
                niche_config=niche_config,
                repo_manifest=repo_manifest,
                dry_run=self.dry_run
            )
            published_files.append(str(pub_path))

        logger.info(f"=== Completed Pipeline for '{niche_id}'. Generated {len(published_files)} post(s). ===\n")
        return published_files

    def run_all(self, posts_per_niche: int = 1) -> Dict[str, List[str]]:
        results = {}
        for repo_info in self.manifest.get("niched_repositories", []):
            niche_id = repo_info["id"]
            results[niche_id] = self.run_for_niche(niche_id, posts_count=posts_per_niche)
        return results

    def _find_repo_manifest(self, niche_id: str) -> Dict[str, Any]:
        for repo_info in self.manifest.get("niched_repositories", []):
            if repo_info["id"] == niche_id:
                return repo_info
        return {
            "id": niche_id,
            "output_content_dir": f"content/{niche_id}/posts"
        }

def main():
    parser = argparse.ArgumentParser(description="TechSpec Digest Multi-Agent Content Engine")
    parser.add_argument("--niche", type=str, default="all", help="Target niche ID to process (or 'all')")
    parser.add_argument("--count", type=int, default=1, help="Number of posts to generate per niche")
    parser.add_argument("--dry-run", action="store_true", help="Run without writing files to disk")

    args = parser.parse_args()
    orchestrator = MultiAgentOrchestrator(dry_run=args.dry_run)

    if args.niche == "all":
        orchestrator.run_all(posts_per_niche=args.count)
    else:
        orchestrator.run_for_niche(args.niche, posts_count=args.count)

if __name__ == "__main__":
    main()

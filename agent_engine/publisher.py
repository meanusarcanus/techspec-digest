import os
import re
import datetime
import logging
from pathlib import Path
from typing import Dict, Any

logger = logging.getLogger("agent_engine.publisher")

class PublisherAgent:
    """
    Agent 4: Publisher & Deployer Agent
    Formats final article output with Hugo metadata front-matter (Title, Date, Description, Slug),
    writes the markdown file directly to the corresponding repository path, and manages git commits.
    """
    def __init__(self, workspace_root: Path = None):
        self.workspace_root = workspace_root or Path(__file__).resolve().parent.parent

    def slugify(self, text: str) -> str:
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s-]', '', text)
        text = re.sub(r'[\s_]+', '-', text)
        return text.strip('-')

    def publish_post(
        self,
        article_body: str,
        topic: Dict[str, str],
        outline: Dict[str, Any],
        niche_config: Dict[str, Any],
        repo_manifest: Dict[str, Any],
        dry_run: bool = False
    ) -> Path:
        title = topic.get("title", "Untitled Guide")
        slug = self.slugify(title)
        now_iso = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        
        meta_desc = outline.get("meta_description", f"Expert guide on {title}. Complete technical breakdown, specifications, and contextual recommendations.")
        target_kw = topic.get("target_keyword", niche_config.get("id"))
        
        front_matter = f"""---
title: "{title}"
date: {now_iso}
draft: false
description: "{meta_desc}"
slug: "{slug}"
categories: ["{niche_config.get('name', 'Guides')}"]
tags: ["{target_kw}", "{niche_config.get('id')}"]
schema_type: "TechArticle"
---

"""
        full_content = front_matter + article_body.strip() + "\n"

        # Determine target output directory
        rel_content_dir = repo_manifest.get("output_content_dir", f"content/{niche_config.get('id')}/posts")
        output_dir = self.workspace_root / rel_content_dir
        output_dir.mkdir(parents=True, exist_ok=True)

        target_file = output_dir / f"{slug}.md"

        if dry_run:
            logger.info(f"[DRY-RUN] Would write {len(full_content)} bytes to {target_file}")
            print(f"\n==================== [DRY-RUN OUTPUT: {target_file.name}] ====================")
            print(full_content[:500] + "\n... [TRUNCATED DRY-RUN PREVIEW] ...\n")
            return target_file

        with open(target_file, "w", encoding="utf-8") as f:
            f.write(full_content)

        logger.info(f"Published article successfully to {target_file}")
        return target_file

    def git_commit_and_push(self, file_path: Path, commit_message: str = None) -> bool:
        """Helper to commit and push changes if in a active git environment."""
        try:
            import git
            repo = git.Repo(self.workspace_root, search_parent_directories=True)
            repo.git.add(str(file_path))
            msg = commit_message or f"auto(content): publish {file_path.name}"
            repo.index.commit(msg)
            logger.info(f"Git commit created: '{msg}'")
            return True
        except Exception as e:
            logger.warning(f"Git auto-commit skipped or failed: {e}")
            return False

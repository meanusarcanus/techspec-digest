import json
import os
from pathlib import Path
from typing import Dict, Any, List, Optional

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent

class ConfigLoader:
    def __init__(self, root_dir: Optional[Path] = None):
        self.root_dir = root_dir or WORKSPACE_ROOT
        self.manifest_path = self.root_dir / "config" / "network_manifest.json"
        self.niches_dir = self.root_dir / "config" / "niches"

    def load_manifest(self) -> Dict[str, Any]:
        if not self.manifest_path.exists():
            raise FileNotFoundError(f"Network manifest not found at {self.manifest_path}")
        with open(self.manifest_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def load_niche_config(self, niche_id: str) -> Dict[str, Any]:
        niche_file = self.niches_dir / f"{niche_id}.json"
        if not niche_file.exists():
            raise FileNotFoundError(f"Niche configuration file not found: {niche_file}")
        with open(niche_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_all_niche_configs(self) -> List[Dict[str, Any]]:
        manifest = self.load_manifest()
        configs = []
        for repo_info in manifest.get("niched_repositories", []):
            niche_id = repo_info["id"]
            configs.append(self.load_niche_config(niche_id))
        return configs

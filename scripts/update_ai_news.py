#!/usr/bin/env python3
"""Fetch BestBlogs RSS and write docs/ai-news.json."""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "docs" / "ai-news.json"
RSS_BASE = "https://www.bestblogs.dev/zh/feeds/rss"
RSS_PARAMS = {
    "featured": "y",
    "language": "zh",
    "timeFilter": "1w",
    "minScore": "85",
    "type": "article",
}
USER_AGENT = "BDIC-SE-KnowledgeBase AI feed updater"
MAX_ITEMS = 8


@dataclass
class FeedItem:
    title: str
    summary: str
    url: str
    source: str
    topic: str
    date: str
    badge: str


def build_rss_url() -> str:
    return f"{RSS_BASE}?{urlencode(RSS_PARAMS)}"


def fetch_rss(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=30) as response:
        return response.read()


def strip_html(value: str) -> str:
    text = re.sub(r"<[^>]+>", " ", value or "")
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def normalize_date(value: str) -> str:
    if not value:
        return datetime.now(timezone.utc).date().isoformat()

    parsed = parsedate_to_datetime(value)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc).date().isoformat()


def guess_badge(title: str, summary: str, category: str) -> str:
    haystack = f"{title} {summary} {category}".lower()
    if "agent" in haystack:
        return "agent"
    if any(word in haystack for word in ("模型", "model", "gpt", "gemini", "claude", "llm")):
        return "model"
    if any(word in haystack for word in ("工具", "tool", "ide", "编程", "coding", "copilot", "cursor")):
        return "tooling"
    return "featured"


def summarize(description: str) -> str:
    plain = strip_html(description)
    return plain[:110].rstrip(" ,.;:") + ("..." if len(plain) > 110 else "")


def topic_from_category(category: str) -> str:
    plain = strip_html(category)
    return plain or "AI"


def source_from_item(item: ET.Element) -> str:
    source = item.findtext("source")
    if source:
        return f"BestBlogs / {strip_html(source)}"

    author = item.findtext("author")
    if author:
        return f"BestBlogs / {strip_html(author)}"

    return "BestBlogs"


def extract_first_section(description: str) -> str:
    match = re.search(r"一句话摘要\s*</h3>\s*<p[^>]*>(.*?)</p>", description, flags=re.I | re.S)
    if match:
        return strip_html(match.group(1))
    return ""


def parse_items(xml_bytes: bytes) -> list[FeedItem]:
    root = ET.fromstring(xml_bytes)
    channel = root.find("channel")
    if channel is None:
        raise ValueError("RSS channel not found")

    items: list[FeedItem] = []
    for entry in channel.findall("item")[:MAX_ITEMS]:
        title = strip_html(entry.findtext("title", ""))
        link = (entry.findtext("link", "") or "").strip()
        description = entry.findtext("description", "") or ""
        category = entry.findtext("category", "") or "AI"
        summary = extract_first_section(description) or summarize(description)
        topic = topic_from_category(category)
        date = normalize_date(entry.findtext("pubDate", ""))
        badge = guess_badge(title, summary, topic)

        if not title or not link:
            continue

        items.append(
            FeedItem(
                title=title,
                summary=summary,
                url=link,
                source=source_from_item(entry),
                topic=topic,
                date=date,
                badge=badge,
            )
        )

    if not items:
        raise ValueError("No feed items parsed")

    return items


def write_output(items: list[FeedItem]) -> None:
    payload: list[dict[str, Any]] = [item.__dict__ for item in items]
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    rss_url = build_rss_url()
    xml_bytes = fetch_rss(rss_url)
    source_label = rss_url

    items = parse_items(xml_bytes)
    write_output(items)
    print(f"Updated {OUTPUT_PATH} with {len(items)} items from {source_label}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Failed to update AI news: {exc}", file=sys.stderr)
        raise SystemExit(1)

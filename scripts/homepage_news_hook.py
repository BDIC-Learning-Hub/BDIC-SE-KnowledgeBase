from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from datetime import date, datetime
from html import escape
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo


LOGGER = logging.getLogger("mkdocs")
REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"
HOME_PLACEHOLDER = '<div class="news-container"></div>'
SHANGHAI_TZ = ZoneInfo("Asia/Shanghai")


@dataclass(frozen=True)
class FeedConfig:
    key: str
    title: str
    subtitle: str
    badge: str
    icon: str
    source_file: str
    active_count: int


FEED_CONFIG = {
    "announcements": FeedConfig(
        key="announcements",
        title="最新公告",
        subtitle="站内通知与仓库更新",
        badge="Update",
        icon="📢",
        source_file="news.json",
        active_count=2,
    ),
    "industry": FeedConfig(
        key="industry",
        title="行业精选",
        subtitle="BestBlogs 精选来源，面向 AI 学习与工程实践",
        badge="AI Radar",
        icon="✨",
        source_file="ai-news.json",
        active_count=4,
    ),
}

BADGE_TEXT = {
    "announcement": "公告",
    "important": "重要",
    "update": "更新",
    "event": "活动",
    "featured": "精选",
    "tooling": "工具",
    "model": "模型",
    "agent": "Agent",
}


def on_page_markdown(markdown: str, *, page: Any, config: Any, files: Any) -> str:
    if page.file.src_uri != "index.md" or HOME_PLACEHOLDER not in markdown:
        return markdown

    try:
        rendered = render_homepage_news()
    except Exception:  # pragma: no cover - defensive build fallback
        LOGGER.exception("Failed to prerender homepage news block")
        return markdown

    return markdown.replace(HOME_PLACEHOLDER, rendered, 1)


def render_homepage_news() -> str:
    announcements = load_feed(FEED_CONFIG["announcements"])
    industry = load_feed(FEED_CONFIG["industry"])

    return f"""
<div class="news-container">
  <div class="news-shell">
    <div class="news-tabs" role="tablist" aria-label="首页动态切换">
      <button class="news-tab is-active" type="button" role="tab" aria-selected="true" data-feed="industry">
        行业精选
      </button>
      <button class="news-tab" type="button" role="tab" aria-selected="false" data-feed="announcements">
        公告栏
      </button>
    </div>
    <div class="news-panels">
      {render_panel(industry, True)}
      {render_panel(announcements, False)}
    </div>
  </div>
</div>
""".strip()


def load_feed(feed: FeedConfig) -> dict[str, Any]:
    source_path = DOCS_DIR / feed.source_file
    items = json.loads(source_path.read_text(encoding="utf-8"))
    items.sort(key=lambda item: parse_sortable_date(item.get("date", "")), reverse=True)

    return {
        "config": feed,
        "active": items[: feed.active_count],
        "archived": items[feed.active_count :],
    }


def render_panel(feed_bundle: dict[str, Any], is_active: bool) -> str:
    feed = feed_bundle["config"]
    active_items = "".join(render_news_item(feed.key, item) for item in feed_bundle["active"])
    archive_items = "".join(
        render_news_item(feed.key, item, is_archive=True) for item in feed_bundle["archived"]
    )
    active_class = " is-active" if is_active else ""

    archive_html = ""
    if feed_bundle["archived"]:
        archive_count = len(feed_bundle["archived"])
        archive_html = f"""
        <div class="news-archive-section">
          <button class="news-toggle-btn" aria-expanded="false" data-archive-count="{archive_count}">
            <span class="toggle-text">查看更多 ({archive_count})</span>
            <span class="toggle-icon">▼</span>
          </button>
          <ul class="news-list archive-list {feed.key}-list" style="display: none;">
            {archive_items}
          </ul>
        </div>
        """

    return f"""
      <section class="news-panel news-panel-{feed.key}{active_class}" data-feed-panel="{feed.key}" role="tabpanel">
        <div class="news-header">
          <div class="news-heading">
            <h3 class="news-title" data-icon="{escape(feed.icon)}">{escape(feed.title)}</h3>
            <p class="news-subtitle">{escape(feed.subtitle)}</p>
          </div>
          <span class="news-update-badge">{escape(feed.badge)}</span>
        </div>
        <div class="news-body">
          <ul class="news-list active-list {feed.key}-list">
            {active_items}
          </ul>
          {archive_html}
        </div>
      </section>
    """.strip()


def render_news_item(feed_key: str, item: dict[str, Any], is_archive: bool = False) -> str:
    return (
        render_industry_item(item, is_archive)
        if feed_key == "industry"
        else render_announcement_item(item, is_archive)
    )


def render_announcement_item(item: dict[str, Any], is_archive: bool = False) -> str:
    archive_class = " archive-item" if is_archive else ""
    badge = item.get("badge", "default")
    badge_text = BADGE_TEXT.get(badge, "通知")
    text = item.get("text", "")
    date_text = format_date(item.get("date", ""))

    return f"""
            <li class="news-item{archive_class}">
              <div class="news-item-main">
                <span class="news-badge {escape(badge)}">{escape(badge_text)}</span>
                <span class="news-text">{text}</span>
              </div>
              <div class="news-item-meta">
                <span class="news-date">{escape(date_text)}</span>
              </div>
            </li>
    """.strip()


def render_industry_item(item: dict[str, Any], is_archive: bool = False) -> str:
    archive_class = " archive-item" if is_archive else ""
    badge = item.get("badge", "default")
    badge_text = BADGE_TEXT.get(badge, "通知")
    date_text = format_date(item.get("date", ""))
    topic = item.get("topic", "")
    source = item.get("source", "")
    summary = item.get("summary", "")
    title = item.get("title", "")
    url = item.get("url", "")

    topic_html = f'<span class="news-topic">{escape(topic)}</span>' if topic else ""
    source_html = f'<span class="news-source">{escape(source)}</span>' if source else ""
    summary_html = f'<p class="news-summary">{escape(summary)}</p>' if summary else ""
    link_html = (
        f'<a class="news-link" href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer">阅读原文</a>'
        if url
        else ""
    )

    return f"""
            <li class="news-item news-item-featured{archive_class}">
              <div class="news-featured-meta">
                <span class="news-badge {escape(badge)}">{escape(badge_text)}</span>
                {topic_html}
                {source_html}
                <span class="news-date news-date-inline">{escape(date_text)}</span>
              </div>
              <div class="news-featured-content">
                <span class="news-text news-text-title">{escape(title)}</span>
                {summary_html}
                {link_html}
              </div>
            </li>
    """.strip()


def parse_sortable_date(value: str) -> datetime:
    if not value:
        return datetime.min.replace(tzinfo=SHANGHAI_TZ)

    normalized = value.replace("Z", "+00:00")
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=SHANGHAI_TZ)
    return parsed.astimezone(SHANGHAI_TZ)


def format_date(value: str) -> str:
    if not value:
        return ""

    today = datetime.now(SHANGHAI_TZ).date()
    item_date = parse_sortable_date(value).date()
    diff_days = (today - item_date).days

    if diff_days == 0:
        return "今天"
    if diff_days == 1:
        return "昨天"
    if 1 < diff_days < 7:
        return f"{diff_days}天前"
    return item_date.isoformat()

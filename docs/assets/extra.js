/* 自定义 JavaScript 功能 */

document.addEventListener('DOMContentLoaded', function() {
    // 添加复制代码按钮功能增强
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.addEventListener('copy', function() {
            // 显示复制成功提示
            const toast = document.createElement('div');
            toast.textContent = '代码已复制！';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--md-accent-fg-color);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 9999;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 2000);
        });
    });

    // 添加外部链接图标
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        const icon = document.createElement('span');
        icon.innerHTML = ' <svg style="width: 12px; height: 12px; vertical-align: middle;" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>';
        link.appendChild(icon);
    });

    // 添加平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加阅读进度指示器
    function updateReadingProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.getElementById('reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 3px;
                background: var(--md-accent-fg-color);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateReadingProgress);

    // 添加回到顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--md-accent-fg-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });

    // 初始化已预渲染的 News 栏位交互
    initializeNews();
    initializeGitHubStars();
    initializeGiscus();
    observeGiscusTheme();
});

const FEED_CONFIG = {
    announcements: {
        key: 'announcements',
        title: '最新公告',
        subtitle: '站内通知与仓库更新',
        badge: 'Update',
        icon: '📢',
        sourceUrl: 'news.json',
        activeCount: 2
    },
    industry: {
        key: 'industry',
        title: '行业精选',
        subtitle: 'BestBlogs 精选来源，面向 AI 学习与工程实践',
        badge: 'AI Radar',
        icon: '✨',
        sourceUrl: 'ai-news.json',
        activeCount: 4
    }
};

function initializeNews() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;
    const newsShell = newsContainer.querySelector('.news-shell');
    if (!newsShell) return;

    bindFeedEvents(newsContainer);
}

function initializeGitHubStars() {
    const starBadges = document.querySelectorAll('[data-github-stars]');
    if (!starBadges.length) return;

    starBadges.forEach(async badge => {
        const repo = badge.dataset.githubStars;
        const countElement = badge.querySelector('.promo-card-star-count');
        if (!repo || !countElement) return;

        try {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
                headers: { Accept: 'application/vnd.github+json' }
            });
            if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

            const data = await response.json();
            if (typeof data.stargazers_count !== 'number') return;

            countElement.textContent = formatCompactNumber(data.stargazers_count);
            badge.setAttribute('aria-label', `GitHub ${data.stargazers_count} stars`);
        } catch (error) {
            countElement.textContent = 'Stars';
            badge.classList.add('is-unavailable');
        }
    });
}

function formatCompactNumber(value) {
    if (value < 1000) return String(value);
    if (value < 1000000) {
        return `${(value / 1000).toFixed(value < 10000 ? 1 : 0).replace(/\.0$/, '')}k`;
    }
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}m`;
}

function createPanelHTML(feed, isActive) {
    let html = `
        <section class="news-panel news-panel-${feed.key} ${isActive ? 'is-active' : ''}" data-feed-panel="${feed.key}" role="tabpanel">
            <div class="news-header">
                <div class="news-heading">
                    <h3 class="news-title" data-icon="${feed.icon}">${feed.title}</h3>
                    <p class="news-subtitle">${feed.subtitle}</p>
                </div>
                <span class="news-update-badge">${feed.badge}</span>
            </div>
            <div class="news-body">
                <ul class="news-list active-list ${feed.key}-list">
    `;

    feed.active.forEach(item => {
        html += createNewsItemHTML(feed.key, item);
    });

    html += `</ul>`;

    if (feed.archived && feed.archived.length > 0) {
        html += `
            <div class="news-archive-section">
                <button class="news-toggle-btn" aria-expanded="false" data-archive-count="${feed.archived.length}">
                    <span class="toggle-text">查看更多 (${feed.archived.length})</span>
                    <span class="toggle-icon">▼</span>
                </button>
                <ul class="news-list archive-list ${feed.key}-list" style="display: none;">
        `;

        feed.archived.forEach(item => {
            html += createNewsItemHTML(feed.key, item, true);
        });

        html += `
                </ul>
            </div>
        `;
    }

    html += `
            </div>
        </section>
    `;

    return html;
}

function bindFeedEvents(container) {
    const tabs = container.querySelectorAll('.news-tab');
    const panels = container.querySelectorAll('.news-panel');

    tabs.forEach(tab => {
        const isDefault = tab.dataset.feed === 'announcements';
        tab.classList.toggle('is-active', isDefault);
        tab.setAttribute('aria-selected', isDefault ? 'true' : 'false');

        tab.addEventListener('click', () => {
            const feedKey = tab.dataset.feed;
            tabs.forEach(item => {
                const isActive = item === tab;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            panels.forEach(panel => {
                panel.classList.toggle('is-active', panel.dataset.feedPanel === feedKey);
            });
        });
    });

    container.querySelectorAll('.news-toggle-btn').forEach(toggleBtn => {
        const archiveSection = toggleBtn.closest('.news-archive-section');
        const archiveList = archiveSection.querySelector('.archive-list');
        const toggleIcon = archiveSection.querySelector('.toggle-icon');
        const panel = toggleBtn.closest('.news-panel');
        const feedKey = panel.dataset.feedPanel;
        const archiveCount = Number(toggleBtn.dataset.archiveCount || archiveList.children.length);

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                archiveList.style.display = 'none';
                toggleIcon.style.transform = 'rotate(0deg)';
                toggleBtn.querySelector('.toggle-text').textContent = `查看更多 (${archiveCount})`;
            } else {
                archiveList.style.display = feedKey === 'industry' ? 'grid' : 'block';
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleBtn.querySelector('.toggle-text').textContent = '收起更多内容';
            }
        });
    });
}

function createNewsItemHTML(feedKey, item, isArchive = false) {
    if (feedKey === 'industry') {
        return createIndustryItemHTML(item, isArchive);
    }

    const badgeClass = `news-badge ${item.badge || 'default'}`;
    const dateStr = formatDate(item.date);

    return `
        <li class="news-item ${isArchive ? 'archive-item' : ''}">
            <div class="news-item-main">
                <span class="${badgeClass}">${getBadgeText(item.badge)}</span>
                <span class="news-text">${item.text}</span>
            </div>
            <div class="news-item-meta">
                <span class="news-date">${dateStr}</span>
            </div>
        </li>
    `;
}

function createIndustryItemHTML(item, isArchive = false) {
    const badgeClass = `news-badge ${item.badge || 'default'}`;
    const dateStr = formatDate(item.date);
    const topic = item.topic ? `<span class="news-topic">${item.topic}</span>` : '';
    const source = item.source ? `<span class="news-source">${item.source}</span>` : '';
    const summary = item.summary ? `<p class="news-summary">${item.summary}</p>` : '';
    const link = item.url
        ? `<a class="news-link" href="${item.url}" target="_blank" rel="noopener noreferrer">阅读原文</a>`
        : '';

    return `
        <li class="news-item news-item-featured ${isArchive ? 'archive-item' : ''}">
            <div class="news-featured-meta">
                <span class="${badgeClass}">${getBadgeText(item.badge)}</span>
                ${topic}
                ${source}
                <span class="news-date news-date-inline">${dateStr}</span>
            </div>
            <div class="news-featured-content">
                <span class="news-text news-text-title">${item.title}</span>
                ${summary}
                ${link}
            </div>
        </li>
    `;
}

function getBadgeText(badge) {
    const badgeMap = {
        'announcement': '公告',
        'important': '重要',
        'update': '更新',
        'event': '活动',
        'featured': '精选',
        'tooling': '工具',
        'model': '模型',
        'agent': 'Agent'
    };
    return badgeMap[badge] || '通知';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7 && diffDays > 0) return `${diffDays}天前`;
    
    // 格式化为 YYYY-MM-DD
    return dateStr;
}

function getGiscusTheme() {
    return document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'light';
}

function initializeGiscus() {
    const content = document.querySelector('article.md-content__inner');
    if (!content || content.querySelector('.giscus-container')) return;

    const pageTitle = content.querySelector('h1');
    if (pageTitle && pageTitle.textContent.trim() === '404 - Not found') return;

    const section = document.createElement('section');
    section.className = 'giscus-container';
    section.setAttribute('aria-labelledby', 'giscus-title');

    const title = document.createElement('h2');
    title.id = 'giscus-title';
    title.textContent = '讨论区';

    const description = document.createElement('p');
    description.className = 'giscus-description';
    description.textContent = '欢迎在这里提问、补充资料线索或分享学习经验。';

    const target = document.createElement('div');
    target.className = 'giscus';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'BDIC-Learning-Hub/BDIC-SE-KnowledgeBase');
    script.setAttribute('data-repo-id', 'R_kgDOPR8KOg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOPR8KOs4C-3Ql');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', getGiscusTheme());
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    target.appendChild(script);
    section.append(title, description, target);
    content.appendChild(section);
}

function updateGiscusTheme() {
    const frame = document.querySelector('iframe.giscus-frame');
    if (!frame) return;

    frame.contentWindow.postMessage({
        giscus: {
            setConfig: {
                theme: getGiscusTheme()
            }
        }
    }, 'https://giscus.app');
}

function observeGiscusTheme() {
    if (window.giscusThemeObserver || typeof MutationObserver === 'undefined') return;

    window.giscusThemeObserver = new MutationObserver(updateGiscusTheme);
    window.giscusThemeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
}

if (typeof document$ !== 'undefined') {
    document$.subscribe(function() {
        initializeGiscus();
        updateGiscusTheme();
    });
}

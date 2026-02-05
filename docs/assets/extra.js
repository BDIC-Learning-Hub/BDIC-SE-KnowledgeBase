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

    // 初始化 News 栏位
    initializeNews();
});

// News 初始化函数
async function initializeNews() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;

    // 1. 渲染骨架屏 (Skeleton Screen)
    renderSkeleton(newsContainer);

    try {
        // 2. 异步获取数据
        // 尝试从根目录获取 news.json
        // 如果当前页面在子目录，可能需要调整路径，但通常 docs/news.json 构建后在根目录
        const response = await fetch('news.json');
        
        if (!response.ok) {
            // 尝试加个前缀，应对可能的子目录部署情况（如果不是在根目录访问）
            // 这里简单处理，如果失败则尝试 ../news.json，或者直接报错
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // 3. 数据处理
        // 按日期倒序排序
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 自动归档逻辑：前 3 条为 active，其余为 archived
        // 如果 active 数量少于 3，则全部显示
        const ACTIVE_COUNT = 3;
        const activeNews = data.slice(0, ACTIVE_COUNT);
        const archivedNews = data.slice(ACTIVE_COUNT);

        // 4. 渲染 UI
        renderNewsUI(newsContainer, activeNews, archivedNews);

    } catch (error) {
        console.error('Failed to load news:', error);
        newsContainer.innerHTML = `
            <div class="news-error">
                <p>无法加载公告数据，请刷新重试。</p>
            </div>
        `;
    }
}

function renderSkeleton(container) {
    container.innerHTML = `
        <div class="news-skeleton">
            <div class="skeleton-header"></div>
            <div class="skeleton-list">
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
                <div class="skeleton-item"></div>
            </div>
        </div>
    `;
}

function renderNewsUI(container, active, archived) {
    let html = `
        <div class="news-header">
            <h3 class="news-title">最新公告</h3>
            <span class="news-update-badge">Update</span>
        </div>
        <div class="news-body">
            <ul class="news-list active-list">
    `;

    // 渲染 Active 列表
    active.forEach(item => {
        html += createNewsItemHTML(item);
    });

    html += `</ul>`;

    // 渲染 Archived 列表（如果有）
    if (archived && archived.length > 0) {
        html += `
            <div class="news-archive-section">
                <button class="news-toggle-btn" aria-expanded="false">
                    <span class="toggle-text">查看历史公告 (${archived.length})</span>
                    <span class="toggle-icon">▼</span>
                </button>
                <ul class="news-list archive-list" style="display: none;">
        `;
        
        archived.forEach(item => {
            html += createNewsItemHTML(item, true);
        });

        html += `
                </ul>
            </div>
        `;
    }

    html += `</div>`; // end news-body
    container.innerHTML = html;

    // 绑定交互事件
    const toggleBtn = container.querySelector('.news-toggle-btn');
    if (toggleBtn) {
        const archiveList = container.querySelector('.archive-list');
        const toggleIcon = container.querySelector('.toggle-icon');
        
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                // 收起
                archiveList.style.display = 'none';
                toggleIcon.style.transform = 'rotate(0deg)';
                toggleBtn.querySelector('.toggle-text').textContent = `查看历史公告 (${archived.length})`;
            } else {
                // 展开
                archiveList.style.display = 'block';
                toggleIcon.style.transform = 'rotate(180deg)';
                toggleBtn.querySelector('.toggle-text').textContent = '收起历史公告';
            }
        });
    }
}

function createNewsItemHTML(item, isArchive = false) {
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

function getBadgeText(badge) {
    const badgeMap = {
        'announcement': '公告',
        'important': '重要',
        'update': '更新',
        'event': '活动'
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

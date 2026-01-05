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

    // ==================== News 栏位功能 ====================
    const newsToggleBtn = document.querySelector('.news-toggle-btn');
    const newsArchive = document.querySelector('.news-archive');
    
    if (newsToggleBtn && newsArchive) {
        newsToggleBtn.addEventListener('click', function() {
            newsArchive.classList.toggle('active');
            this.textContent = newsArchive.classList.contains('active') ? '收起归档' : '查看归档';
        });
    }

    // 初始化 News 数据（可以从 JSON 配置读取）
    initializeNews();
});

// News 初始化函数
function initializeNews() {
    // News 数据配置（管理者可在此修改）
    const newsData = {
        active: [
            {
                text: '更新24级大二OOP评分标准',
                date: '2025-12-29',
                badge: 'update'
            },
            {
                text: '请同学们不要将本知识库内容与任何其他外部机构分享，以免引起不必要的版权纠纷。同学间分享可直接发送本网站链接。新增内容会及时更新在本仓库中，若您希望向本仓库贡献资料，请参阅贡献指南或联系我们',
                date: '2025-12-18',
                badge: 'important'
            },
            {
                text: '<strong>新功能上线</strong>：添加了 News 通知栏，管理员可以快速发布重要公告。',
                date: '2025-12-18',
                badge: 'update'
            },
            {
                text: '如果这个仓库对你有帮助，欢迎 <a href="https://github.com/BDIC-Learning-Hub/BDIC-SE-KnowledgeBase" target="_blank">点亮星星</a> 支持我们！',
                date: '2025-12-18',
                badge: 'important'
            },
            {
                text: '欢迎来到BDIC知识库！',
                date: '2025-12-18',
                badge: 'announcement'
            }
        ],
        archived: [
        ]
    };

    // 生成 HTML
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;

    let newsHTML = '<h3 class="news-title">最新通知</h3>';
    newsHTML += '<ul class="news-list">';

    // 活跃消息
    newsData.active.forEach(item => {
        const badgeClass = item.badge === 'important' ? 'news-badge important' 
                          : item.badge === 'update' ? 'news-badge update'
                          : item.badge === 'event' ? 'news-badge event'
                          : 'news-badge';
        
        newsHTML += `
            <li class="news-item">
                <div class="news-content">
                    <p class="news-text">
                        <span class="${badgeClass}">${getBadgeText(item.badge)}</span>
                        ${item.text}
                    </p>
                </div>
                <span class="news-date">${formatDate(item.date)}</span>
            </li>
        `;
    });

    newsHTML += '</ul>';

    // 归档区域
    if (newsData.archived && newsData.archived.length > 0) {
        newsHTML += '<div class="news-archive">';
        newsHTML += `<div class="news-archive-title">📚 归档通知（${newsData.archived.length}条）</div>`;
        newsHTML += '<ul class="news-list">';

        newsData.archived.forEach(item => {
            const badgeClass = item.badge === 'important' ? 'news-badge important' 
                              : item.badge === 'update' ? 'news-badge update'
                              : item.badge === 'event' ? 'news-badge event'
                              : 'news-badge';
            
            newsHTML += `
                <li class="news-item news-archive-item">
                    <div class="news-content">
                        <p class="news-text">
                            <span class="${badgeClass}">${getBadgeText(item.badge)}</span>
                            ${item.text}
                        </p>
                    </div>
                    <span class="news-date">${formatDate(item.date)}</span>
                </li>
            `;
        });

        newsHTML += '</ul>';
        newsHTML += '</div>';
    }

    // 页脚
    newsHTML += `<div class="news-footer">
        <span class="news-count">共 ${newsData.active.length} 条最新通知</span>
        ${newsData.archived && newsData.archived.length > 0 ? '<button class="news-toggle-btn">查看归档</button>' : ''}
    </div>`;

    // 替换内容
    const newsTitle = newsContainer.querySelector('.news-title');
    const newsList = newsContainer.querySelector('.news-list');
    const newsFooter = newsContainer.querySelector('.news-footer');
    
    if (newsTitle) newsTitle.remove();
    if (newsList) newsList.remove();
    if (newsFooter) newsFooter.remove();
    const oldArchive = newsContainer.querySelector('.news-archive');
    if (oldArchive) oldArchive.remove();

    newsContainer.innerHTML = newsHTML;

    // 重新绑定事件
    const newsToggleBtn = newsContainer.querySelector('.news-toggle-btn');
    const newsArchive = newsContainer.querySelector('.news-archive');
    
    if (newsToggleBtn && newsArchive) {
        newsToggleBtn.addEventListener('click', function() {
            newsArchive.classList.toggle('active');
            this.textContent = newsArchive.classList.contains('active') ? '收起归档' : '查看归档';
        });
    }
}

// 辅助函数
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

    if (diffDays === 0) {
        return '今天';
    } else if (diffDays === 1) {
        return '昨天';
    } else if (diffDays < 7) {
        return `${diffDays}天前`;
    } else {
        return dateStr;
    }
}
/* 修改公告内容时保留 ID；只有需要所有访客重新阅读时才更新 ID。 */
(() => {
    const announcementId = 'contributor-rewards-2026-09';
    const storageKey = `bdic:announcement:${announcementId}:dismissed`;
    const scriptUrl = document.currentScript.src;
    const contributionUrl = new URL('../about/how-to-contribute/', scriptUrl).href;
    let dismissed = false;
    try {
        dismissed = localStorage.getItem(storageKey) === 'true';
    } catch (_) {
        // 存储不可用时仍可正常阅读、关闭；当前页面生命周期内记住关闭状态。
    }

    function initializeAnnouncement() {
        if (dismissed || document.getElementById('bdic-announcement')) return;
        const dialog = document.createElement('dialog');
        dialog.id = 'bdic-announcement';
        dialog.className = 'bdic-announcement';
        dialog.setAttribute('aria-labelledby', 'bdic-announcement-title');
        dialog.innerHTML = `
            <header class="bdic-announcement-header">
                <span class="bdic-announcement-label">📢 重要公告 · 社区接力</span>
                <button type="button" class="bdic-announcement-close" aria-label="关闭公告，不再显示">×</button>
            </header>
            <div class="bdic-announcement-content">
                <h2 id="bdic-announcement-title" tabindex="-1">让 BDIC 知识库，一届一届传下去</h2>
                <p>Hi，朋友们 👋</p>
                <p><strong>BDIC 知识库已经运行很久了。</strong>过去一年里，很多同学一起完善了课程信息、学习经验和各种 BDIC 相关资料。不过随着首批贡献者陆续毕业，知识库也需要更多在读同学继续接力维护。</p>
                <p>我们希望它不只是一个“毕业之后就停更”的项目，而是能够一届一届传下去，持续帮助后来的人。</p>
                <p>所以，我们准备给参与知识库维护的同学提供一点小小的贡献奖励：</p>
                <div class="bdic-announcement-reward"><strong>🎁 更新一次有效的课程信息，可获得 1M Token 的 Claude Opus 4.6 / Gemini Flash-3.8 使用额度。</strong></div>
                <p>这些 Token 可以在常见的 AI Coding / Agent Harness 中使用。</p>
                <p>所有 Token 都由我个人提供，不涉及任何商业合作。只是希望用这种方式感谢每一位愿意花时间补充和维护知识库的同学，也给 BDIC 的社区建设尽一点自己的力量。</p>
                <p><strong>你可以贡献的内容包括但不限于：</strong></p>
                <ul>
                    <li>更新课程时间、考核方式、授课老师等信息</li>
                    <li>补充课程评价和学习经验</li>
                    <li>修正已经过时或错误的内容</li>
                    <li>完善培养方案、选课、交换、升学等相关资料</li>
                    <li>补充任何你认为能够帮助后来同学的信息</li>
                </ul>
                <p>哪怕只是一次很小的更新，也是在帮助下一届同学。</p>
                <p>如果你对<strong>贡献内容、提交方式或者 Token 奖励</strong>有任何疑问，欢迎随时通过 <a href="mailto:bdicfun@gmail.com">bdicfun@gmail.com</a> 联系我们。</p>
                <p>🌐 <a href="https://kb.bdic.fun">BDIC 知识库 · kb.bdic.fun</a></p>
                <p>希望这个由学生共同维护的知识库，可以一直传下去。❤️</p>
            </div>
            <footer class="bdic-announcement-footer">
                <a class="bdic-announcement-contribute" href="${contributionUrl}">了解如何贡献 →</a>
                <button type="button" class="bdic-announcement-dismiss">我知道了，不再显示</button>
            </footer>`;

        function rememberDismissal() {
            dismissed = true;
            try {
                localStorage.setItem(storageKey, 'true');
            } catch (_) {
                // 浏览器禁止持久存储时不阻止关闭。
            }
        }
        function closeAnnouncement() {
            rememberDismissal();
            dialog.close();
        }
        dialog.querySelector('.bdic-announcement-close').addEventListener('click', closeAnnouncement);
        dialog.querySelector('.bdic-announcement-dismiss').addEventListener('click', closeAnnouncement);
        dialog.querySelector('.bdic-announcement-contribute').addEventListener('click', closeAnnouncement);
        dialog.addEventListener('cancel', rememberDismissal);
        dialog.addEventListener('close', () => {
            document.documentElement.classList.remove('bdic-announcement-open');
            dialog.remove();
        });
        document.body.appendChild(dialog);
        dialog.showModal();
        document.documentElement.classList.add('bdic-announcement-open');
        dialog.querySelector('h2').focus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAnnouncement, { once: true });
    } else {
        initializeAnnouncement();
    }
})();

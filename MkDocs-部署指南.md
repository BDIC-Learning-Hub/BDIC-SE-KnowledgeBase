# MkDocs 部署指南

本指南将帮助您将 BDIC 软件工程知识库使用 Material for MkDocs 部署为网站。

## 📋 调整前后对比

### 当前结构
```
BDIC-SE-KnowledgeBase/
├── courses/
│   ├── Stage1-1/
│   ├── Stage1-2/
│   ├── Stage2-1/
│   ├── Stage2-2/
│   ├── Stage3-1/
│   └── Stage3-2/
├── README.md
└── LICENSE
```

### MkDocs 结构
```
BDIC-SE-KnowledgeBase/
├── mkdocs.yml              # MkDocs 配置文件
├── docs/                   # 文档根目录
│   ├── index.md           # 首页
│   ├── assets/            # 静态资源
│   │   ├── pdfs/         # PDF 文件
│   │   ├── images/       # 图片文件
│   │   ├── downloads/    # 下载资源
│   │   ├── extra.css     # 自定义样式
│   │   └── extra.js      # 自定义脚本
│   ├── stage1/           # 第一学年
│   ├── stage2/           # 第二学年
│   ├── stage3/           # 第三学年
│   ├── resources/        # 学习资源
│   └── about/            # 关于页面
├── courses/              # 原始课程目录（保留）
├── README.md
└── LICENSE
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装 Python（如果尚未安装）
# 推荐使用 Python 3.8+

# 安装 MkDocs 和主题
pip install mkdocs-material

# 安装额外插件
pip install mkdocs-minify-plugin
pip install mkdocs-glightbox
```

### 2. 本地预览

```bash
# 在项目根目录运行
mkdocs serve

# 访问 http://127.0.0.1:8000 查看网站
```

### 3. 构建网站

```bash
# 构建静态网站文件
mkdocs build

# 生成的文件在 site/ 目录中
```

## 📂 内容迁移指南

### 第一步：移动 PDF 资源

```bash
# 创建资源目录结构
mkdir -p docs/assets/pdfs/{textbooks,slides,exams,papers}
mkdir -p docs/assets/images/{diagrams,screenshots,icons}
mkdir -p docs/assets/downloads/{code,datasets,tools}

# 移动 PDF 文件到对应目录
# 例如：将教材放入 docs/assets/pdfs/textbooks/
# 将试卷放入 docs/assets/pdfs/exams/
# 将课件放入 docs/assets/pdfs/slides/
```

**PDF 文件命名建议：**
```
docs/assets/pdfs/
├── textbooks/
│   ├── data-structures-java.pdf
│   ├── operating-system-concepts.pdf
│   └── computer-networks-tanenbaum.pdf
├── slides/
│   ├── comp2010j-week1-introduction.pdf
│   ├── comp2011j-oop-basics.pdf
│   └── comp3009j-information-retrieval.pdf
├── exams/
│   ├── comp1004j-final-2024.pdf
│   ├── comp2012j-midterm-2023.pdf
│   └── bdic2005j-final-2024.pdf
└── papers/
    ├── machine-learning-survey.pdf
    └── software-architecture-patterns.pdf
```

### 第二步：转换 README 内容

将现有的课程 README.md 文件内容转换为新的 Markdown 格式：

**原格式示例：**
```markdown
# Programming Fundamentals 1 (程序设计概论1)

> 课程编号：COMP1011J
> 考核形式：[待补充]% Final + [待补充]% Coursework
> 授课教师：Seán Russell

## 课程介绍
...
```

**新格式示例：**
```markdown
# 程序设计概论1 (Programming Fundamentals 1)

> **课程编号**：COMP1004J  
> **考核形式**：期末考试 + 课程作业 + 项目  
> **授课教师**：[Seán Russell](链接)  
> **开课学期**：第一学年秋季学期

## :books: 课程介绍
...

## :memo: 往年资料
- 📄 [期末考试样题](../../assets/pdfs/exams/comp1004j-sample-exam.pdf)
- 📄 [2023年期末试卷](../../assets/pdfs/exams/comp1004j-final-2023.pdf)
```

### 第三步：链接资源文件

在新的 Markdown 文件中，使用相对路径链接资源：

```markdown
<!-- 从课程页面（如 stage1/autumn/programming1.md）链接 PDF -->
📄 [教材下载](../../assets/pdfs/textbooks/python-programming.pdf)
📑 [期末试卷](../../assets/pdfs/exams/comp1004j-final-2024.pdf)
🖼️ ![系统架构图](../../assets/images/diagrams/system-architecture.png)

<!-- 从根目录（index.md）链接 PDF -->
📄 [教材下载](assets/pdfs/textbooks/python-programming.pdf)
```

## 🎨 自定义样式

### Material for MkDocs 特色功能

1. **卡片布局**：
```markdown
<div class="grid cards" markdown>

-   :material-school:{ .lg .middle } __第一学年课程__

    ---

    程序设计基础、数学基础和软件工程入门

    [:octicons-arrow-right-24: 查看课程](stage1/)

</div>
```

2. **提示框**：
```markdown
!!! tip "学习建议"
    这里是重要的学习建议内容

!!! warning "注意事项"
    这里是需要注意的内容

!!! danger "严禁行为"
    这里是绝对禁止的行为
```

3. **标签页**：
```markdown
=== "初学者推荐"

    - IDLE：Python 自带的开发环境
    - Thonny：简单易用的 Python IDE

=== "进阶用户"

    - PyCharm：功能强大的专业 IDE
    - VS Code：轻量级但功能丰富的编辑器
```

4. **折叠内容**：
```markdown
??? question "我之前没有编程基础，会不会跟不上？"

    不用担心！这门课程就是为零基础学生设计的...
```

## 🚀 部署到 GitHub Pages

### 1. 使用 GitHub Actions 自动部署

创建 `.github/workflows/ci.yml`：

```yaml
name: ci 
on:
  push:
    branches:
      - master 
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV 
      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install mkdocs-material 
      - run: pip install mkdocs-minify-plugin mkdocs-glightbox
      - run: mkdocs gh-deploy --force
```

### 2. 手动部署

```bash
# 构建并部署到 GitHub Pages
mkdocs gh-deploy

# 或者分步执行
mkdocs build
# 将 site/ 目录内容推送到 gh-pages 分支
```

### 3. 启用 GitHub Pages

1. 在 GitHub 仓库设置中找到 "Pages"
2. 选择 "Deploy from a branch"
3. 选择 `gh-pages` 分支
4. 等待部署完成

## ⚙️ 高级配置

### 搜索功能

```yaml
# mkdocs.yml
plugins:
  - search:
      separator: '[\s\u200b\-]'  # 支持中文分词
```

### 多语言支持

```yaml
# mkdocs.yml
theme:
  name: material
  language: zh  # 设置为中文
```

### SEO 优化

```yaml
# mkdocs.yml
site_description: 北京都柏林国际学院软件工程专业学习资源与经验分享
site_keywords: BDIC, 软件工程, 学习资源, 课程指南

plugins:
  - meta  # 支持页面级别的 meta 标签
```

### 社交媒体卡片

```yaml
# mkdocs.yml
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/BDIC-Learning-Hub
    - icon: fontawesome/solid/envelope
      link: mailto:le.liu1@ucdconnect.ie
```

## 📝 内容创作指南

### Markdown 增强功能

1. **数学公式**：
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\frac{d}{dx}\left( \int_{0}^{x} f(u) \, du\right) = f(x)
$$
```

2. **代码高亮**：
```python
def hello_world():
    print("Hello, BDIC!")
```

3. **表格**：
```markdown
| 课程代码 | 课程名称 | 学分 |
|---------|---------|------|
| COMP1004J | 程序设计概论1 | 5 |
| COMP2010J | 数据结构与算法I | 5 |
```

4. **流程图（Mermaid）**：
```markdown
```mermaid
graph TD
    A[开始学习] --> B{是否理解概念?}
    B -->|是| C[做练习题]
    B -->|否| D[重新学习]
    C --> E[完成项目]
    D --> B
```

## 🔧 常见问题

### Q: 如何处理大文件（如大型 PDF）？

A: 
1. **使用 Git LFS**：对于大于 100MB 的文件
2. **外部托管**：将大文件上传到云存储，在文档中提供链接
3. **文件压缩**：适当压缩 PDF 文件大小

### Q: 如何保持原有的 Git 历史？

A:
1. 不要删除原有的 `courses/` 目录
2. 在 `docs/` 中创建新的组织结构
3. 逐步迁移内容，保持两套结构并存一段时间

### Q: 如何处理中文路径和文件名？

A:
1. URL 路径使用英文和连字符：`stage1/autumn/programming1.md`
2. 页面标题可以使用中文：`# 程序设计概论1`
3. 文件名避免空格和特殊字符

### Q: 网站加载速度慢怎么办？

A:
1. 启用 `mkdocs-minify-plugin` 压缩文件
2. 优化图片大小和格式
3. 使用 CDN 加速静态资源
4. 启用浏览器缓存

## 📚 推荐资源

- [Material for MkDocs 官方文档](https://squidfunk.github.io/mkdocs-material/)
- [MkDocs 官方文档](https://www.mkdocs.org/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [GitHub Pages 部署指南](https://docs.github.com/en/pages)

---

通过以上配置，您的 BDIC 软件工程知识库将拥有：

✅ **现代化的界面**：Material Design 风格  
✅ **优秀的用户体验**：响应式设计、深色模式切换  
✅ **强大的搜索功能**：支持中文搜索  
✅ **丰富的内容展示**：卡片、标签页、提示框等  
✅ **自动化部署**：GitHub Actions 自动部署到 GitHub Pages  
✅ **良好的 SEO**：搜索引擎优化  

祝您部署成功！🎉
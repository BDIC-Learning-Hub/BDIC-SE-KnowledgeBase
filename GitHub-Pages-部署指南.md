# GitHub Pages 自动部署指南

## 🚀 自动部署配置

本项目已配置GitHub Actions自动部署到GitHub Pages。每当您推送代码到`main`分支时，网站会自动更新。

## 📋 部署前置条件

### 1. 启用GitHub Pages

1. 进入您的GitHub仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 检查仓库权限

确保GitHub Actions有足够的权限：

1. 进入 **Settings** → **Actions** → **General**
2. 在 **Workflow permissions** 部分选择：
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

## 🔄 部署流程

### 自动部署
- 推送到`main`分支时自动触发
- 构建和部署过程约需2-5分钟
- 部署完成后，网站会在几分钟内更新

### 手动部署
1. 进入仓库的 **Actions** 标签
2. 选择 **部署文档到 GitHub Pages** 工作流
3. 点击 **Run workflow** 按钮

## 📁 项目结构

```
BDIC-SE-KnowledgeBase/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions配置
├── docs/                   # 文档源文件
│   ├── courses/           # 课程内容
│   ├── about/             # 关于页面
│   └── index.md           # 首页
├── mkdocs.yml             # MkDocs配置
├── requirements.txt       # Python依赖
└── README.md
```

## 🛠️ 本地开发

### 安装依赖
```bash
pip install -r requirements.txt
```

### 启动开发服务器
```bash
mkdocs serve
```

### 本地构建
```bash
mkdocs build
```

### 手动部署（不推荐）
```bash
mkdocs gh-deploy
```

## 📝 内容更新流程

1. **编辑内容**：在 `docs/` 目录下编辑Markdown文件
2. **本地预览**：运行 `mkdocs serve` 预览效果
3. **提交更改**：
   ```bash
   git add .
   git commit -m "更新课程内容"
   git push origin main
   ```
4. **自动部署**：推送后GitHub Actions会自动部署

## 🌐 访问网站

部署完成后，您的网站将在以下地址可访问：
```
https://bdic-learning-hub.github.io/BDIC-SE-KnowledgeBase/
```

## ⚠️ 注意事项

1. **文件路径**：确保所有文档文件都在 `docs/` 目录下
2. **图片资源**：建议放在 `docs/assets/images/` 目录
3. **PDF文件**：建议放在 `docs/assets/downloads/` 目录
4. **链接格式**：使用相对路径，确保链接在生产环境正常工作

## 🔍 故障排除

### 部署失败
1. 检查GitHub Actions日志
2. 确认`mkdocs.yml`配置正确
3. 验证所有链接的文件存在

### 网站显示异常
1. 检查Markdown语法
2. 确认图片路径正确
3. 验证导航配置

### 更新不及时
- GitHub Pages可能需要几分钟缓存刷新
- 尝试硬刷新浏览器 (Ctrl+F5)

## 📊 监控部署状态

在仓库主页可以看到：
- ✅ 绿色勾号：部署成功
- ❌ 红色叉号：部署失败
- 🟡 黄色圆点：正在部署

点击状态图标可以查看详细的部署日志。
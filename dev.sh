#!/bin/bash
# LinguaFlow 项目开发快捷脚本
# 作者: LinguaFlow 开发团队
# 日期: $(date +%Y-%m-%d)

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}
╔═══════════════════════════════════════════════════════════╗
║                    LinguaFlow 多语言学习平台               ║
║                      开发助手 v1.0.0                        ║
╚═══════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}
可选命令:
${NC}
${GREEN}  dev          ${NC}- 启动开发服务器（前端 + 后端）
${GREEN}  frontend     ${NC}- 只启动前端开发服务器
${GREEN}  backend      ${NC}- 只启动后端开发服务器
${GREEN}  build        ${NC}- 构建生产版本
${GREEN}  preview      ${NC}- 预览生产构建
${GREEN}  clean        ${NC}- 清理构建文件
${GREEN}  setup        ${NC}- 重新安装依赖
${GREEN}  check        ${NC}- 检查项目健康状况
${GREEN}  help         ${NC}- 显示帮助信息
${GREEN}  update       ${NC}- 更新依赖
${GREEN}  test         ${NC}- 运行测试
"

case "$1" in
  dev)
    echo -e "${GREEN}🚀 启动完整开发环境...${NC}"
    npm run dev:frontend &
    sleep 3
    npm run dev:backend
    ;;
  frontend)
    echo -e "${BLUE}🎨 启动前端开发服务器...${NC}"
    npm run dev:frontend
    ;;
  backend)
    echo -e "${GREEN}🔧 启动后端开发服务器...${NC}"
    npm run dev:backend
    ;;
  build)
    echo -e "${YELLOW}📦 构建生产版本...${NC}"
    npm run build
    ;;
  preview)
    echo -e "${BLUE}👀 预览生产构建...${NC}"
    npm run preview
    ;;
  clean)
    echo -e "${RED}🧹 清理构建文件...${NC}"
    rm -rf node_modules
    rm -rf dist
    rm -rf .vite
    rm -f package-lock.json
    echo -e "${GREEN}✅ 清理完成！${NC}"
    ;;
  setup)
    echo -e "${GREEN}🔧 设置开发环境...${NC}"
    npm install
    echo -e "${GREEN}✅ 依赖安装完成！${NC}"
    ;;
  check)
    echo -e "${BLUE}🔍 检查项目健康状况...${NC}"
    echo -e "${YELLOW}--- Node.js ---${NC}"
    node --version
    echo -e "${YELLOW}--- npm ---${NC}"
    npm --version
    echo -e "${YELLOW}--- TypeScript ---${NC}"
    npx tsc --version 2>/dev/null || echo "未全局安装 TypeScript"
    echo -e "${YELLOW}--- 依赖检查 ---${NC}"
    npm audit
    ;;
  update)
    echo -e "${YELLOW}📦 更新依赖...${NC}"
    npm update
    npm audit fix
    ;;
  test)
    echo -e "${YELLOW}🧪 运行测试...${NC}"
    echo "测试功能开发中..."
    ;;
  help|--help|-h)
    # 帮助信息已在顶部显示
    ;;
  *)
    echo -e "${RED}❌ 未知命令: $1${NC}"
    echo "使用 'npm run help' 查看帮助"
    exit 1
    ;;
esac

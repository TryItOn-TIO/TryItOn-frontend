#!/bin/bash

echo "=== Install Dependencies Phase ==="

cd /var/www/tryiton-frontend

# Node.js 버전 확인
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# npm 캐시 정리
npm cache clean --force

# 기존 node_modules 제거 (깨끗한 설치)
if [ -d "node_modules" ]; then
    echo "Removing existing node_modules..."
    rm -rf node_modules
fi

# package-lock.json 존재 확인
if [ -f "package-lock.json" ]; then
    echo "Installing dependencies with npm ci..."
    npm ci --only=production --no-audit
else
    echo "Installing dependencies with npm install..."
    npm install --only=production --no-audit
fi

# 설치 결과 확인
if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully"
else
    echo "Failed to install dependencies"
    exit 1
fi

# .next 디렉토리 권한 설정
if [ -d ".next" ]; then
    chmod -R 755 .next
fi

echo "Install dependencies completed"
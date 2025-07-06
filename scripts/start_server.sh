#!/bin/bash

echo "=== Application Start Phase ==="

cd /var/www/tryiton-frontend

# ecosystem.config.js 파일 존재 확인
if [ ! -f "ecosystem.config.js" ]; then
    echo "Error: ecosystem.config.js not found"
    exit 1
fi

# .next 디렉토리 존재 확인
if [ ! -d ".next" ]; then
    echo "Error: .next directory not found. Build may have failed."
    exit 1
fi

# PM2로 애플리케이션 시작
echo "Starting application with PM2..."
pm2 start ecosystem.config.js

# PM2 프로세스 상태 확인
sleep 5
if pm2 list | grep -q "tryiton-frontend.*online"; then
    echo "Application started successfully"

    # PM2 설정 저장
    pm2 save

    # 시스템 재시작 시 자동 시작 설정
    pm2 startup systemd -u ec2-user --hp /home/ec2-user

else
    echo "Failed to start application"
    pm2 logs tryiton-frontend --lines 20
    exit 1
fi

echo "Application start completed"
#!/bin/bash

echo "=== Application Stop Phase ==="

# PM2 프로세스 상태 확인
if pm2 list | grep -q "tryiton-frontend"; then
    echo "Stopping PM2 process: tryiton-frontend"

    # Graceful shutdown (30초 대기)
    pm2 stop tryiton-frontend
    sleep 5

    # 프로세스 삭제
    pm2 delete tryiton-frontend

    echo "PM2 process stopped and deleted"
else
    echo "No PM2 process found to stop"
fi

# 포트 3000 사용 중인 프로세스 강제 종료 (안전장치)
if lsof -ti:3000; then
    echo "Killing processes on port 3000"
    sudo kill -9 $(lsof -ti:3000) || true
fi

echo "Application stop completed"
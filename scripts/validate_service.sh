#!/bin/bash

echo "=== Validate Service Phase ==="

# 서비스 시작 대기
echo "Waiting for service to be ready..."
sleep 15

# PM2 상태 확인
echo "Checking PM2 status..."
pm2 status

# 프로세스 실행 확인
if ! pm2 list | grep -q "tryiton-frontend.*online"; then
    echo "PM2 process is not running"
    pm2 logs tryiton-frontend --lines 20
    exit 1
fi

# HTTP 응답 확인 (최대 5번 시도)
echo "Checking HTTP response..."
for i in {1..5}; do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")

    if [ "$response" = "200" ]; then
        echo "Service is responding correctly (HTTP $response)"
        break
    else
        echo "Attempt $i: HTTP response code: $response"
        if [ $i -eq 5 ]; then
            echo "Service validation failed after 5 attempts"
            pm2 logs tryiton-frontend --lines 20
            exit 1
        fi
        sleep 10
    fi
done

# 메모리 사용량 확인
echo "Checking memory usage..."
pm2 show tryiton-frontend

echo "Service validation completed successfully"
#!/bin/bash

echo "=== Before Install Phase ==="

# 배포 디렉토리 생성 (없는 경우)
sudo mkdir -p /var/www/tryiton-frontend
sudo chown ec2-user:ec2-user /var/www/tryiton-frontend

# PM2 로그 디렉토리 생성
sudo mkdir -p /var/log/pm2
sudo chown ec2-user:ec2-user /var/log/pm2

# 이전 배포 백업 (롤백용)
if [ -d "/var/www/tryiton-frontend/.next" ]; then
    echo "Backing up previous deployment..."
    sudo rm -rf /var/www/tryiton-frontend-backup
    sudo cp -r /var/www/tryiton-frontend /var/www/tryiton-frontend-backup
fi

echo "Before install completed"
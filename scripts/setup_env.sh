#!/bin/bash

echo "=== Setting up environment variables ==="

cd /var/www/tryiton-frontend

# AWS Systems Manager Parameter Store에서 환경변수 가져오기
echo "Fetching environment variables from Parameter Store..."

# API URL 가져오기
NEXT_PUBLIC_API_URL=$(aws ssm get-parameter --name "/tryiton/frontend/api-url" --query "Parameter.Value" --output text --region ap-northeast-2 2>/dev/null || echo "http://localhost:8080")

# Google Client ID 가져오기 (SecureString)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=$(aws ssm get-parameter --name "/tryiton/frontend/google-client-id" --with-decryption --query "Parameter.Value" --output text --region ap-northeast-2 2>/dev/null || echo "")

# .env.production 파일 생성
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
EOF

# 파일 권한 설정
chmod 600 .env.production
chown ec2-user:ec2-user .env.production

echo "Environment variables configured successfully"
echo "API URL: ${NEXT_PUBLIC_API_URL}"
echo "Google Client ID: ${NEXT_PUBLIC_GOOGLE_CLIENT_ID:0:20}..." # 일부만 표시

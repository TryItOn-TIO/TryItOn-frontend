module.exports = {
    apps: [{
        // 애플리케이션 이름 (PM2에서 식별용)
        name: 'tryiton-frontend',

        // 실행할 스크립트 (npm을 통해 Next.js 시작)
        script: 'npm',
        args: 'start',  // npm start 명령어 실행

        // 클러스터 설정
        instances: 'max',        // CPU 코어 수만큼 프로세스 생성
        exec_mode: 'cluster',    // 클러스터 모드 활성화

        // 환경 변수 설정 (실제 값은 배포 시 주입됨)
        env: {
            NODE_ENV: 'production',
            PORT: 3000,
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
            NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
        },

        // 로그 파일 경로
        error_file: '/var/log/pm2/tryiton-frontend-error.log',
        out_file: '/var/log/pm2/tryiton-frontend-out.log',
        log_file: '/var/log/pm2/tryiton-frontend.log',

        // 로그에 타임스탬프 추가
        time: true,

        // 메모리 사용량이 1GB 초과시 자동 재시작
        max_memory_restart: '1G',

        // Node.js 메모리 옵션
        node_args: '--max_old_space_size=1024',

        // 자동 재시작 설정
        autorestart: true,

        // 파일 변경 감지 (프로덕션에서는 false)
        watch: false,

        // 재시작 지연 시간 (밀리초)
        restart_delay: 4000,

        // 최대 재시작 횟수 (무한 재시작 방지)
        max_restarts: 10,

        // 재시작 간격 (1분)
        min_uptime: '1m'
    }]
}

# TryItOn Socket 통신 가이드

## 📡 실시간 통신 페이지

TryItOn 프로젝트에 Socket.IO를 사용한 실시간 통신 기능이 추가되었습니다.

### 🚀 페이지 접속

1. **기본 Socket 테스트 페이지**
   ```
   http://localhost:3000/socket-room
   ```

2. **고급 가상 피팅룸 페이지**
   ```
   http://localhost:3000/socket-room/advanced
   ```

### 🔧 사전 준비

1. **Node.js Socket 서버 실행**
   ```bash
   # Node.js 서버가 localhost:8081에서 실행되어야 함
   # Socket.IO 서버 코드는 별도 레포지토리에서 관리
   ```

2. **프론트엔드 개발 서버 실행**
   ```bash
   npm run dev
   ```

### 📋 주요 기능

#### 1. 방 관리
- **방 생성**: 새로운 채팅방 생성 (최대 2명)
- **방 목록 조회**: 현재 생성된 방 목록 확인
- **방 입장**: 기존 방에 입장
- **방 나가기**: 현재 방에서 퇴장

#### 2. 실시간 채팅
- **메시지 전송**: 실시간 메시지 송수신
- **사용자 구분**: 왼쪽/오른쪽 사이드로 사용자 구분
- **시스템 메시지**: 입장/퇴장 알림

#### 3. 아바타 동기화
- **아바타 업데이트**: 이미지 URL로 아바타 변경
- **실시간 동기화**: 상대방에게 실시간으로 아바타 변경 사항 전파
- **상품 정보**: 착용 중인 상품 정보 표시

### 🎯 사용 시나리오

#### 시나리오 1: 새 방 생성 및 입장
1. 사용자 이름 입력
2. 방 이름 입력 후 "방 생성하기" 클릭
3. 자동으로 생성된 방에 입장
4. 다른 사용자가 방 목록에서 해당 방 선택 후 입장

#### 시나리오 2: 기존 방 입장
1. 사용자 이름 입력
2. 방 목록에서 원하는 방 선택
3. "선택한 방 입장" 클릭

#### 시나리오 3: 실시간 채팅
1. 방 입장 후 하단 메시지 입력창에 메시지 작성
2. "전송" 버튼 클릭 또는 Enter 키 입력
3. 상대방에게 실시간으로 메시지 전달

#### 시나리오 4: 아바타 업데이트
1. 아바타 이미지 URL 입력
2. "아바타 업데이트" 클릭
3. 상대방 화면에 실시간으로 아바타 변경 사항 반영

### 🔗 API 연동 포인트

#### Spring Boot 연동 지점
```typescript
// 실제 구현 시 Spring Boot API와 연동
const updateAvatar = async (productId: number) => {
  // 1. Spring Boot에서 AI 처리
  const response = await fetch('http://localhost:8080/api/try-on', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  });
  const avatarData = await response.json();
  
  // 2. Node.js로 결과 전파
  socket.emit('updateAvatar', avatarData);
};
```

### 📁 파일 구조

```
src/
├── types/
│   └── socket.ts              # Socket.IO 타입 정의
├── hooks/
│   └── useSocket.ts           # Socket 연결 관리 훅
├── api/
│   └── socketApi.ts           # Socket 서버 REST API
├── components/
│   └── AvatarDisplay.tsx      # 아바타 표시 컴포넌트
└── app/
    └── socket-room/
        ├── page.tsx           # 기본 Socket 테스트 페이지
        └── advanced.tsx       # 고급 가상 피팅룸 페이지
```

### 🐛 트러블슈팅

#### 1. Socket 연결 실패
- Node.js 서버가 localhost:8081에서 실행 중인지 확인
- CORS 설정 확인 (http://localhost:3000 허용)
- 브라우저 개발자 도구에서 네트워크 탭 확인

#### 2. 방 생성/입장 실패
- 사용자 이름과 방 이름이 올바르게 입력되었는지 확인
- 방 최대 인원(2명) 초과 여부 확인
- 서버 로그 확인

#### 3. 메시지 전송 실패
- Socket 연결 상태 확인
- 방에 입장한 상태인지 확인
- 메시지 내용이 비어있지 않은지 확인

#### 4. 아바타 업데이트 실패
- 이미지 URL이 유효한지 확인
- CORS 정책으로 인한 이미지 로드 실패 가능성
- 네트워크 연결 상태 확인

### 🔄 개발 플로우

1. **Socket 서버 개발** (Node.js)
2. **프론트엔드 Socket 클라이언트 개발** (React + Socket.IO Client)
3. **Spring Boot API 연동**
4. **AI 처리 결과 Socket으로 전파**
5. **실시간 아바타 동기화**

### 📝 추가 개발 예정 기능

- [ ] 음성 채팅 지원
- [ ] 화면 공유 기능
- [ ] 방 비밀번호 설정
- [ ] 사용자 프로필 이미지
- [ ] 채팅 기록 저장
- [ ] 이모티콘 지원
- [ ] 파일 전송 기능

---

## 🎉 완성!

이제 TryItOn 프로젝트에서 실시간 통신 기능을 사용할 수 있습니다!
Socket 서버와 함께 실행하여 실시간 가상 피팅룸을 체험해보세요. 🚀

# TryItOn Frontend

## 📖 프로젝트 소개: 나만의 온라인 가상 피팅룸

TryItOn은 온라인 쇼핑의 가장 큰 장벽인 '사이즈 불확실성'을 해결하기 위해 탄생한 서비스입니다. 사용자는 자신의 신체 정보를 입력하여 가상 아바타를 만들고, 원하는 옷을 아바타에 직접 입혀보며 사이즈와 핏을 시각적으로 확인할 수 있습니다. 이를 통해 온라인에서도 실패 없는 쇼핑 경험을 제공하는 것을 목표로 합니다.

---

## ✨ 서비스 주요 기능

-   **가상 피팅:** 개인화된 3D 아바타에 상품을 착용하여 사이즈와 핏을 시각적으로 확인합니다.
-   **AI 기반 상품 추천:** 사용자 데이터 기반으로 개인화된 상품을 추천받습니다.
-   **사용자 맞춤형 마이페이지:** 주문 내역, 위시리스트, 신체 정보를 통합 관리합니다.
-   **간편한 쇼핑 경험:** 소셜 로그인과 간편 결제로 쇼핑 프로세스를 단축합니다.

---

## 🛠️ 기술 스택 상세

-   **Core Framework:** **Next.js (v15)**, **React (v19)**, **TypeScript**
    -   Next.js의 서버사이드 렌더링(SSR)과 파일 기반 라우팅을 활용하여 초기 로딩 속도를 개선하고 사용자 경험(UX)과 검색 엔진 최적화(SEO)를 향상시켰습니다.
-   **서버 상태 관리:** **TanStack Query (React Query v5)**
    -   서버로부터 받아오는 데이터(상품, 사용자 정보 등)를 클라이언트에서 효율적으로 캐싱하고 관리합니다. `stale-while-revalidate` 전략을 통해 사용자에게는 최신 데이터를 즉시 보여주면서 백그라운드에서 데이터를 업데이트하여 API 호출을 최소화하고 데이터 정합성을 유지합니다.
-   **클라이언트 상태 관리:** **Zustand**
    -   복잡한 보일러플레이트 없이 상태를 관리할 수 있는 경량 라이브러리입니다. 컴포넌트 트리와 독립적으로 상태를 관리하여 불필요한 리렌더링을 방지하고, UI 상호작용과 관련된 상태(예: 모달, 탭 상태)를 직관적으로 제어합니다.
-   **스타일링 및 애니메이션:** **Tailwind CSS (v4)**, **Framer Motion**
    -   유틸리티 우선의 Tailwind CSS를 통해 개발 생산성을 높이고, 빌드 시 사용하지 않는 스타일을 제거(Tree-shaking)하여 최종 CSS 번들 사이즈를 최소화했습니다.
    -   Framer Motion을 이용해 GPU 가속을 활용한 부드러운 인터랙티브 애니메이션을 구현하여 사용자 경험을 향상시켰습니다.
-   **HTTP Client:** **Axios**
    -   API 요청/응답을 인터셉트하여 인증 토큰(JWT)을 자동으로 삽입하거나, 에러를 전역적으로 처리하는 등 네트워크 통신을 체계적으로 관리합니다.

---

## 🚀 성능 최적화 전략

-   **정적 에셋 분리 및 CDN 전송:**
    -   `next.config.ts`의 `assetPrefix` 설정을 통해 JS, CSS와 같은 정적 에셋을 애플리케이션 서버가 아닌 **AWS S3 (+CloudFront)** 에서 직접 제공하도록 구성했습니다. 이를 통해 서버 부하를 줄이고, 사용자와 가까운 CDN 엣지 로케이션에서 에셋을 전송하여 로딩 속도를 획기적으로 개선했습니다.
-   **이미지 최적화:**
    -   사용자가 업로드하거나 관리자가 등록하는 모든 이미지는 백엔드에서 최적화 과정을 거쳐 **AWS S3**에 저장됩니다. 프론트엔드에서는 이 최적화된 이미지를 직접 로드하여 이미지 렌더링 시간을 단축하고, `next/image` 대신 일반 `<img>` 태그를 사용하되 `loading="lazy"` 속성을 부여하여 뷰포트에 보이지 않는 이미지는 로딩을 지연시킵니다.
-   **코드 스플리팅 (Code Splitting):**
    -   Next.js의 기본 동작 방식인 페이지 기반 코드 스플리팅을 적극 활용합니다. 각 페이지에 필요한 JavaScript만 초기에 로드하므로, 첫 페이지 진입(FCP) 속도가 매우 빠릅니다.
-   **API 요청 최소화:**
    -   **TanStack Query**의 캐싱 기능을 통해 동일한 데이터 요청이 발생했을 때 네트워크를 거치지 않고 캐시된 데이터를 즉시 반환합니다. 이를 통해 서버 부하를 줄이고 사용자 인터페이스의 반응성을 높였습니다.
-   **개발 환경 최적화:**
    -   개발 서버 실행 시 Rust 기반의 번들러인 **Turbopack** (`--turbopack` 플래그)을 사용하여 코드 변경 시 매우 빠른 리프레시 속도를 제공함으로써 개발 생산성을 극대화했습니다.
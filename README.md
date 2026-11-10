# Build Flow

웹 제작 서비스, 포트폴리오, 예상 견적, 상담 안내를 제공하는 Next.js 프로젝트입니다. 페이지는 `src/app`에 있습니다.

## 로컬 실행

```sh
npm ci
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 상담 링크 설정

상담 버튼은 `src/lib/constants.ts`의 기본 카카오톡 오픈채팅 주소로 연결됩니다. 다른 채팅을 사용하려면 `.env.local` 또는 배포 환경에 아래 환경변수를 설정한 뒤 다시 빌드합니다.

```dotenv
NEXT_PUBLIC_KAKAO_CHAT_URL=https://open.kakao.com/o/sHaPyoWi
```

카카오톡 채널 채팅 또는 오픈채팅 URL을 사용할 수 있습니다. 설정이 비어 있거나 형식이 맞지 않으면 기본 오픈채팅 주소를 사용합니다. 견적과 사례 정보는 상담 화면에서 직접 복사할 수 있습니다.

## 검증

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

배포 전에 서비스 8종에서 견적을 열어 제작 유형을 확인합니다. 선택한 옵션과 금액이 상담 요약에 표시되고, 외부 상담 버튼이 실제 문의 화면으로 이어지는지 확인합니다. 모바일에서는 메뉴 열기·닫기, 화면 폭 변경, 인사이트 팝업의 키보드 닫기와 포커스 복원을 확인합니다.

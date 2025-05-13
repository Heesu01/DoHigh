# 두하이(DOHIGH) – 사내 경험치 관리 웹앱

> **Blaybus 앱 개발 경진대회 슈퍼노바 팀**  
> *최우수상 · 팀워크상 수상작 — 이후 기업 제안으로 협업 개발 및 실서비스 배포*

 </br> 
 </br> 
 
## 프로젝트 개요
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/16fdbd0e-2488-4c6d-bb71-e63a046179be" />

DOHIGH는 구성원들이 자신의 업무 경험을 시각적으로 관리하고, 자기주도적 성장과 레벨업을 통해 동기를 부여받을 수 있도록 설계된 사내 경험치 관리 플랫폼입니다.
초기에는 앱 개발 경진대회 출품작으로 시작해 수상 이후, 기업의 제안으로 인사팀과 추가 개발 인원을 모집해 협업 개발을 진행하였고, 실사용 가능한 시스템으로 완성 및 배포하였습니다.


 </br> 
</br> 

## 주요 역할

- **프론트엔드 개발 전담**  
  - React.js 기반 컴포넌트 설계 및 UI/UX 구현
  - Styled-components를 이용한 반응형 UI 구성
  - 비동기 처리 및 Axios를 활용한 API 통신

- **Firebase를 이용한 푸시 알림 구현**
  - Firebase Cloud Messaging(FCM)을 활용해 사용자 대상 알림 전송
  - 백그라운드/포그라운드 환경 구분 처리, 브라우저 권한 요청 로직 구현
  - 알림 클릭 시 페이지 이동 등 사용자 흐름 제어

- **실서비스 배포**  
  - Netlify를 통한 정적 웹앱 배포
  - HTTPS 인증 및 보안 설정
  - 배포 후 버그 핫픽스 및 운영 대응

- **기획 및 협업**  
  - 회의 및 피드백을 통해 관리자 기능, 경험치 시각화 방식 구체화
  - 요청 기반의 화면 개선 및 기능 추가 주도

 </br>  </br> 

## 주요 기능
<img width="1000" alt="스크린샷 2025-05-03 오후 10 03 55" src="https://github.com/user-attachments/assets/09b0806d-4693-41fe-bb74-bfc8ba9767d3" />


### 1. 홈 대시보드
- 현재 레벨 및 다음 목표 경험치 확인
- 최근 수행한 퀘스트와 경험치 내역 제공
- 시각화된 그래프와 데이터를 통해 경험치 달성도를 직관적으로 파악 가능
![스크린샷 2025-05-04 오후 11 47 57](https://github.com/user-attachments/assets/989db66d-82d3-4bde-85ff-2638b1adf966)


### 2. 경험치 리스트
- 인사평가, 직무 퀘스트, 리더 퀘스트, 전사 프로젝트로 경험치를 카테고리화
- 금/은/동으로 구분된 코인 아이콘을 사용해 경험치 시각화
- 사용자 경험치 데이터를 정렬 및 필터링하여 확인 가능
![스크린샷 2025-05-04 오후 11 48 53](https://github.com/user-attachments/assets/a52b5ae5-dae3-413b-99b9-063acdf466c0)


### 3. 퀘스트 현황
- 월/주별 퀘스트 현황 제공
- 카드 형식 UI로 직관적인 정보 전달
- 퀘스트 달성 여부 확인 가능
<img width="1000" alt="스크린샷 2025-05-04 오후 11 50 27" src="https://github.com/user-attachments/assets/6bb4600a-d871-4c6f-b504-42b38d068852" />


### 4. 게시판
- 관리자 공지사항을 정렬된 리스트 형태로 제공
- 제목/작성일 기준 정렬 및 미리보기 기능
- 최신순 또는 오래된 순으로 정렬 가능
<img width="1000" alt="스크린샷 2025-05-04 오후 11 50 44" src="https://github.com/user-attachments/assets/18071d73-3678-42a8-a91b-73c5ea16b730" />


### 5. 마이페이지
- 사용자 캐릭터 및 정보 수정
- 누적 경험치, 현재 레벨 확인
- 비밀번호 변경 및 관리자 문의
<img width="1000" alt="스크린샷 2025-05-04 오후 11 51 04" src="https://github.com/user-attachments/assets/b5041403-ced4-482c-97b5-068a3e871d8c" />


### 6. 관리자 페이지
- 계정 생성/수정/삭제
- 공지사항 작성 및 관리
- 전체 사용자 경험치/퀘스트 현황 조회
<img width="1132" alt="image" src="https://github.com/user-attachments/assets/4bb806af-24c0-4b4b-ae58-4db559cf4900" />



 </br>  </br> 
 
## ERD
<img width="1000" alt="스크린샷 2025-05-03 오후 10 06 08" src="https://github.com/user-attachments/assets/15cd63c8-7e2b-412e-9928-c90cb426d3c3" />

 </br>  </br> 
## Information Architecture
<img width="1129" alt="image" src="https://github.com/user-attachments/assets/7a559d21-1d8c-4c0e-ac5f-49860dd3aa2b" />
<img width="1000" alt="스크린샷 2025-05-03 오후 10 07 18" src="https://github.com/user-attachments/assets/d6e50170-3e77-4594-9e1e-7d4793bfd781" />

 </br>  </br> 
## 프로젝트 성과

| 항목 | 내용 |
|------|------|
| 수상 | 블레이버스 앱 개발 경진대회 최우수상 · 팀워크상 |
| 실사용성 | 기업 사내 실배포 및 내부 시스템 적용 |
| 효과 | 동기부여 + 자기관리 + 관리자 효율화 통합 플랫폼 |
| UX | 편리한 UI/UX와 직관적 데이터 시각화를 통해 사용 경험 최적화 |

 </br>  </br> 

--- 
## 📘 Git 컨벤션

### Branch Naming Convention

| **Prefix** | **Description**                    |
| ---------- | ---------------------------------- |
| `main`     | 서비스 브랜치                      |
| `develop`  | 배포 전 작업 기준 브랜치           |
| `feature`  | 기능 단위 구현 브랜치              |
| `hotfix`   | 서비스 중 긴급 수정 건에 대한 처리 |

### Commit Convention

| **Prefix** | **Description**                        |
| ---------- | -------------------------------------- |
| `feat`     | 기능 구현, 추가                        |
| `fix`      | 버그 수정, 예외 케이스 대응, 기능 개선 |
| `design`   | UI 디자인 작업                         |
| `setting`  | 패키지 설치, 개발 설정                 |
| `refactor` | 코드 리팩터링                          |
| `rename`   | 파일명(또는 폴더명)을 수정             |
| `test`     | 테스트 코드 추가                       |
| `docs`     | README.md 작성 및 변경                 |
| `hotfix`   | 치명적인 버그를 급하게 수정하는 경우   |

---

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/409b5598-a5bc-4652-a24b-d05bb8c7cf65" />

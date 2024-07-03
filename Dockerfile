# 1. 빌드 단계
FROM node:14 as build

# 앱 디렉토리 생성 및 설정
WORKDIR /app

# 패키지 파일 복사
COPY package.json .
COPY package-lock.json .

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 2. 실행 단계
FROM node:14

# 앱 디렉토리 설정
WORKDIR /app

# 빌드된 애플리케이션 파일 복사
COPY --from=build /app/build ./build

# 3000번 포트 열기
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "build/index.js"]

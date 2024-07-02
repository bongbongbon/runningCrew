# Dockerfile 위치: /path/to/docker/project/
# nginx.conf 위치: /path/to/docker/project/nginx/

# Dockerfile

# 이미지 선택: Node.js를 기반으로 한 공식 이미지 사용
FROM node:14-alpine AS build

# 앱 디렉토리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package.json .
COPY package-lock.json .
RUN npm install

# 앱 소스 추가
COPY . .

# 앱 빌드
RUN npm run build

# Production 환경 설정
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf  # nginx.conf 파일이 nginx/ 디렉토리에 있을 경우

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

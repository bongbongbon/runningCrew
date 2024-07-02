# Stage 1: 빌드 단계
FROM node:alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: 서빙 단계
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Nginx 설정 추가
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

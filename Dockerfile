# Stage 1: 빌드 단계
FROM node:14 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: 실행 단계
FROM node:14

WORKDIR /app

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["node", "build/index.js"]

# 빌드 단계
FROM node:23.9-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 시스템 패키지 설치
RUN apk add --no-cache libc6-compat build-base python3

# 환경 변수 설정
ARG VITE_SERVER_BASE_URL
ARG VITE_SERVER_SOCKET_URL
ARG CHANNEL_TALK_PLUGIN_KEY
ARG VITE_SERVER_GRAFANA_URL

ENV VITE_SERVER_BASE_URL=${VITE_SERVER_BASE_URL} \
    VITE_SERVER_SOCKET_URL=${VITE_SERVER_SOCKET_URL} \
    CHANNEL_TALK_PLUGIN_KEY=${CHANNEL_TALK_PLUGIN_KEY} \
    VITE_SERVER_GRAFANA_URL=${VITE_SERVER_GRAFANA_URL}

RUN yarn install
# 의존성 설치
COPY . .
RUN yarn build

# 실행 단계
FROM nginx:alpine AS runner

# 작업 디렉토리 설정
WORKDIR /usr/share/nginx/html

# 빌드된 결과물 복사
COPY --from=builder /app/dist ./ 

# Nginx 설정 복사 및 설정 최적화
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html;
        try_files \$uri /index.html;
    }

    error_page 404 /index.html;
}
EOF

# 포트 노출
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

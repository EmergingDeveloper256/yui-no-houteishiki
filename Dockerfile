FROM node:20-alpine

WORKDIR /app

# npm等を利用しやすくするための設定
RUN npm config set update-notifier false
ENV NEXT_TELEMETRY_DISABLED 1

# ポート開放 (Development)
EXPOSE 3000

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# 起動コマンド (マウントしたディレクトリ内で実行想定)
CMD ["npm", "run", "dev"]

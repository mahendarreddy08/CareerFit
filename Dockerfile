FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./requirements.txt
RUN python3 -m pip install --no-cache-dir --upgrade pip \
    && python3 -m pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY tests ./tests
COPY input ./input
COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install \
    && npm run build

WORKDIR /app
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV PORT=3000
EXPOSE 3000 8001

CMD ["/bin/bash", "/app/start.sh"]

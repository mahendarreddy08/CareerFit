#!/bin/bash
set -eu

echo "Starting CareerFit backend on 127.0.0.1:8001"
cd /app
python3 -m uvicorn backend.api:app --host 127.0.0.1 --port 8001 &
BACKEND_PID=$!

sleep 2
if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
  echo "FastAPI failed to start on 127.0.0.1:8001" >&2
  exit 1
fi

echo "FastAPI backend started successfully on 127.0.0.1:8001"
echo "Starting Next.js frontend from /app/frontend/apps/web"
cd /app/frontend/apps/web
PORT=${PORT:-3000}
exec env HOSTNAME=0.0.0.0 npm run start -- --hostname 0.0.0.0 --port "${PORT}"

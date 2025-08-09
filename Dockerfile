FROM ghcr.io/williamcotton/webpipe-rs:latest

COPY app.wp /app/
COPY public /app/public/
COPY scripts /app/scripts/

CMD ["app.wp"]

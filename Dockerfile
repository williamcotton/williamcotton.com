FROM ghcr.io/williamcotton/webpipe:2.0

COPY app.wp /app/
COPY public /app/public/
COPY scripts /app/scripts/

CMD ["app.wp"]

# ============================================================
# Dockerfile – Frontend Notes (Cloud Run)
# Digunakan pada Skenario 1: Frontend di Cloud Run
# ============================================================

FROM nginx:alpine

# Salin semua file frontend ke folder html nginx
COPY index.html  /usr/share/nginx/html/index.html
COPY style.css   /usr/share/nginx/html/style.css
COPY script.js   /usr/share/nginx/html/script.js

# Salin konfigurasi nginx (port 8080 untuk Cloud Run)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

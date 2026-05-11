# ============================================================
# Dockerfile – Backend Notes (Cloud Run)
# Digunakan pada Skenario 2: Backend di Cloud Run
# ============================================================

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files terlebih dahulu (untuk cache layer)
COPY package*.json ./

# Install dependencies produksi saja
RUN npm install --omit=dev

# Copy seluruh source code
COPY . .

# Cloud Run mewajibkan PORT 8080
ENV PORT=8080

EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "index.js"]

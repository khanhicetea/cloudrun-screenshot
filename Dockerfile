FROM ghcr.io/puppeteer/puppeteer:20.4.0
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENTRYPOINT ["node", "index.js"]
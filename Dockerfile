FROM ghcr.io/puppeteer/puppeteer:20.4.0
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
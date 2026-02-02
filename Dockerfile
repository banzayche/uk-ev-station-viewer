FROM node:20-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN corepack enable && \
  if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else npm install; fi

COPY . .
RUN if [ -f pnpm-lock.yaml ]; then pnpm build; else npm run build; fi

EXPOSE 3000
CMD ["npm", "start"]

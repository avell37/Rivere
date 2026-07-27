FROM node:20-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_S3_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_S3_URL=$NEXT_PUBLIC_S3_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app
RUN mkdir -p .next/cache/images
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]

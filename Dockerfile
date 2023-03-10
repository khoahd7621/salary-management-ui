# Use the official Node.js 16-alpine image as the base image
FROM node:16-alpine AS deps

ENV NODE_ENV production

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./ 

# Install the dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

ENV NODE_ENV production

ARG API_HOST_URL=""
ARG HOST_URL=""
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ARG SMTP_USER
ARG SMTP_PASSWORD

# Appends to .env.production
RUN printf "$API_HOST_URL" >> .env.production >/dev/null
RUN printf "$HOST_URL" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_API_KEY" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_PROJECT_ID" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_APP_ID" >> .env.production >/dev/null
RUN printf "$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" >> .env.production >/dev/null
RUN printf "$SMTP_USER" >> .env.production >/dev/null
RUN printf "$SMTP_PASSWORD" >> .env.production >/dev/null

WORKDIR /app

# Copy the entire project to the container
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the production version of the app
RUN npm run build

# Start a new stage with a smaller image to run the app
FROM node:16-alpine AS runner
WORKDIR /app

# Set the NODE_ENV environment variable to production
ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the production-ready app from the previous stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose the port specified by the PORT environment variable
EXPOSE 3000

ENV PORT 3000

# Start the server
CMD ["node", "server.js"]
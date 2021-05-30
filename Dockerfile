# Build layer
FROM node:lts-alpine AS build
RUN mkdir -p /usr/discordbot-source/
WORKDIR /usr/discordbot-source/
COPY package.json /usr/discordbot-source/
RUN yarn install
COPY . /usr/discordbot-source/
RUN yarn build

# Image layer
FROM node:lts-alpine

LABEL name "king-croc-bot"

ARG DISCORD_TOKEN
ARG MONGO_USER
ARG MONGO_PASSWORD
ARG MONGO_HOST
ARG MONGO_DB
ARG NEWS_API_KEY

ENV DISCORD_TOKEN=$DISCORD_TOKEN
ENV MONGO_USER=$MONGO_USER
ENV MONGO_PASSWORD=$MONGO_PASSWORD
ENV MONGO_HOST=$MONGO_HOST
ENV MONGO_DB=$MONGO_DB
ENV TOTAL_SHARDS=1
ENV TZ=Australia/Brisbane
ENV NODE_ENV=production
ENV NEWS_API_KEY=$NEWS_API_KEY

RUN mkdir -p /usr/discordbot
WORKDIR /usr/discordbot
COPY package.json /usr/discordbot/
RUN yarn install --production
COPY --from=build /usr/discordbot-source/dist /usr/discordbot

CMD ["node", "index.js"]

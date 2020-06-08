# Build layer
FROM arm32v7/node:alpine AS build
RUN mkdir -p /usr/discordbot-source/
WORKDIR /usr/discordbot-source/
COPY package.json /usr/discordbot-source/
RUN yarn install
COPY . /usr/discordbot-source/
RUN yarn build

# Image layer
FROM arm32v7/node:alpine

LABEL name "Xanathar-bot"

ARG DISCORD_TOKEN
ARG MONGO_USER
ARG MONGO_PASSWORD
ARG MONGO_PASSWORD
ARG MONGO_DB

ENV DISCORD_TOKEN=$DISCORD_TOKEN
ENV MONGO_USER=$MONGO_USER
ENV MONGO_PASSWORD=$MONGO_PASSWORD
ENV MONGO_HOST=$MONGO_HOST
ENV MONGO_DB=$MONGO_DB
ENV TOTAL_SHARDS=1
ENV TZ=Australia/Brisbane

RUN mkdir -p /usr/discordbot
WORKDIR /usr/discordbot
COPY package.json /usr/discordbot/
RUN yarn install --production
COPY --from=build /usr/discordbot-source/dist /usr/discordbot

CMD ["node", "index.js"]

# For raspberry pi
FROM arm32v7/node:latest

# FROM node:latest
ENV TZ=Australia/Brisbane

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

CMD ["node", "index.js"]
FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .
RUN npm install youtube-node
COPY . .
RUN npm install stompjs
COPY . .
CMD ["npm","start"]
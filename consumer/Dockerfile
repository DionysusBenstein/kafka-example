FROM node:16
WORKDIR /usr/src/consumer

COPY package.json .

RUN npm install
COPY . .

EXPOSE $PORT
CMD [ "node", "index.js" ]
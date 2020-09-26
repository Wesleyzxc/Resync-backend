FROM node:lts

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "start" ]
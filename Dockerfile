FROM node:18.13.0

WORKDIR /

RUN npm install

EXPOSE 3000

CMD [ "node", "server" ]
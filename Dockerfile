FROM node:16-alpine

WORKDIR /home/node/app

COPY dist/apps/svc/identity .

RUN yarn install

CMD ["node", "main.js"]

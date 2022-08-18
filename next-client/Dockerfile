FROM node:lts-alpine3.16


RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./package*.json .
RUN npm install
COPY --chown=node:node . .

RUN npm run build

USER node


CMD ["npm", "run", "start"]

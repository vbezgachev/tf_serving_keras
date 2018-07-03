FROM node:8.11.3

WORKDIR /detector_api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY config config
COPY tslint.json tslint.json
COPY tsconfig.json tsconfig.json

COPY src src

RUN npm run build

CMD npm start

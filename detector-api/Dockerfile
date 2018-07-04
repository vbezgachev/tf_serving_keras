FROM node:8.11.3

# create and change to working directory
WORKDIR /detector_api

# install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install

# copy sources
COPY config config
COPY tslint.json tslint.json
COPY tsconfig.json tsconfig.json

COPY src src

# build and lint the service
RUN npm run build
RUN npm run lint

# start the service
EXPOSE 8001
CMD npm start

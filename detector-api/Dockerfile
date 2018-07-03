FROM node:8.11.3

WORKDIR /detector-api

COPY package.json .
COPY config config
COPY build build
COPY node_modules node_modules

ENTRYPOINT ["npm"]
CMD ["start"]

FROM node:8.11.3

WORKDIR /detector_api

COPY ./dist/package.json .
COPY ./dist/config config
COPY ./dist/build build
COPY ./dist/node_modules node_modules

ENTRYPOINT ["npm"]
CMD ["start"]

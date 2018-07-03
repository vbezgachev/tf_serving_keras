FROM node:8.11.3

WORKDIR /detector_app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
RUN npm install -g @angular/cli

COPY tslint.json tslint.json
COPY tsconfig.json tsconfig.json
COPY .angular-cli.json .
COPY e2e e2e
COPY src src

CMD ng serve --host 0.0.0.0 --port 4200

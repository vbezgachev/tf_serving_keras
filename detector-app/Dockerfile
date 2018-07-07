#
# Build environment
#
FROM node:8.11.3 as builder

# create and change to working directory
WORKDIR /detector_app

# install dependencies
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
RUN npm install -g @angular/cli

# copy sources
COPY tslint.json tslint.json
COPY tsconfig.json tsconfig.json
COPY .angular-cli.json .
COPY e2e e2e
COPY src src

# build and lint the application
RUN ng build -op ./dist -aot
RUN ng lint

#
# Production
#
FROM nginx:1.13.9-alpine

# copy distribution to the nginx server
COPY --from=builder /detector_app/dist /usr/share/nginx/html

# start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

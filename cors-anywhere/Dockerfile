FROM node:8.11.3

# setup app dir
RUN mkdir -p /www/
WORKDIR /www/

# install dependencies
COPY ./package.json /www/package.json
RUN npm install

# copy over app dir
COPY ./ /www/

# expose server
EXPOSE 9501

# start server
CMD npm start

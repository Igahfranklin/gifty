FROM node:15.13-alpine

ENV APP_HOME=/home/gifty
RUN mkdir $APP_HOME

WORKDIR $APP_HOME

COPY . $APP_HOME

RUN npm i
RUN npm run build
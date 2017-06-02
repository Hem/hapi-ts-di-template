# FROM node:7.1.0
FROM alexhayton/node-boron-npm-5

RUN npm install -g typescript pm2

# copy the entire application directory
RUN mkdir /usr/app
COPY ./package.json /usr/app

WORKDIR /usr/app
RUN npm install

COPY . /usr/app
RUN tsc

ENV appDir /usr/app

# RUN npm start
EXPOSE 8080

CMD ["pm2", "start", "processes.json", "--no-daemon"]

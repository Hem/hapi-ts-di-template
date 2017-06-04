FROM node:8

MAINTAINER Hem Talreja <HemTalreja@gmail.com>

RUN npm install -g typescript pm2 

# Create the directory.
RUN mkdir /usr/app/ && mkdir /usr/app/app-data && mkdir /usr/app/app-data-contracts && mkdir /usr/app/hapi-api

# copy package.json over so we can install files...
COPY ./app-data-contracts/package.json /usr/app/app-data-contracts/
COPY ./app-data/package.json /usr/app/app-data/
COPY ./hapi-api/package.json /usr/app/hapi-api/

# set working dir
WORKDIR /usr/app/app-data-contracts
RUN npm install

WORKDIR /usr/app/app-data
RUN npm install

WORKDIR /usr/app/hapi-api
RUN npm install

# copy files over...
COPY . /usr/app

# compile the data.
WORKDIR /usr/app/app-data-contracts
RUN tsc

WORKDIR /usr/app/app-data
RUN tsc

WORKDIR /usr/app/hapi-api
RUN tsc


# start processes using pm2
EXPOSE 8080
ENV appDir /usr/app/hapi-api
CMD ["pm2", "start", "processes.json", "--no-daemon"]


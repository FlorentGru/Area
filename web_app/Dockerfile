FROM node:12
WORKDIR /app
COPY package.json /app
CMD npm install
COPY . /app
CMD [ "npm", "start" ]
EXPOSE 8081

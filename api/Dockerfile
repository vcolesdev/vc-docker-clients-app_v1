FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

ENV MONGO_URI=mongodb://mongo:27017/admin

RUN npm install

COPY . ./

# copy certificates from local openssl container from docker-compose to this container
COPY --from=clients_app-openssl:latest /var/ssl/ /var/ssl/

CMD [ "npm", "run", "dev" ]
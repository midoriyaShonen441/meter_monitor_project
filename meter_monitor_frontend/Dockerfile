FROM node:17.8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force
# RUN npm i bcrypt@5.0.0
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
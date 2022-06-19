FROM node:17.8-alpine

RUN apk add --no-cache tini && mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force
RUN npm install -g nodemon
# RUN npm i bcrypt@5.0.0
COPY . .

EXPOSE 3000

# CMD ["/sbin/tini", "--", "node", "index.js"]
CMD ["node", "index.js"]
FROM node:18-alpine

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./

RUN yarn install


COPY . .

EXPOSE 3001

CMD ["yarn","dev"]

FROM node:16

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

#USER change for permissions
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
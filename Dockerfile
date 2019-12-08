FROM node:12.13.1-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm i --production
USER node

#######################################

FROM node:12.13.1-alpine
EXPOSE 8080

RUN mkdir -p /usr/src/app && apk --no-cache update && apk --no-cache upgrade --available && sync
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/index.js .
COPY --from=builder /usr/src/app/node_modules ./node_modules

USER node
ENTRYPOINT ["node", "--experimental-modules", "index.js"]

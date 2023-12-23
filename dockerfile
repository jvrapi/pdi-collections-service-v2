# step 1 - Build app
FROM node:lts-alpine as builder

LABEL stage="builder"

WORKDIR /app

COPY . .

RUN yarn

RUN npx prisma generate

RUN yarn build

RUN yarn --production

# step 2 - Run build app
FROM node:lts-alpine

LABEL stage="run app"

WORKDIR /app

COPY --from=builder /app/dist  /app/dist
COPY --from=builder /app/node_modules  /app/node_modules


EXPOSE 4000

CMD [ "node", "dist/main.js" ]
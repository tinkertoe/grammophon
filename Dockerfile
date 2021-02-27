FROM node:14

WORKDIR .
COPY model model
COPY src src
COPY libvosk.so libvosk.so
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY yarn.lock yarn.lock

RUN apt-get update -y
RUN apt-get install -y alsa-utils build-essential libudev-dev

RUN yarn install
RUN yarn build

CMD [ "node", "dist/src/index.js" ]
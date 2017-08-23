FROM nginx:stable-alpine

RUN echo "@edge http://nl.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
# RUN apk update
# install needed packages
    apk add --no-cache nodejs-npm@edge

WORKDIR /tmp/build
COPY package.json .
RUN /usr/bin/npm install
COPY src ./src
COPY public ./public
COPY webpack.config.js .
COPY webpack.dev.config.js .
RUN /usr/bin/npm run build-dev

# move the built website into the nginx html directory and fix permissions
RUN cp -r ./public/* /usr/share/nginx/html/ && \
    find /usr/share/nginx/html -type f -exec chmod 644 -- {} +

# copy over the custom nginx config file
COPY nginx/nginx.conf /etc/nginx

# clean up the build and installed packages
RUN rm -rf ./* && apk del nodejs-npm

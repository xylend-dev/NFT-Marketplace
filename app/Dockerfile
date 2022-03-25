FROM node:16.13.0

# define work directory
WORKDIR /app/

# Give permissions to node user
RUN chown -Rh node:node /app

# copy project dependencies
COPY package.json ./
COPY yarn.lock ./

# install application packages
RUN yarn install

# expose application to port 3000
EXPOSE 3000

# start application
CMD ["yarn", "start"]

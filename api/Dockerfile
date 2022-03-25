FROM node:16.13.0

# define work directory
WORKDIR /api/

# copy project dependencies
COPY package.json ./
COPY yarn.lock ./

# install API packages
RUN yarn install

# expose API to port 8000
EXPOSE 8000

# start API
CMD ["yarn", "start"]

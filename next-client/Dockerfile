FROM node:lts-alpine3.16 as builder


RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./package*.json .
RUN npm install
COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]

# # Base on offical NGINX Alpine image
# FROM nginx:1.23.1-alpine

# # Remove any existing config files
# RUN rm /etc/nginx/conf.d/*

# # Copy config files
# # *.conf files in conf.d/ dir get included in main config
# COPY ./nginx/default.conf /etc/nginx/conf.d/

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
# COPY --from=builder /home/node/app /usr/share/nginx/html

# # Expose the listening port
# EXPOSE 3000 80

# # Launch NGINX
# CMD [ "nginx", "-g", "daemon off;" ]

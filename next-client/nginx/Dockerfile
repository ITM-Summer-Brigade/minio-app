# Base on offical NGINX Alpine image
FROM nginx:1.23.1-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
# Use official Nginx image (Debian-based)
FROM nginx:latest

# Install gettext for the 'envsubst' command
RUN apt-get update && apt-get install -y gettext && rm -rf /var/lib/apt/lists/*

COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY includes/ /etc/nginx/includes/
COPY ssl/ /etc/nginx/ssl/

# We only swap $ENABLE_HTTPS to protect other Nginx variables
CMD /bin/bash -c "envsubst '\$ENABLE_HTTPS' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
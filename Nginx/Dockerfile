# Use official Nginx image (Debian-based)
FROM nginx:latest

# Install bash and envsubst
RUN apt-get update && apt-get install -y bash gettext && rm -rf /var/lib/apt/lists/*

# Copy your nginx.conf directly
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Expose port 80
EXPOSE 80

# Replace env vars in-place at container start and run Nginx
CMD envsubst '$DOMAIN_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
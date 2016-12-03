FROM nginx:1.10-alpine
MAINTAINER Sebastiaan Renkens <sebastiaan.renkens@ordina.nl>

RUN apk add --no-cache certbot openssl supervisor

# Cron config
RUN touch /var/log/cron.log && \
    echo "1 3,15 * * * /usr/bin/certbot renew --no-self-upgrade &>  /proc/1/fd/1 " >> /etc/crontabs/root && \
    echo "* * * * * echo "CRON is alive :D" &> /proc/1/fd/1 " >> /etc/crontabs/root

# Supervisord conf
COPY supervisord.conf /etc/supervisord.conf

# Nginx config
COPY conf.d/proxyoptions /etc/nginx/conf.d/proxyoptions
COPY nginx-bootstrap.conf /etc/nginx/nginx.conf
COPY nginx-actual.conf /etc/nginx/

# Start script
COPY start.sh /
RUN chmod u+x /start.sh

CMD /start.sh

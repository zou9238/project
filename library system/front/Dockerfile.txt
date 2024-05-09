FROM nginx:1.25.2-alpine3.18-slim

EXPOSE 80

COPY config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html

RUN mv /usr/share/nginx/html/startup.sh /startup.sh
RUN chmod +x /startup.sh

CMD ["/bin/sh", "/startup.sh", "/usr/share/nginx/html/env-config.js"]
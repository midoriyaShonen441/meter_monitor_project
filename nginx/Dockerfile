FROM ubuntu/nginx:1.18-20.04_beta

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx
# RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo

# RUN pip3 install pip --upgrade
# RUN pip3 install certbot-nginx

RUN mkdir -p /etc/letsencrypt
# RUN certbot --nginx -m admin@thaiagroinnovative.com --agree-tos --non-interactive -d yourdomain.com -d www.yourdomain.com 

COPY ./conf.d/ /etc/nginx/conf.d/
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 90
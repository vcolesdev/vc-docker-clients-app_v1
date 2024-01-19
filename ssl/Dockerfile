FROM alpine:latest as openssl

# install bash and other useful utilities for ssl
RUN apk update && apk upgrade
RUN apk add --no-cache nano vim bash net-tools openssl openssh-client openssh-keygen openssh-keysign openssh-askpass openssh-sftp-server

# copy ssl config files to default location on container
COPY config/* /etc/ssl/

# copy executable file from local machine to container
COPY scripts/* /usr/local/bin/

# set permissions on executable files
RUN chmod +x /usr/local/bin/*

# run generate-ssl.sh to generate ssl files
RUN echo "Generating SSL files..."
RUN mkdir -p /var/ssl
RUN /usr/local/bin/generate-certs.sh

ENTRYPOINT ["bash", "-c" , "echo 'SSL files in /var/ssl/:' && ls -la /var/ssl"]
FROM nginx:1.25-alpine as clients_app-nginx

# switch to work directory
WORKDIR /etc/nginx

# copy additional configurations to conf.d
COPY ./conf.d/*.conf /etc/conf.d/

# run the container's shell
CMD ["nginx", "-g", "daemon off;"]
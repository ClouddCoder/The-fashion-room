FROM nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN mkdir /var/www
RUN touch /var/www/index.html
RUN echo "Hello World" > /var/www/index.html
COPY ./proxy.conf /etc/nginx/conf.d/proxy.conf
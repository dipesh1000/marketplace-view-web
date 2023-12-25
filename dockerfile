FROM httpd:2.4-alpine

LABEL app="fucha-web"

COPY ./build/ /usr/local/apache2/htdocs/
COPY ./docker/app.conf /usr/local/apache2/conf/

RUN apk update && \
    apk add vim && \
    echo "Include conf/app.conf" >> /usr/local/apache2/conf/httpd.conf

CMD ["/bin/sh", "-c", "sed -i 's#PLACEHOLDER_APP_URL#'$REACT_APP_URL'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_ENVIRONMENT#'$REACT_APP_ENVIRONMENT'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_GOOGLE_CLIENT#'$REACT_APP_GOOGLE_CLIENT'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_GOOGLE_SECRET#'$REACT_APP_GOOGLE_SECRET'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_FACEBOOK_ID#'$REACT_APP_FACEBOOK_ID'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_STRIPE_TEST_KEY#'$REACT_APP_STRIPE_TEST_KEY'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_STRIPE_LIVE_KEY#'$REACT_APP_STRIPE_LIVE_KEY'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_PUSHER_ID#'$REACT_APP_PUSHER_ID'#g' ./htdocs/static/js/*; \
                       sed -i 's#PLACEHOLDER_APP_PUSHER_CLUSTER#'$REACT_APP_PUSHER_CLUSTER'#g' ./htdocs/static/js/*; \
                       apachectl -D FOREGROUND"]
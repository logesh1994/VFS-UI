FROM httpd:2.4
COPY ./dist/outreach-vfs-ui/assets /usr/local/apache2/htdocs/assets
COPY ./dist/outreach-vfs-ui/index.html /usr/local/apache2/htdocs/index.html
COPY ./dist/outreach-vfs-ui/main.js /usr/local/apache2/htdocs/main.js
COPY ./dist/outreach-vfs-ui/polyfills.js /usr/local/apache2/htdocs/polyfills.js
COPY ./dist/outreach-vfs-ui/runtime.js /usr/local/apache2/htdocs/runtime.js
COPY ./dist/outreach-vfs-ui/styles.js /usr/local/apache2/htdocs/styles.js
COPY ./dist/outreach-vfs-ui/vendor.js /usr/local/apache2/htdocs/vendor.js
COPY ./.htaccess /usr/local/apache2/htdocs/
COPY ./httpd.config /usr/local/apache2/conf/httpd.conf
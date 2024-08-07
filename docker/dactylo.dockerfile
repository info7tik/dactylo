FROM httpd:2.4

# Add the compiled Angular application
ADD dist/dactylo/browser/* /usr/local/apache2/htdocs/
# Configuration files of the httpd server
ADD docker/htaccess /usr/local/apache2/htdocs/.htaccess
ADD docker/httpd.conf /usr/local/apache2/conf/httpd.conf
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets

# Rebuild the exact high-quality background uploaded for the site.
# The image is stored as text chunks in GitHub so it can be committed reliably,
# then decoded back to the original WebP during the Fly.io Docker build.
RUN cat /usr/share/nginx/html/assets/hq.part00 \
        /usr/share/nginx/html/assets/hq.part01 \
        /usr/share/nginx/html/assets/hq.part02 \
        /usr/share/nginx/html/assets/hq.part03 \
        /usr/share/nginx/html/assets/hq.part04 \
        /usr/share/nginx/html/assets/hq.part05 \
        /usr/share/nginx/html/assets/hq.part06 \
        /usr/share/nginx/html/assets/hq.part07 \
    | base64 -d > /usr/share/nginx/html/assets/background.webp

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

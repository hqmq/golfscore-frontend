# Golfscore Frontend
This is an experiment to try out the idea of building a frontend which is built and deployed totally independent of the backend app.

# Deployment Strategy
Currently this app is being deployed behind nginx and it does an upstream request to the JSON backend for its xhr requests.

The nginx config looks like this:
```
upstream golf {
  server 127.0.0.1:4000 fail_timeout=60s;
}

server {
  server_name golf.riesd.com;
  listen 80;
  root /home/ec2-user/www/golf;
  etag on; # use etag caching for now, far-future expire once we can fingerprint the compiled assets

  rewrite ^/games/(\d+)$ / last;
  rewrite ^/players/(\d+)$ / last;
  rewrite ^/courses/(\d+)$ / last;

  try_files $uri/index.html $uri.html $uri @app;
  location @app {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_pass http://golf;
  }
}
```

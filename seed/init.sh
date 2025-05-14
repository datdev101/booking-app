#!/bin/bash

mongoimport --db booking-app \
  --collection users \
  --jsonArray \
  --file /docker-entrypoint-initdb.d/users.json

mongoimport --db booking-app \
  --collection concerts \
  --jsonArray \
  --file /docker-entrypoint-initdb.d/concerts.json
#!/usr/bin/env bash
docker tag $(docker images reit-fe:latest -q) reit-fe:prev
docker build -t reit-fe:latest .
docker rmi $(docker images -f "dangling=true" -q) -f
# docker push mruddy/pest-fe-dev:latest
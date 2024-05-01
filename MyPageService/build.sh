#!/bin/bash

export MA_PAGE_SERVICE_IMAGE_VERSION=0.0.0
docker build -t rocketgang/mypageservice:$MA_PAGE_SERVICE_IMAGE_VERSION .
docker push rocketgang/mypageservice:$MA_PAGE_SERVICE_IMAGE_VERSION
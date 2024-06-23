#!/bin/bash

export MA_PAGE_IHM_IMAGE_VERSION=0.0.0
docker build -t rocketgang/mypageihm:$MA_PAGE_IHM_IMAGE_VERSION .
docker push rocketgang/mypageihm:$MA_PAGE_IHM_IMAGE_VERSION
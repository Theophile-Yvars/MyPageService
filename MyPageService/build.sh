#!/bin/bash

IMAGE_NAME=mypage/service
IMAGE_TAG_CURRENT=0.0.0

mvn clean package

echo "### Build new image ${IMAGE_NAME}:${IMAGE_TAG_CURRENT}"

docker build  --tag ${IMAGE_NAME}:${IMAGE_TAG_CURRENT} .
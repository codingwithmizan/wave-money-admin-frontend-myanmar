#!/usr/bin/env bash

ENV=$1
APP_PATH="/home/ubuntu/"$2

cd ${APP_PATH}/current
echo "Exracting build.tar.gz to ${APP_PATH}/current directory..."
tar -xzvf dist.tar.gz

echo "Cleaning up the build* files..."
mv dist/* .
rm -rf dist*
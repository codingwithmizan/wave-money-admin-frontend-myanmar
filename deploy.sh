#! /bin/bash

ENV=$1
SERVER=""
# APP_PATH="apps/shopoth_testing_${ENV}"
APP_PATH="apps/ekyc-admin-frontend-${ENV}"

release(){
  echo "Creating new release directory..."
  scp -r ./deployment/* ubuntu@${SERVER}:${APP_PATH}/shared
  ssh ubuntu@${SERVER} chmod 755 ${APP_PATH}/shared/release.sh
  ssh ubuntu@${SERVER} chmod 755 ${APP_PATH}/shared/extract.sh
  ssh ubuntu@${SERVER} chmod 755 ${APP_PATH}/shared/clean-release.sh
  ssh ubuntu@${SERVER} ". ${APP_PATH}/shared/release.sh ${ENV} ${APP_PATH}"
}

deploy(){
  yarn install
  echo "Removing files from old build directory of local ..."
  rm -rf ./dist/
  echo "Running build local ..."
  REACT_APP_ENV=${ENV} yarn build
  echo "Uploading files to shopoth_admin_v2_${ENV} directory ..."
  echo "Archiving build.tar.gz..."
  tar -czvf dist.tar.gz ./dist/

  echo "Executing clean-release.sh to server..."
  ssh ubuntu@${SERVER} ". ${APP_PATH}/shared/clean-release.sh ${ENV} ${APP_PATH}"

  echo "Running command scp build.tar.gz ubuntu@${SERVER}:${APP_PATH} ..."
  scp dist.tar.gz ubuntu@${SERVER}:${APP_PATH}/current

  echo "Executing extract.sh to server to unpack build.tar.gz ..."
  ssh ubuntu@${SERVER} ". ${APP_PATH}/shared/extract.sh ${ENV} ${APP_PATH}"
  rm dist.tar.gz
}

if [[ "production" = $ENV ]];then
  printf "\n\n\n"
  SERVER="18.142.145.141"
	echo "Loginex deploying to production server : ${SERVER} ..."
  release
  deploy
elif [[ "pre_prod" = $ENV ]]; then
  printf "\n\n\n"
  SERVER="18.142.145.141"
  echo "Loginex deploying to pre_prod server : ${SERVER} ..."
  release
  deploy
elif [[ "staging" = $ENV ]]; then
  printf "\n\n\n"
  SERVER="18.142.145.141"
	echo "Loginex deploying to staging server : ${SERVER} ..."
  release
  deploy
else
	echo "Please specify environment as argument!"
fi

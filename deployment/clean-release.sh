#!/usr/bin/env bash

ENV=$1
APP_PATH="/home/ubuntu/"$2

clean_release(){
  cd && cd $APP_PATH
  RELEASE_DIR=`ls -tr releases/ | grep "release_*" | tail -n 1`
  echo $RELEASE_DIR
  rm -f current
  echo "Linking current to new release directory..."
  ln -s ${APP_PATH}/releases/${RELEASE_DIR} current

  cd && cd $APP_PATH/releases
  COUNTS=`ls -tr | grep "release_*" | wc -l`
  OLD_RELEASE_DIR=`ls -tr | grep "release_*" | head -n 1`

  echo "Total dirs: ${COUNTS}"

  if [[ "10" -lt $COUNTS ]];
  then
    echo "Removing old release directory $OLD_RELEASE_DIR ..."
    rm -rf $OLD_RELEASE_DIR
  fi

  # for d in $DIRS
  # do
  #   echo $d
  # done
}

clean_release